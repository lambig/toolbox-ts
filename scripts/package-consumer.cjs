const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
function check(api) {
    assert.equal(api.notNull(null), false);
    assert.equal(api.notNull(0), true);
    assert.equal(api.all(true, () => true), true);
    assert.equal(api.all(true, false), false);
}
check(require('toolbox-ts'));
const pkg = require('toolbox-ts/package.json');
const root = path.dirname(require.resolve('toolbox-ts/package.json'));
import(pathToFileURL(path.join(root, pkg.module)).href).then(api => {
    check(api);
    console.log('Installed toolbox-ts: CommonJS and ESM consumers passed.');
}).catch(error => { console.error(error); process.exitCode = 1; });
