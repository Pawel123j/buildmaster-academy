# Dependency security validation — 2026-11-16

## Temporary braces mitigation

The installed `braces@3.0.3` parser has a versioned patch for GHSA-vfj7-8cjw-p6xm. It rejects nested brace/parenthesis AST nodes beyond 128 levels before insertion, protecting the recursive string-pattern APIs used by the build tools. `npm ci` applies the patch with `patch-package --error-on-fail`.

Upstream recheck on 2026-11-16: npm still lists braces 3.0.3 as latest; micromatch 4.0.8 still requires `braces:^3.0.3`. The identical patch was independently reviewed during ScamShield recovery and verified again with BuildMaster's clean installation. Its parser SHA-256 is `0d010535667c2889449adcc0cf596c2db2c61f73c513b96c4a2cf1fd8ad1e018`.

The review compared the parser in memory with only the six patch lines removed: 9999-character patterns at depth 4999 caused unpatched expand/stringify stack overflow, while the patched APIs rejected them with the intended nesting SyntaxError. The gate now checks that reproduction, depth 127/128 compatibility and 129 rejection, deep/mixed/unfinished nesting, default/create/array/expand entry points, escaped/quoted text, character classes, ranges and many shallow groups. Patterns above 10000 characters test a separate length cap, not the nesting fix.

On that evidence the temporary review deadline is renewed from 2026-11-18 to **2026-12-16**. The gate fails at expiry, on hash/version changes, attack/compatibility failures, or an unavailable audit. It always checks the root parser even if the advisory feed is empty, and each additional reported braces installation. Remove the patch when a compatible fixed release is available; review upstream again before renewal. Caller-built AST objects and unrestricted combinatorial expansion of shallow patterns are outside this mitigation.

## Other dependencies and checks

A targeted override uses fixed minimatch 11.0.1 for `@typescript-eslint/typescript-estree`, removing GHSA-g3hv-75wg-m249. Other minimatch 3 consumers remain unchanged. This is a deliberate major override verified by lint, typecheck and production build. Vitest 5.1.0 and Node.js 24 align the test/runtime requirements.

`npm run security:check` rejects every unmitigated low/moderate/high/critical advisory. The final local raw audit reported **zero known advisories**; the parser hash and attack/compatibility tests passed separately. This is a dated observation, not a future guarantee or a claim that an upstream source-patched package has a new version.

Local clean install, lint, typecheck, 25 unit cases, production build and three sandboxed Chromium scenarios passed. Browser coverage exercises the real app, including preserved corrupt progress and downloaded recovery copies. No deployment or hardware compatibility certification is implied.

A repeated audit during final validation reported the newly published Next.js advisory GHSA-mfr8-8qww-v76h. Next.js and eslint-config-next were updated together from 16.4.2 to locked 16.4.6; clean install, code checks, 25 tests, build and all three browser scenarios were repeated. The final raw audit again reports zero findings.
