Ext.data.JsonP.terminology({
  "guide": "<h1>Terminology and dev tips</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/terminology-section-1'>Overview</a></li>\n<li><a href='#!/guide/terminology-section-2'>Terms</a></li>\n<li><a href='#!/guide/terminology-section-3'>Creating a JavaScript closure for the components</a></li>\n<li><a href='#!/guide/terminology-section-4'>Rendering engine</a></li>\n</ol>\n</div>\n\n<h2 id='terminology-section-1'>Overview</h2>\n\n<p>This guide contains the definition of the terms widely used across different JS SDK areas, various development tips and description of the SDK concepts.</p>\n\n<h2 id='terminology-section-2'>Terms</h2>\n\n<h3>Manifest</h3>\n\n<p>The unified structure which describes a certain application, control or a plugin is called a <em>manifest</em>. Each component type has a special \"manifest\" function (<a href=\"#!/api/Echo.Control-static-method-manifest\">Echo.Control.manifest</a>, <a href=\"#!/api/Echo.Plugin-static-method-manifest\">Echo.Plugin.manifest</a>, <a href=\"#!/api/Echo.App-static-method-manifest\">Echo.App.manifest</a>) to generate an empty <em>manifest</em> skeleton which can be filled in with the business logic. In addition to the \"manifest\" function, there is a set of \"create\" functions to turn static definition into the JS classes (<a href=\"#!/api/Echo.Control-static-method-create\">Echo.Control.create</a>, <a href=\"#!/api/Echo.Plugin-static-method-create\">Echo.Plugin.create</a> and <a href=\"#!/api/Echo.App-static-method-create\">Echo.App.create</a>). More information about the use of the <em>manifest</em> can be found in the <a href=\"#!/guide/how_to_develop_control\">Contol</a>, <a href=\"#!/guide/how_to_develop_plugin\">Plugin</a> or <a href=\"#!/guide/how_to_develop_app\">App</a> development guides.</p>\n\n<h3>Control</h3>\n\n<p><em>Control</em> is a JavaScript class with the pre-defined structure (generated out of the control manifest) which represents a certain set of discrete funcitonality. Control examples: <a href=\"#!/api/Echo.StreamServer.Controls.Stream\">Stream control</a>, <a href=\"#!/api/Echo.StreamServer.Controls.Submit\">Submit control</a>, <a href=\"#!/api/Echo.IdentityServer.Controls.Auth\">Auth control</a>, etc. More information about the Controls development can be found in <a href=\"#!/guide/how_to_develop_control\">the hands-on guide</a>.</p>\n\n<h3>Plugin</h3>\n\n<p><em>Plugin</em> is a JavaScript class with the pre-defined structure (generated out of the plugin manifest) which extends a certain part of a Control or an App. Plugin examples: <a href=\"#!/api/Echo.StreamServer.Controls.Stream.Item.Plugins.Reply\">Reply</a>, <a href=\"#!/api/Echo.StreamServer.Controls.Stream.Item.Plugins.Edit\">Edit</a>, <a href=\"#!/api/Echo.StreamServer.Controls.Stream.Item.Plugins.Like\">Like</a>. More information about the Plugins development can be found in <a href=\"#!/guide/how_to_develop_plugin\">the hands-on guide</a>.</p>\n\n<h3>Application (aka App)</h3>\n\n<p><em>Application</em> (or <em>App</em>) is a JavaScript class with the pre-defined structure (generated out of the app manifest) which combines multiple controls and plugins into a package to achieve a certain functionality. More information about the Apps development can be found in <a href=\"#!/guide/how_to_develop_app\">the hands-on guide</a>.</p>\n\n<h3>Renderer</h3>\n\n<p>The appearance of an application can be considered as a composition of its visual components, which are in fact DOM elements with its own structure. Function which produces specific component or modifies it is called <em>Renderer</em> and is in fact the minimal entity in terms of Echo component visual design.</p>\n\n<h2 id='terminology-section-3'>Creating a JavaScript closure for the components</h2>\n\n<p>Any Echo JS SDK component should be placed to a separate JS closure to provide a unique namespace for the component and avoid code intersection.</p>\n\n<pre class='inline-example '><code>(function(jQuery) {\n\"use strict\";\n\nvar $ = jQuery;\n\n// component code goes here\n\n})(Echo.jQuery);\n</code></pre>\n\n<p>Due to the fact that Echo JS SDK uses a separate jQuery instance (available as Echo.jQuery), we pass the Echo.jQuery reference as the anonymous function argument and accept is as jQuery variable. In addition to that we add the $ variable and link it to the same jQuery reference. So inside the JS closure both \"jQuery\" and \"$\" vars are available, like on a regular page with the jQuery lib included.</p>\n\n<p>Also we add the directive to switch the JS code execution to the strict mode (\"user strict\"). It helps to avoid the mistakes (such as using the global vars in inappropriate places, etc) while developing the code + the code which works in the strict mode will be minified without any issues.</p>\n\n<h2 id='terminology-section-4'>Rendering engine</h2>\n\n<p>How the rendering works...</p>\n",
  "title": "Terminology and dev tips"
});