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
