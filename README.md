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
