const fs = require('fs')
const path = require('path')
const assign = require('object-assign')
const strEsc = require('js-string-escape')

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
  templateHeader: 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
  templateContent: '$templateCache.put("<%= url %>","<%= contents %>");',
  templateFooter: '}]);',
  templateUrl: (url) => url
}

module.exports = function () {
  this.filter('ngTemplates', (data, options) => {
    const opts = assign(defaults, options)

    return this.unwrap(files =>
      files.map(file => buildContent(file, opts)).join('')
    ).then(data => {
      data = angularWrapper(data, opts)
      data = moduleWrapper(data, opts)

      this.concat(opts.filename)

      return data
    })
  })
}

/**
 * Wrap each file's contents in a $templateCache definition
 */
function buildContent (file, opts) {
  const url = opts.templateUrl( path.normalize(file) )
  const contents = fs.readFileSync(file, 'utf8')

  const data = opts.templateContent.replace(/<%= url %>/g, url)
    .replace(/<%= contents %>/g, strEsc(contents))

  return data
}

/**
 * Add Angular Module template
 * and replace vars with strings
 */
function angularWrapper (data, opts) {
  data = opts.templateHeader + data + opts.templateFooter

  return data.replace(/<%= module %>/g, opts.moduleName)
    .replace(/<%= standalone %>/g, (opts.standalone ? ', []' : ''))
}

/**
 * Wrap all content in Module definition, if any
 */
function moduleWrapper (data, opts) {
  const system = opts.moduleSystem
  const module = modules[system]

  if (!system || !module) {
    return data;
  }

  return (module.header || '') + data + (module.footer || '')
}
