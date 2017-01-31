'use strict';

const p = require('path');
const strEsc = require('js-string-escape');

const modules = {
	requirejs: {
		header: 'define([\'angular\'], function(angular) { \'use strict\'; return ',
		footer: '});'
	},
	browserify: {
		header: '\'use strict\'; module.exports = '
	},
	es6: {
		header: 'import angular from \'angular\'; export default '
	},
	iife: {
		header: '(function(){',
		footer: '})();'
	}
};

const defaults = {
	file: 'templates.js',
	standalone: false,
	moduleType: null,
	moduleName: 'templates',
	templateHeader: 'angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {',
	templateContent: '$templateCache.put("<%= url %>","<%= contents %>");',
	templateFooter: '}]);',
	trim: ''
};

module.exports = {
	every: false,
	name: 'ngTemplates',
	*func(files, opts) {
		opts = Object.assign({}, defaults, opts);

		if (typeof opts.trim === 'string') {
			const t = opts.trim;
			opts.trim = str => str.replace(new RegExp(t, 'i'), '/');
		}

		let data = [];
		for (const file of files) {
			if (!file.data) continue;
			// strip a string from the `file.dir` path
			let dir = p.relative(this.root, file.dir);
			// apply `opts.trim` func
			dir = p.normalize(opts.trim(dir));
			// esure no leading '/'
			dir = dir.charAt(0) === '/' ? dir.substr(1) : dir;
			// wrap & return each file's content in a $templateCache definition
			data.push(
				opts.templateContent
					.replace('<%= url %>', p.join(dir, file.base))
					.replace('<%= contents %>', strEsc(file.data.toString()))
			);
		}

		// "merge" all data && wrap with angular
		data = opts.templateHeader.concat(data.join(''), opts.templateFooter)
			.replace('<%= module %>', opts.moduleName)
			.replace('<%= standalone %>', (opts.standalone ? ', []' : ''));

		const mod = opts.moduleType && modules[opts.moduleType];

		if (mod) {
			data = (mod.header || '').concat(data, mod.footer || '');
		}

		// clone file entry; keep `dir`
		let out = files[0];
		out.base = opts.file;
		out.data = new Buffer(data);
		// wipe ALL files in favor of new clone
		this._.files = [out];
	}
};
