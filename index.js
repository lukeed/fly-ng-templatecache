const assign = require('object-assign')
const strEsc = require('js-string-escape')

const HEADER  = 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {'
const CONTENT = '$templateCache.put("<%= url %>","<%= contents %>");'
const FOOTER  = '}]);'

const modules = {
  requirejs: {
    header: 'define([\'angular\'], function(angular) { \'use strict\'; return ',
    footer: '});'
  },
  browserify: {
    header: '\'use strict\'; module.exports = '
  },
  es6: {
    header: 'import angular from \'angular\'; export default ',
  },
  iife: {
    header: '(function(){',
    footer: '})();'
  }
}

const defaults = {
  standalone: false,
  filename: 'templates.js',
  moduleName: 'templates',
  moduleSystem: null,
  templateHeader: HEADER,
  templateContent: CONTENT,
  templateFooter: FOOTER,
  templateUrl: () => false
}

module.exports = function () {
  this.ngTemplates = (options) => {
    options = assign(defaults, options)
  }
}
