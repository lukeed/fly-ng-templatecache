# fly-ng-templatecache [![][travis-badge]][travis-link]

> Concatenate and register Angular JS templates in the [$templateCache](https://docs.angularjs.org/api/ng/service/$templateCache), with _[Fly][fly]_.

## Install

```
npm install --save-dev fly-ng-templatecache
```

## Usage

```js
exports.views = function * (fly) {
  yield fly.source('templates/**/*.html')
    .ngTemplates({
      file: 'views.js',
      standalone: true,
      moduleName: 'app.templates'
    })
    .target('dist/js');
}
```

## API

### .ngTemplates(options)

#### options.file

Type: `string` <br>
Default: `templates.js`

The name of the file that will be place in your `target()` destination. Do not include a directory structure here.

#### options.moduleName

Type: `string` <br>
Default: `'templates'`

The name of your Angular JS module or submodule.

#### options.moduleType

Type: `string` <br>
Default: `null` <br>
Options: `'iffe'`, `'requirejs'`, `'browserify'`, `'es6'`

The module system for which your module should be prepared.

#### options.standalone

Type: `boolean` <br>
Default: `false`

If `true`, creates a new Angular JS module. If `false`, it is assumed that you are using an existing module.

#### options.templateHeader

Type: `string` <br>
Default: `angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {`

This precedes your template content and will correctly initialize your Angular module. It is not recommended you change this, but if you do, you _must_ retain the `<%= module %>` variable.

If the `standalone` option is `true`, an empty dependency array (`[]`) will replace `<%= standalone %>`. 

#### options.templateContent

Type: `string` <br>
Default: `$templateCache.put("<%= url %>","<%= contents %>");`

The template wrapper for each view's content. It is not recommended to change this.

#### options.templateFooter

Type: `string` <br>
Default: `}]);`

This is appended to your module file. There probably is no reason to change this.

#### options.trim

Type: `function` or `string` <br>
Default: `''`

A function that handles or alters your views' reference URLs. If using `string`, the value will simply be removed.

```js
.ngTemplates({
  trim: str => str.replace('app/views', 'views');
})
//=> ng-include="views/demo.html"
//=> INSTEAD OF
//=> ng-include="app/views/demo.html"
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[travis-link]:  https://travis-ci.org/lukeed/fly-ng-templatecache
[travis-badge]: http://img.shields.io/travis/lukeed/fly-ng-templatecache.svg?style=flat-square
