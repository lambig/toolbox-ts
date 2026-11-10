const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
function check(api) {
    assert.equal(api.notNull(null), false);
    assert.equal(api.notNull(0), true);
    assert.equal(api.all(true, () => true), true);
    assert.equal(api.all(true, false), false);
}
const cjs = require('toolbox-ts');
check(cjs);
const pkg = require('toolbox-ts/package.json');
const root = path.dirname(require.resolve('toolbox-ts/package.json'));
Promise.all([
    import('toolbox-ts'),
    import(pathToFileURL(path.join(root, pkg.module)).href)
]).then(([nodeImport, esmFile]) => {
    assert.strictEqual(nodeImport.default, cjs, 'Node bare import must expose the CommonJS API');
    check(nodeImport.default);
    check(esmFile);
    console.log('Installed toolbox-ts: require, Node bare import via CommonJS, and explicit ESM file passed.');
}).catch(error => { console.error(error); process.exitCode = 1; });
