# BuildMaster recovery — 2026-11-16

The recovery updates existing PR #4 and preserves both PR #3 `412a94ec6b8dfa306b2e41008d17654117565802` and current PR #4 `5d8cd5870456acc19530236e7a61bdde2ed69e96` as ancestors. The default branch remains unchanged. PR #3 stays open pending a separately authorized disposition; its dependency/toolchain/security work is incorporated here. The later PR #4 removal of an experimental dependency-repair workflow is also preserved.

## Fixed behavior

Previously, reading corrupt checklist JSON switched to in-memory progress, but checking a step, reset or retry could still overwrite the original. Every replacement now rereads the current saved string. Unsupported or malformed formats must have a separate, verified byte-for-byte copy before the primary record changes. Read, backup-write and verification errors preserve the original and leave new progress in memory. Identical copies are reused; later different corrupt values receive separate keys. **Download saved copies** exports all preserved raw strings, including after reload.

Supported historical arrays and version 2 records keep their existing behavior: unknown/duplicate IDs are filtered from visible completion. Recovery copies use the same localStorage and are not protection against clearing browser data. Download them if needed. Multiple tabs do not provide a transactional database or conflict-resolution guarantee.

The guide also explicitly requires CPU cooling and its required fan/pump connectors before first power-on, within the existing boot step and ID. The app remains an educational guide, not evidence of an actual hardware build.

## Verification

- Clean Node.js 24 `npm ci`, lint and standalone TypeScript checks: PASS.
- Vitest 5.1.0: **25 cases PASS**, covering socket/RAM rules, catalog consistency and recovery failure/retry behavior.
- Production Next.js 16.4.6 build: PASS.
- **Three real sandboxed Chromium scenarios PASS**: checklist/reload, compatibility/quiz/mobile/fonts; quota retry; corrupt/unknown data backup, failed backup write, retry, actual JSON download, second corruption, reset and reload.
- Raw npm audit: **zero known advisories**. Braces parser hash and attack/compatibility checks: PASS independently of the feed. [Security record and review deadline](../SECURITY_PATCH.md).
- Independent read-only review: the original data-loss blocker was fixed; no new blockers found. Reviewer separately exercised nine storage tests plus Unicode/whitespace preservation and recovery-read failure, and compared the reviewed files to the validated copy.

Hosted Actions must be read for the current PR #4 head; local results are not substituted for a pending CI check. No deployment, default-branch merge, external retailer integration or hardware compatibility certification was performed. Prices remain estimates and compatibility only covers the sample socket/RAM catalog.

The final repeated audit newly reported GHSA-mfr8-8qww-v76h after the first clean run. Next.js and eslint-config-next were updated together to locked 16.4.6 (supported range starts at 16.4.5). Clean install, all quality checks, 25 tests, build, three browser scenarios and the final raw audit were repeated successfully; the security threshold was not relaxed.
