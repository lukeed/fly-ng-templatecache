const cache = require('../')
const test = require('tape').test
// const file = require('path').join('test', 'index.html')
// const content = require('fs').readFileSync(file, 'utf8')

test('fly-ng-templatecache', (t) => {
  // t.plan(3)
  t.plan(1)

  // const runTests = (data) => {
    // const results = data.join('')

    // t.equal(/="/g.test(results), false, 'all quotes have been escaped')
    // t.equal(/(\r\n|\n|\r)/gm.test(results), true, 'line breaks are retained')
    // t.equal(/templateCache.put/g.test(results), true, 'add item to $templateCache')
  // }

  cache.call({
    filter: function(name, fn) {
      // Promise.resolve( fn(file) )
      t.equal(name, 'ngTemplates', 'add ngTemplates fly filter')
    },

    /**
     * @TODO: Await full data output. This halt/overwrites the origin `.then()` clause
     */
    // unwrap: function(fn) {
    //   const p = Promise.all( fn([file]) )
    //   return Promise.resolve(p).then(runTests)
    // }
  })
})
