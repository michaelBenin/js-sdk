Ext.data.JsonP.Echo_IdentityServer_API_Request({
  "tagname": "class",
  "name": "Echo.IdentityServer.API.Request",
  "extends": "Echo.API.Request",
  "mixins": [

  ],
  "alternateClassNames": [

  ],
  "aliases": {
  },
  "singleton": false,
  "requires": [

  ],
  "uses": [

  ],
  "enum": null,
  "override": null,
  "inheritable": null,
  "inheritdoc": null,
  "meta": {
  },
  "private": null,
  "id": "class-Echo.IdentityServer.API.Request",
  "members": {
    "cfg": [
      {
        "name": "apiBaseUrl",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-apiBaseUrl"
      },
      {
        "name": "endpoint",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-endpoint"
      },
      {
        "name": "method",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-method"
      },
      {
        "name": "onClose",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-onClose"
      },
      {
        "name": "onData",
        "tagname": "cfg",
        "owner": "Echo.IdentityServer.API.Request",
        "meta": {
        },
        "id": "cfg-onData"
      },
      {
        "name": "onError",
        "tagname": "cfg",
        "owner": "Echo.IdentityServer.API.Request",
        "meta": {
        },
        "id": "cfg-onError"
      },
      {
        "name": "onOpen",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-onOpen"
      },
      {
        "name": "submissionProxyURL",
        "tagname": "cfg",
        "owner": "Echo.IdentityServer.API.Request",
        "meta": {
        },
        "id": "cfg-submissionProxyURL"
      },
      {
        "name": "timeout",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-timeout"
      },
      {
        "name": "transport",
        "tagname": "cfg",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "cfg-transport"
      }
    ],
    "property": [

    ],
    "method": [
      {
        "name": "constructor",
        "tagname": "method",
        "owner": "Echo.IdentityServer.API.Request",
        "meta": {
        },
        "id": "method-constructor"
      },
      {
        "name": "send",
        "tagname": "method",
        "owner": "Echo.API.Request",
        "meta": {
        },
        "id": "method-send"
      }
    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "statics": {
    "cfg": [

    ],
    "property": [

    ],
    "method": [
      {
        "name": "request",
        "tagname": "method",
        "owner": "Echo.IdentityServer.API.Request",
        "meta": {
          "static": true
        },
        "id": "static-method-request"
      }
    ],
    "event": [

    ],
    "css_var": [

    ],
    "css_mixin": [

    ]
  },
  "linenr": 10,
  "files": [
    {
      "filename": "api.js",
      "href": "api.html#Echo-IdentityServer-API-Request"
    }
  ],
  "html_meta": {
  },
  "component": false,
  "superclasses": [
    "Echo.API.Request"
  ],
  "subclasses": [

  ],
  "mixedInto": [

  ],
  "parentMixins": [

  ],
  "html": "<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='docClass'>Echo.API.Request</a><div class='subclass '><strong>Echo.IdentityServer.API.Request</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/api.html#Echo-IdentityServer-API-Request' target='_blank'>api.js</a></div></pre><div class='doc-contents'><p>Class implements the interaction with the <a href=\"http://wiki.aboutecho.com/w/page/35104702/API-section-users\" target=\"_blank\">Echo Users API</a></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-apiBaseUrl' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-apiBaseUrl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-apiBaseUrl' class='name not-expandable'>apiBaseUrl</a><span> : String</span></div><div class='description'><div class='short'><p>Specifies the base URL for API requests</p>\n</div><div class='long'><p>Specifies the base URL for API requests</p>\n</div></div></div><div id='cfg-endpoint' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-endpoint' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-endpoint' class='name not-expandable'>endpoint</a><span> : String</span></div><div class='description'><div class='short'><p>Specifes the API endpoint.</p>\n</div><div class='long'><p>Specifes the API endpoint.</p>\n</div></div></div><div id='cfg-method' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-method' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-method' class='name expandable'>method</a><span> : String</span></div><div class='description'><div class='short'>Specifies the request method. ...</div><div class='long'><p>Specifies the request method.</p>\n<p>Defaults to: <code>&quot;GET&quot;</code></p></div></div></div><div id='cfg-onClose' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-onClose' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-onClose' class='name not-expandable'>onClose</a><span> : Function</span></div><div class='description'><div class='short'><p>Callback called after API request aborting.</p>\n</div><div class='long'><p>Callback called after API request aborting.</p>\n</div></div></div><div id='cfg-onData' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.IdentityServer.API.Request'>Echo.IdentityServer.API.Request</span><br/><a href='source/api.html#Echo-IdentityServer-API-Request-cfg-onData' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.IdentityServer.API.Request-cfg-onData' class='name not-expandable'>onData</a><span> : Function</span></div><div class='description'><div class='short'><p>Callback called after API request succeded.</p>\n</div><div class='long'><p>Callback called after API request succeded.</p>\n<p>Overrides: <a href='#!/api/Echo.API.Request-cfg-onData' rel='Echo.API.Request-cfg-onData' class='docClass'>Echo.API.Request.onData</a></p></div></div></div><div id='cfg-onError' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.IdentityServer.API.Request'>Echo.IdentityServer.API.Request</span><br/><a href='source/api.html#Echo-IdentityServer-API-Request-cfg-onError' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.IdentityServer.API.Request-cfg-onError' class='name not-expandable'>onError</a><span> : Function</span></div><div class='description'><div class='short'><p>Callback called after API request failed.</p>\n</div><div class='long'><p>Callback called after API request failed.</p>\n<p>Overrides: <a href='#!/api/Echo.API.Request-cfg-onError' rel='Echo.API.Request-cfg-onError' class='docClass'>Echo.API.Request.onError</a></p></div></div></div><div id='cfg-onOpen' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-onOpen' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-onOpen' class='name not-expandable'>onOpen</a><span> : Function</span></div><div class='description'><div class='short'><p>Callback called before sending an API request.</p>\n</div><div class='long'><p>Callback called before sending an API request.</p>\n</div></div></div><div id='cfg-submissionProxyURL' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.IdentityServer.API.Request'>Echo.IdentityServer.API.Request</span><br/><a href='source/api.html#Echo-IdentityServer-API-Request-cfg-submissionProxyURL' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.IdentityServer.API.Request-cfg-submissionProxyURL' class='name expandable'>submissionProxyURL</a><span> : String</span></div><div class='description'><div class='short'>Specifes the URL to the submission proxy service. ...</div><div class='long'><p>Specifes the URL to the submission proxy service.</p>\n<p>Defaults to: <code>&quot;http://apps.echoenabled.com/v2/esp/activity&quot;</code></p></div></div></div><div id='cfg-timeout' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-timeout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-timeout' class='name expandable'>timeout</a><span> : Number</span></div><div class='description'><div class='short'>Specifies the number of seconds after which onError callback will be\ncalled if API request failed. ...</div><div class='long'><p>Specifies the number of seconds after which onError callback will be\ncalled if API request failed.</p>\n<p>Defaults to: <code>30</code></p></div></div></div><div id='cfg-transport' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-cfg-transport' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-cfg-transport' class='name expandable'>transport</a><span> : String</span></div><div class='description'><div class='short'>Specifies the transport name. ...</div><div class='long'><p>Specifies the transport name.</p>\n<p>Defaults to: <code>&quot;ajax&quot;</code></p></div></div></div></div></div><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Instance Methods</h3><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.IdentityServer.API.Request'>Echo.IdentityServer.API.Request</span><br/><a href='source/api.html#Echo-IdentityServer-API-Request-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/Echo.IdentityServer.API.Request-method-constructor' class='name expandable'>Echo.IdentityServer.API.Request</a>( <span class='pre'>Object config</span> ) : Object</div><div class='description'><div class='short'>Constructor initializing class using configuration data. ...</div><div class='long'><p>Constructor initializing class using configuration data.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>Configuration data.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-send' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Echo.API.Request' rel='Echo.API.Request' class='defined-in docClass'>Echo.API.Request</a><br/><a href='source/api3.html#Echo-API-Request-method-send' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.API.Request-method-send' class='name expandable'>send</a>( <span class='pre'>[Object args]</span> )</div><div class='description'><div class='short'>Method performing api request using given parameters. ...</div><div class='long'><p>Method performing api request using given parameters.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>args</span> : Object (optional)<div class='sub-desc'><p>Request parameters.</p>\n<ul><li><span class='pre'>force</span> : Boolean (optional)<div class='sub-desc'><p>Flag to initiate aggressive polling.</p>\n</div></li></ul></div></li></ul></div></div></div></div><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static Methods</h3><div id='static-method-request' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Echo.IdentityServer.API.Request'>Echo.IdentityServer.API.Request</span><br/><a href='source/api.html#Echo-IdentityServer-API-Request-static-method-request' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Echo.IdentityServer.API.Request-static-method-request' class='name expandable'>request</a>( <span class='pre'>Object Configuration</span> ) : Object<strong class='static signature' >static</strong></div><div class='description'><div class='short'>Alias for the class constructor. ...</div><div class='long'><p>Alias for the class constructor.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>Configuration</span> : Object<div class='sub-desc'><p>data.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>New class instance.</p>\n</div></li></ul></div></div></div></div></div></div></div>"
});