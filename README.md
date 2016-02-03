<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> Concatenate and reigster Angular JS templates in the [$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache), with _[Fly][fly]_.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]
[![][mit-badge]][mit]

## Install

```a
npm install -D fly-ng-templatecache
```

## Example

```js
export default function* () {
  yield this.source('templates/**/*.html')
    .ngTemplates({
      standalone: true,
      fileName: 'app-views.html',
      moduleName: 'app.templates',
      // ...
    })
    .target('dist/js');
}
```

## API

#### standalone

> Type: `boolean`

**Default:** `false`

If `true`, creates a new Angular JS module. If `false`, it is assumed that you are using an existing module.

#### filename

> Type: `string`

**Default:** `templates.js`

The name of the file that will be place in your `target()` destination. Do not include a directory structure here.

#### moduleName

> Type: `string`

**Default:** `templates`

The name of your Angular JS module or submodule.

```js
.ngTemplates({
  moduleName: 'app.templates'
})
```

#### moduleSystem

> Type: `string`

**Default:** `null`

The module system that your templates-module should be prepared for. Currently supports:
* `iffe` -- (immediately-invoked function expression)
* `requirejs` -- [Require JS](http://requirejs.org/docs/api.html#define)
* `browserify` -- [Browserify](https://github.com/substack/node-browserify#browserify)
* `es6` -- ES6 / ES2015 module `import`/`export`

```js
.ngTemplates({
  moduleSystem: 'browserify'
})
```

#### templateHeader

> Type: `string`

**Default:** `angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {`

This precedes your template content and will correctly initialize your Angular module. It is not recommended you change this, but if you do, you retain the `<%= module %>` variable.

If the `standalone` option is `true`, an empty dependency array (`[]`) will replace `<%= standalone %>`. 

#### templateContent

> Type: `string`

**Default:** `$templateCache.put("<%= url %>","<%= contents %>");`

The template wrapper for each view's content. It is not recommended to change this.

#### templateFooter

> Type: `string`

**Default:** `}]);`

This is appended to your module file. There probably is no reason to change this.

#### templateUrl

> Type: `function`

**Default:** `(url) => url`

The function that handles or alters your views' reference URLs.

By default:
```js
yield this
  .source('app/scripts/templates/*.html')
  .ngTemplates(/* defaults */)
  .target('dist/js')
```

All template files will be retain their full path, so you must use the full path.

```html
<div ng-include="'app/scripts/templates/app.html'"></div>
```

To change this, pass in a custom `templateUrl` function:

```js
yield this
  .source('app/scripts/templates/*.html')
  .ngTemplates({
    templateUrl: (url) => {
      return url.replace('app/scripts/templates/', '') // remove that path
    }
  }
  })
  .target('dist/js')
```

With `app/scripts/templates/` removed, the reference ID is now just `app.html`.

```html
<div ng-include="'app.html'"></div>
```

## License

[MIT][mit] © [Luke Edwards][author] et [al][contributors]


[mit]:          http://opensource.org/licenses/MIT
[author]:       https://lukeed.com
[contributors]: https://github.com/lukeed/fly-ng-templatecache/graphs/contributors
[releases]:     https://github.com/lukeed/fly-ng-templatecache/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-ng-templatecache
[npm-ver-link]: https://img.shields.io/npm/v/fly-ng-templatecache.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-ng-templatecache.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-ng-templatecache
[travis-badge]: http://img.shields.io/travis/lukeed/fly-ng-templatecache.svg?style=flat-square
