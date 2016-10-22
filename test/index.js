'use strict';

const join = require('path').join;
const test = require('tape').test;
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');

test('fly-ng-templatecache', t => {
	t.plan(6);

	const fly = new Fly({
		plugins: [{
			func: require('../')
		}],
		tasks: {
			a: function * () {
				const read = () => this.$.read(`${tmp}/templates.js`, 'utf8');
				t.ok('ngTemplates' in fly, 'attach `ngTemplates()` to fly');

				yield this.source(`${dir}/*.html`).ngTemplates().target(tmp);
				const str1 = yield read();
				t.ok(str1, 'create target javascript file');
				t.true(str1.includes('angular.module("templates")'), 'wrap as `angular.module` by default; with `templates` name');
				t.true(str1.includes('"test/fixtures/foo.html"'), 'include references to original path names');

				yield this.source(`${dir}/*.html`).ngTemplates({trim: str => str.replace('test/fixtures', 'hello')}).target(tmp);
				const str2 = yield read();
				t.true(str2.includes('"hello/foo.html"'), 'trim / modify the reference path');

				yield this.source(`${dir}/*.html`).ngTemplates({moduleType: 'requirejs'}).target(tmp);
				const str3 = yield read();
				t.true(str3.includes('define([\'angular\'], function(angular)'), 'change the `moduleType`');

				yield this.clear(tmp);
			}
		}
	});

	fly.start('a');
});
