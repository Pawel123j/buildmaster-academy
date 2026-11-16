from pathlib import Path
import json
import re
from playwright.sync_api import expect
from browser_support import application, browser, ROOT

REPO = Path(__file__).resolve().parents[1]

def test_offline_fonts_checklist_compatibility_quiz():
    with application('buildmaster', ['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','18309'], str(REPO), 'http://127.0.0.1:18309') as url, browser() as b:
        page = b.new_page(viewport={'width':390,'height':844})
        errors, font_requests = [], []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('request', lambda r: font_requests.append(r.url) if 'fonts.google' in r.url or 'fonts.gstatic' in r.url else None)
        page.route(re.compile(r'https://fonts\.(googleapis|gstatic)\.com/.*'), lambda route: route.abort())
        page.goto(url)
        page.screenshot(path=str(REPO / 'docs' / 'screenshots' / '07-mobile-landing.png'))
        page.goto(url + '/guide')
        button = page.get_by_role('button', name=re.compile(r'^Mark .* complete$')).first
        label = button.get_attribute('aria-label')
        button.click()
        expect(page.get_by_text(re.compile('^1 of .* steps completed$'))).to_be_visible()
        page.reload()
        expect(page.get_by_text(re.compile('^1 of .* steps completed$'))).to_be_visible()
        expect(page.get_by_role('button', name=label.replace(' complete',' incomplete'), exact=True)).to_be_visible()
        assert 'sans-serif' in page.locator('body').evaluate('(el) => getComputedStyle(el).fontFamily')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        page.goto(url + '/compatibility')
        page.get_by_role('button', name='AM5', exact=True).click()
        page.get_by_role('button', name='DDR4', exact=True).click()
        expect(page.get_by_text(re.compile('AM5 boards in this dataset do not support DDR4'))).to_be_visible()
        page.get_by_role('button', name='DDR5', exact=True).click()
        expect(page.get_by_text(re.compile('AM5 motherboards? support DDR5 in this dataset'))).to_be_visible()
        page.screenshot(path=str(REPO / 'docs' / 'screenshots' / '08-mobile-compatibility.png'))
        page.goto(url + '/quiz')
        questions = json.loads(open(REPO / 'src/data/quizQuestions.json').read())
        for q in questions:
            expect(page.get_by_role('heading', name=q['question'], exact=True)).to_be_visible()
            page.get_by_role('button', name=q['options'][q['answerIndex']], exact=True).click()
        expect(page.get_by_text(f'You scored {len(questions)} out of {len(questions)}.', exact=False)).to_be_visible()
        page.get_by_role('button', name='Restart quiz', exact=True).click()
        expect(page.get_by_role('heading', name=questions[0]['question'], exact=True)).to_be_visible()
        page.screenshot(path=str(ROOT/'logs'/'buildmaster-mobile.png'))
        assert not font_requests, font_requests
        assert not errors, errors


def test_checklist_quota_notice_and_retry():
    with application('buildmaster', ['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','18309'], str(REPO), 'http://127.0.0.1:18309') as url, browser() as b:
        page = b.new_page(viewport={'width':390,'height':844})
        page.add_init_script("""(() => { const original = Storage.prototype.setItem; window.__restoreSetItem = () => { Storage.prototype.setItem = original; }; Storage.prototype.setItem = function(key, value) { if (key === 'buildmaster.checklist.v1') throw new DOMException('Full', 'QuotaExceededError'); return original.call(this, key, value); }; })();""")
        page.goto(url + '/guide')
        button = page.get_by_role('button', name=re.compile(r'^Mark .* complete$')).first
        label = button.get_attribute('aria-label')
        button.click()
        expect(page.get_by_role('status')).to_contain_text('Not saved: your progress remains in this tab')
        expect(page.get_by_text(re.compile('^1 of .* steps completed$'))).to_be_visible()
        page.evaluate('window.__restoreSetItem()')
        page.get_by_role('button', name='Retry saving', exact=True).click()
        expect(page.get_by_role('status')).to_have_count(0)
        saved = page.evaluate("JSON.parse(localStorage.getItem('buildmaster.checklist.v1'))")
        assert saved['version'] == 2 and len(saved['completed']) == 1
        page.reload()
        expect(page.get_by_text(re.compile('^1 of .* steps completed$'))).to_be_visible()


def test_corrupt_progress_is_preserved_before_retry_and_reset_and_can_be_downloaded(tmp_path):
    with application('buildmaster', ['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','18309'], str(REPO), 'http://127.0.0.1:18309') as url, browser() as b:
        page = b.new_page(viewport={'width':390,'height':844})
        page.goto(url + '/guide')
        original = ' {"unfinished":'
        page.evaluate("raw => localStorage.setItem('buildmaster.checklist.v1', raw)", original)
        page.reload()
        expect(page.get_by_role('status')).to_contain_text('Progress could not be loaded')
        page.evaluate("""() => {
            const original = Storage.prototype.setItem;
            window.__restoreSetItem = () => { Storage.prototype.setItem = original; };
            Storage.prototype.setItem = function(key, value) {
                if (key.startsWith('buildmaster.checklist.recovery.')) throw new DOMException('Full', 'QuotaExceededError');
                return original.call(this, key, value);
            };
        }""")
        page.get_by_role('button', name=re.compile(r'^Mark .* complete$')).first.click()
        expect(page.get_by_text(re.compile('^1 of .* steps completed$'))).to_be_visible()
        expect(page.get_by_role('status')).to_contain_text('Not saved')
        assert page.evaluate("localStorage.getItem('buildmaster.checklist.v1')") == original
        page.evaluate('window.__restoreSetItem()')
        page.get_by_role('button', name='Retry saving', exact=True).click()
        expect(page.get_by_role('status')).to_have_count(0)
        download_button = page.get_by_role('button', name='Download saved copies', exact=True)
        expect(download_button).to_be_visible()
        with page.expect_download() as pending:
            download_button.click()
        first_download = tmp_path / 'first-recovery.json'
        pending.value.save_as(first_download)
        assert [item['raw'] for item in json.loads(first_download.read_text())['copies']] == [original]

        # Read again on reset: another unsupported value must get its own copy.
        second = '{"version":99,"completed":["cpu"]}'
        page.evaluate("raw => localStorage.setItem('buildmaster.checklist.v1', raw)", second)
        page.get_by_role('button', name='Reset checklist progress', exact=True).click()
        assert page.evaluate("JSON.parse(localStorage.getItem('buildmaster.checklist.v1')).completed") == []
        page.reload()
        expect(page.get_by_text(re.compile('^0 of .* steps completed$'))).to_be_visible()
        with page.expect_download() as pending:
            page.get_by_role('button', name='Download saved copies', exact=True).click()
        download_path = tmp_path / 'all-recovery.json'
        pending.value.save_as(download_path)
        copies = json.loads(download_path.read_text())['copies']
        assert sorted(item['raw'] for item in copies) == sorted([original, second])
        assert len({item['key'] for item in copies}) == 2
