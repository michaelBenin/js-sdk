(function($) {

"use strict";

var suite = Echo.Tests.Unit.Control = function() {};

suite.prototype.info = {
        "className": "Echo.Control",
        "functions": [
		"skeleton",
		"create",
		"get",
		"set",
		"remove",
		"substitute",
		"dependent",
		"template",
		"getPlugin"
	]
};

suite.prototype.tests = {};

suite.prototype.tests.PublicInterfaceTests = {
	"config": {
		"async": true,
		"user": {"status": "anonymous"},
		"testTimeout": 20000 // 20 secs
	},
	"check": function() {
		var self = this;
		var skeleton = {
			"name": this.getTestControlClassName(),
			"config": {},
			"labels": {},
			"events": {},
			"methods": {},
			"renderers": {},
			"templates": {}
		};

		var _skeleton = Echo.Control.skeleton(skeleton.name);
		QUnit.ok(!!_skeleton.init,
			"Checking if we have a default initialization function in the \"skeleton\" function return");
		delete _skeleton.init;
		QUnit.deepEqual(skeleton, _skeleton,
			"Checking the \"skeleton\" function output");

		// create class out of manifest
		Echo.Control.create(this.getControlManifest(skeleton.name));

		// create test plugin
		this.createTestPlugin("MyPlugin", skeleton.name);

		this.sequentialAsyncTests([
			"basicOperations",
			"initializationWithInvalidParams",
			"incomingConfigHandling"
		], "cases");

	}
};

suite.prototype.cases = {};

suite.prototype.cases.basicOperations = function(callback) {
	var test = this;
	var manifest = this.getControlManifest();
	var definition = this.getTestControlClass();
	var check = function() {
		var self = this;

		// checking basic interface availability
		QUnit.ok(!!this.events,
			"Checking if we have \"events\" interface available");
		QUnit.ok(!!this.config,
			"Checking if we have \"config\" interface available");
		QUnit.ok(!!this.labels,
			"Checking if we have \"labels\" interface available");
		QUnit.ok(!!this.user,
			"Checking if we have \"user\" interface available");

		// checking "get" operation
		var data = manifest.config.data;
		QUnit.equal(this.get("data.key1"), data.key1,
			"Checking if we can extract data passed via config using the \"get\" function");
		QUnit.equal(this.get("data.key3.key3nested"), data.key3.key3nested,
			"Checking if we can extract nested data passed via config using the \"get\" function");
		QUnit.equal(this.get("non-existing-key"), undefined,
			"Trying to fetch the value using non-existing key via \"get\" function");
		QUnit.equal(this.get("non-existing-key", "default"), "default",
			"Trying to fetch the value using non-existing key via \"get\" function and passing default value");
		QUnit.equal(this.get("non-existing-key", false), false,
			"Trying to fetch the value using non-existing key via \"get\" function and passing 'false' as a default value");
		QUnit.equal(this.get("integerParam"), 15,
			"Extracting the value of the class variables defined in manifest");
		QUnit.equal(this.get("zeroParam", "somevalue"), 0,
			"Extracting the 0 value of the class variables and passing default value");

		// checking "set"/"get"/"remove" scenario
		this.set("myField", "myValue");
		QUnit.equal(this.get("myField"), "myValue",
			"Checking basic value set/get scenario (value of type string)");
		this.set("myField", {"key1": "value1"});
		QUnit.equal(this.get("myField.key1"), "value1",
			"Checking basic value set/get scenario (value of type object)");
		this.remove("myField", "myValue");
		QUnit.equal(this.get("myField"), undefined,
			"Checking field remove operation");

		// checking "substitute" method
		$.each(test.data.substitutions, function(id, substitution) {
			QUnit.equal(self.substitute(substitution[0]), substitution[1],
				"Checking \"substitute\" method, pattern #" + (id + 1));
		});

		// checking "dependent" method
		QUnit.ok(!this.dependent(),
			"Checking if a given control was initialized within another control");
		this.config.set("parent", {});
		QUnit.ok(this.dependent(),
			"Checking if \"dependent\" function detects the config update");
		this.config.remove("parent");

		// checking "getPlugin" method
		QUnit.ok(!!this.getPlugin("MyPlugin"),
			"Checking if existing plugin ref is available");
		QUnit.ok(!this.getPlugin("FakePlugin"),
			"Checking if dummy plugin ref is NOT available");

		callback && callback();
	};
	new definition({
		"target": $("<div></div>"),
		"appkey": "test.echoenabled.com",
		"data": manifest.config.data,
		"plugins": [{
			"name": "MyPlugin"
		}],
		"ready": check
	});
};

suite.prototype.cases.initializationWithInvalidParams = function(callback) {
	var result, definition = this.getTestControlClass();

	result = new definition();
	QUnit.ok($.isEmptyObject(result),
		"Checking if 'false' is returned if no config is passed");

	result = new definition({"target": $("div")});
	QUnit.ok($.isEmptyObject(result),
		"Checking if empty object is returned if no appkey is passed in config");

	result = new definition({"appkey": "test.echoenabled.com"});
	QUnit.ok($.isEmptyObject(result),
		"Checking if empty object is returned if no target is passed in config");
	
	callback && callback();
};

suite.prototype.cases.incomingConfigHandling = function(callback) {
	var definition = this.getTestControlClass();
	var check = function() {
		QUnit.equal(this.config.get("nullParam"), "nullParam replacement",
			"Checking if null parameter was overridden during control init");
		QUnit.equal(this.config.get("undefinedParam"), "undefinedParam replacement",
			"Checking if null parameter was overridden during control init");
		QUnit.equal(this.config.get("integerParam"), 15,
			"Checking if non-changed keys remains the same");
		QUnit.equal(this.config.get("objectParam.param1"), "param1.override",
			"Checking if object parameter was overridden (checking new key)");
		QUnit.equal(this.config.get("objectParam.param2"), undefined,
			"Checking if object parameter was overridden (checking existing key)");
		callback && callback();
	};
	new definition({
		"target": $("<div></div>"),
		"appkey": "test.echoenabled.com",
		"objectParam": {"param1": "param1.override"},
		"myTestParam": "test value",
		"undefinedParam": "undefinedParam replacement",
		"nullParam": "nullParam replacement",
		"ready": check
	});
};

// data required to perform tests

suite.prototype.data = {};

suite.prototype.data.substitutions = [[
	"",
	""
], [
	"test string with no substitutions",
	"test string with no substitutions"
], [
	"<div>HTML text with no <b>substitutions</b></div>",
	"<div>HTML text with no <b>substitutions</b></div>"
], [
	".css-classes-with-no-subs { text-align: right; color: red; }",
	".css-classes-with-no-subs { text-align: right; color: red; }"
], [
	"test string with substitutions {label:label1}",
	"test string with substitutions label1 value"
], [
	"bad pattern should not break the string {label:} {config:} {self:}",
	"bad pattern should not break the string {label:} {config:} {self:}"
], [
	"non existing label extraction {label:nonexisting}, shoud return key",
	"non existing label extraction nonexisting, shoud return key"
], [
	"<div class=\"{class:test}\">div with css class name defined</div>",
	"<div class=\"echo-streamserver-controls-mycontrol-test\">div with css class name defined</div>"
], [
	"<div class=\"{class:test} {class:test1} {class:test2}\">div with multiple css class names defined</div>",
	"<div class=\"echo-streamserver-controls-mycontrol-test echo-streamserver-controls-mycontrol-test1 echo-streamserver-controls-mycontrol-test2\">div with multiple css class names defined</div>"
], [
	"<div class=\"{class:test}\">{data:key3.key3nested}</div>",
	"<div class=\"echo-streamserver-controls-mycontrol-test\"></div>"
], [
	"<div class=\"{class:test}\">{self:data.key3.key3nested}</div>",
	"<div class=\"echo-streamserver-controls-mycontrol-test\">nested value for key 3</div>"
], [
	"<div class=\"{class:test}\">{label:label1}{label:label2}{self:data.key3.key3nested}{class:example} - mix of multiple patterns</div>",
	"<div class=\"echo-streamserver-controls-mycontrol-test\">label1 valuelabel2 valuenested value for key 3echo-streamserver-controls-mycontrol-example - mix of multiple patterns</div>"
], [
	"{config:stringParam}-{config:nonexistingkey}-{config:integerParam}-{config:objectParam.param1}",
	"Some test value--15-param1.value"
]];

// TODO: apply such pattern for the Echo.Configuration lib tests...
suite.prototype.data.config = {
	"data": {
		"key1": "key1 value",
		"key2": "key2 value",
		"key3": {
			"key3nested": "nested value for key 3"
		}
	},
	"stringParam": "Some test value",
	"arrayParam": [1, 2, 3, 4, 5],
	"integerParam": 15,
	"undefinedParam": undefined,
	"nullParam": null,
	"booleanFalseParam": false,
	"booleanTrueParam": true,
	"zeroParam": 0,
	"objectParam": {
		"param1": "param1.value",
		"param2": "param2.value",
		"param3": {
			"nestedParam": {
				"nested1": 1,
				"nested2": 2
			}
		}
	}
};

// test helper functions 

suite.prototype.getTestControlClassName = function() {
	return "Echo.StreamServer.Controls.MyControl";
};

suite.prototype.getTestControlClass = function() {
	return Echo.Utils.getComponent(this.getTestControlClassName());
};

suite.prototype.createTestPlugin = function(pluginName, controlName) {
	var plugin = Echo.Plugin.skeleton(pluginName, controlName);
	if (!Echo.Plugin.isDefined(plugin)) {
		Echo.Plugin.create(plugin);
	}
};

suite.prototype.getControlManifest = function(name) {

var manifest = Echo.Control.skeleton(name || this.getTestControlClassName());

manifest.config = $.extend(true, {}, this.data.config);

// copy vars from config
manifest.vars = $.extend(true, {}, manifest.config);

// removing data from vars to avoid intersection
// because the "data" will be copied over from config
delete manifest.vars.data;

manifest.labels = {
	"label1": "label1 value",
	"label2": "label2 value",
	"label3": "label3 value"
};

manifest.init = function() {
        this.render();
}

manifest.templates.main =
	'<div class="{class:container}">' +
		'<div class="{class:testRenderer}"></div>' +
		// checking {data:...} substitution
		'<div class="{class:data} echo-primaryFont echo-primaryColor">{data:key1}</div>' +
		'<div class="{class:dataNested} echo-primaryColor">{data:key3.key3nested}</div>' +
		'<div class="{class:dataNonExisting}">{data:nonexistingkey}</div>' +
		// checking {label:...} substitution
		'<div class="{class:label} echo-primaryFont">{label:label1}</div>' +
		'<div class="{class:labelNonExisting}">{label:nonexistinglabel}</div>' +
		'<div class="{class:class}">{class:myclass}</div>' +
		// checking {config:...} substitution
		'<div class="{class:configNonExisting}">{config:nonexistingkey}</div>' +
		'<div class="{class:configString} echo-primaryFont">{config:stringParam}</div>' +
		'<div class="{class:configArray}">{config:arrayParam}</div>' +
		'<div class="{class:configInteger} echo-primaryFont">{config:integerParam}</div>' +
		'<div class="{class:configUndefined}">{config:undefinedParam}</div>' +
		'<div class="{class:configNull} echo-primaryFont">{config:null}</div>' +
		'<div class="{class:configBooleanFalse}">{config:booleanFalse}</div>' +
		'<div class="{class:configBooleanTrue}">{config:booleanTrue}</div>' +
		'<div class="{class:configZero} echo-primaryFont">{config:zeroParam}</div>' +
		'<div class="{class:configObject} echo-primaryFont">{config:objectParam}</div>' +
		// checking {self:...} substitution
		'<div class="{class:selfData} echo-primaryFont">{self:data}</div>' +
		'<div class="{class:selfDataKey} echo-primaryFont">{self:data.key1}</div>' +
		'<div class="{class:selfDataKeyNested}">{self:data.key3.key3nested}</div>' +
		'<div class="{class:selfNonExistingKey}">{self:nonExistingKey}</div>' +
		'<div class="{class:selfFuntion} echo-primaryFont">{self:render}</div>' +
		// checking custom substitution rules
		'<div class="{class:customSubstitution}">{mysubs:key}</div>' +
		'<div class="{class:customSubstitutionNestedKey}">{mysubs:key.key1.key2}</div>' +
		'<div class="{class:customSubstitutionNestedName}">{mysub.sub1.sub2:key.key1}</div>' +
	'</div>';

manifest.templates.custom =
	'<div class="{class:container}">' +
		'<div class="{class:testRenderer}"></div>' +
		'<div class="{class:testRenderer1}"></div>' +
	'</div>';

// TODO: add "events"!

manifest.renderers.testRenderer = function(element, dom) {
	return element.append('<div>Some vlaue</div>');
};

manifest.methods.myMethod = function(arg) {
	return arg;
};

manifest.css =
	'.{class:header} { margin-bottom: 3px; }' +
        '.{class:avatar} .{class:image} { float: left; margin-right: -48px; }' +
        '.{class:avatar} img { width: 48px; height: 48px; }' +
        '.{class:fields} { width: 100%; float: left; }' +
        '.{class:fields} input { width: 100%; }';

return manifest;

};

})(jQuery);