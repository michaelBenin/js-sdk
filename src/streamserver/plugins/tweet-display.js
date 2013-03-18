(function(jQuery) {
"use strict";

var $ = jQuery;

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.TweetDisplay
 * Adds the Twitter intents controls into the item UI and updates the
 * item UI to look and behave like a Twitter item. The item UI update includes:
 *
 * + by clicking on the avatar or the user name - the user account on Twitter
 * will be opened;
 * + the item timestamp transforms from a static field to a permanent item
 * link on Twitter.
 *
 * More information about Twitter Intents is available on the page
 * <https://dev.twitter.com/docs/intents>.
 *
 * #### How to use
 * To enable this plugin should be taken add the corresponding section into the
 * Echo Stream configuration parameter plugins:
 *
 * 	new Echo.StreamServer.Controls.Stream({
 * 		"target": document.getElementById("echo-stream"),
 * 		"appkey": "test.echoenabled.com",
 * 		"plugins": [{
 * 			"name": "TweetDisplay"
 * 		}]
 * 	});
 *
 * <b>Note</b>: plugin must be at the very beginning of the plugin list to
 * work correctly. If {@link Echo.StreamServer.Controls.Stream.Plugins.PinboardVisulization PinboardVisualization}
 * plugin is also enabled in the Stream then this plugin must be placed right after it.
 *
 * <b>Note</b>: if TweetDisplay plugin is added to the stream then Reply and
 * Like plugins will be disabled for tweet items. Moreover Reply control is
 * renamed with Comment on non-tweet items to avoid possible confusion.
 *
 * #### Configuration
 * The TweetDisplay plugin configuration options include the following:
 *
 * + enabled <br/>
 *   This parameter specifies if plugin is enabled during application initialization.
 *   See more [here](http://wiki.aboutecho.com/Client-Extensions-Framework#Enabling/disablingpluginsinrealtime).
 *
 * @extends Echo.Plugin
 */
var plugin = Echo.Plugin.manifest("TweetDisplay", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	var item = this.component;

	var config = item.config.get("contentTransformations");
	$.map(["text", "html", "xhtml"], function(contentType) {
		config[contentType].hashtags = false;
	});

	item.config.set("contentTransformations", config);
	item.config.set("plugins.Like.enabled", false);
	item.config.set("plugins.Reply.enabled", false);
	// icon must be visible to show that the item is from Twitter
	item.config.set("viaLabel.icon", true);

	this.extendTemplate("insertBefore", "authorName", plugin.templates.permalink);
	this.extendTemplate("insertAfter", "authorName", plugin.templates.username);

	item.addButtonSpec(this.name, this._assembleButton("tweet"));
	item.addButtonSpec(this.name, this._assembleButton("retweet"));
	item.addButtonSpec(this.name, this._assembleButton("favorite"));
};

plugin.labels = {
	/**
	 * @echo_label
	 */
	"tweet": "Reply",
	/**
	 * @echo_label
	 */
	"retweet": "Retweet",
	/**
	 * @echo_label
	 */
	"favorite": "Favorite",
	/**
	 * @echo_label
	 */
	"comment": "Comment",
	/**
	 * @echo_label
	 */
	"secondsAgo": "{seconds}s",
	/**
	 * @echo_label
	 */
	"minutesAgo": "{minutes}m",
	/**
	 * @echo_label
	 */
	"hoursAgo": "{hours}h",
	/**
	 * @echo_label
	 */
	"monthsAgo": "{date} {month}",
	/**
	 * @echo_label
	 */
	"yearsAgo": "{date} {month} {year}",
	/**
	 * @echo_label
	 */
	"fullDate": "{time} - {date}",
	/**
	 * @echo_label
	 */
	"m1": "Jan",
	/**
	 * @echo_label
	 */
	"m2": "Feb",
	/**
	 * @echo_label
	 */
	"m3": "Mar",
	/**
	 * @echo_label
	 */
	"m4": "Apr",
	/**
	 * @echo_label
	 */
	"m5": "May",
	/**
	 * @echo_label
	 */
	"m6": "Jun",
	/**
	 * @echo_label
	 */
	"m7": "Jul",
	/**
	 * @echo_label
	 */
	"m8": "Aug",
	/**
	 * @echo_label
	 */
	"m9": "Sep",
	/**
	 * @echo_label
	 */
	"m10": "Oct",
	/**
	 * @echo_label
	 */
	"m11": "Nov",
	/**
	 * @echo_label
	 */
	"m12": "Dec"
};

plugin.dependencies = [{
	"loaded": function() { return !!window.twttr; },
	"url": "http://platform.twitter.com/widgets.js"
}];

plugin.enabled = function() {
	return this._isTweet();
};

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.onRender": function(topic, args) {
		var activeClass = this.cssPrefix + "activeButton";
		var item = this.component;
		$.map(item.buttons[this.name], function(name) {
			name.element.unbind("click").unbind("mouseover mouseout")
				.hover(
					function() { name.element.addClass(activeClass); },
					function() { name.element.removeClass(activeClass); }
				);
		});
		window.twttr && window.twttr.widgets && window.twttr.widgets.load();
	}
};

plugin.templates = {
	"username": '<div class="{plugin.class:tweetUserName}"></div>',
	"permalink": '<div class="{plugin.class:tweetPermalink} echo-secondaryFont"></div>'
};

/**
 * @echo_renderer
 */
plugin.component.renderers.authorName = function(element) {
	var item = this.component;
	return item.parentRenderer("authorName", arguments)
		.removeClass("echo-linkColor")
		.addClass(this.cssPrefix + "tweetScreenName").wrapInner(
		Echo.Utils.hyperlink({
			"caption": "",
			"href": item.get("data.actor.id")
		}, {
			"openInNewWindow": item.config.get("openLinksInNewWindow"),
			"skipEscaping": true
		})
	);
};

/**
 * @echo_renderer
 */
plugin.component.renderers.avatar = function(element) {
	var item = this.component;
	return item.parentRenderer("avatar", arguments).wrap(
		Echo.Utils.hyperlink({
			"href": item.get("data.actor.id"),
			"caption": ""
		}, {
			"openInNewWindow": item.config.get("openLinksInNewWindow"),
			"skipEscaping": true
		})
	);
};

/**
 * @echo_renderer
 */
plugin.component.renderers.date = function(element) {
	var item = this.component;
	this.view.render({"name": "tweetPermalink"});
	return item.parentRenderer("date", arguments);
};

plugin.component.renderers._buttonsDelimiter = function(element) {
	var item = this.component;
	var posDelimiter = item.buttonSpecs[this.name].length;

	return item.parentRenderer("_buttonsDelimiter", arguments)
		.find("span[class*='button-delim']").eq(posDelimiter).text(" | ");
};

/**
 * @echo_renderer
 */
plugin.renderers.tweetUserName = function(element) {
	var item = this.component;
	return element.html(Echo.Utils.hyperlink({
		"href": item.get("data.actor.id"),
		"caption": "@" + this._extractTwitterID(),
		"class": "echo-secondaryFont echo-secondaryColor"
	}, {
		"openInNewWindow": item.config.get("openLinksInNewWindow"),
		"skipEscaping": true
	}));
};

plugin.renderers.tweetPermalink = function(element) {
	var item = this.component;
	return element.html(Echo.Utils.hyperlink({
		"caption": this._getTweetTime(),
		"href": item.get("data.object.id"),
		"class": "echo-secondaryFont echo-secondaryColor",
		"title": this._getTweetTime(true)
	}, {
		"openInNewWindow": item.config.get("openLinksInNewWindow"),
		"skipEscaping": true
	}));
};

plugin.methods._assembleButton = function(name) {
	var plugin = this, item = this.component;
	var match = item.get("data.object.id").match(/\/(\d+)$/);
	var id = match && match[1];
	return function() {
		return {
			"name": name,
			"label": plugin.labels.get(name),
			"template": Echo.Utils.hyperlink({
				"href": "https://twitter.com/intent/" + name + "?in_reply_to=" + id + "&tweet_id=" + id,
				"class": "echo-clickable " + plugin.cssPrefix + "intentControl echo-secondaryColor",
				"caption":
					'<span class="' + plugin.cssPrefix + 'icon ' + plugin.cssPrefix + 'icon-{data:name}">&nbsp;</span>' +
					'<span>{data:label}</span>'
			}, {
				"openInNewWindow": item.config.get("openLinksInNewWindow"),
				"skipEscaping": true
			}),
			"visible": id && plugin._isTweet()
		};
	};
};

plugin.methods._isTweet = function() {
	var item = this.component;
	return item.get("data.source.name") === "Twitter";
};

plugin.methods._getTweetTime = function(getFull) {
	var item = this.component;
	var d = new Date(item.timestamp * 1000);
	var now = (new Date()).getTime();
	var diff = Math.floor((now - d.getTime()) / 1000);
	var result;
	if (getFull) {
		result = this.labels.get("fullDate", {"time": d.toLocaleTimeString(), "date": d.toLocaleDateString()});
	} else {
		if (diff < 60) {
			result = this.labels.get("secondsAgo", {"seconds": diff});
		} else if(diff < 60 * 60) {
			result = this.labels.get("minutesAgo", {"minutes": Math.floor(diff / 60)});
		} else if(diff < 60 * 60 * 24) {
			result = this.labels.get("hoursAgo", {"hours": Math.floor(diff / (60 * 60))});
		} else if (diff < 60 * 60 * 24 * 365) {
			result = this.labels.get("monthsAgo", {"date": d.getDate(), "month": this.labels.get("m" + (d.getMonth() + 1))});
		} else {
			result = this.labels.get("yearsAgo", {"date": d.getDate(), "month": this.labels.get("m" + (d.getMonth() + 1)), "year": d.getFullYear()});
		}
	}
	return result;
};

plugin.methods._extractTwitterID = function() {
	var item = this.component;
	var match = item.get("data.actor.id").match(/twitter.com\/(.*)/);
	return match ? match[1] : item.get("data.actor.id");
};

plugin.css =
	".{class:avatar} a img { border: 0px; }" +
	".{class:date} { display: none; }" +
	".{class:buttons} .{class:button-delim}:first-child { display: none; }" +
	".{class:data} a { text-decoration: none; }" +
	".{class:data} a:hover { text-decoration: underline; }" +
	".{class:footer} { padding-top: 5px; }" +
	".{class:modeSwitch} { margin-left: 6px; }" +
	".{plugin.class:userName} { float: left; font-size: 15px; font-weight: bold; }" +
	".{plugin.css:screenName} { margin-left: 4px; font-size: 11px; font-weight: normal; padding-top: 1px; }" +
	".{plugin.class:userName} a, .{plugin.class:tweetUserName} a, .{plugin.class:intentControl} { text-decoration: none; }" +
	".{plugin.class:icon} { width: 15px; height: 15px; display: inline-block; margin-right: 3px; background: url(https://si0.twimg.com/images/dev/cms/intents/icons/sprites/everything-spritev2.png) no-repeat; }" +
	".{plugin.class:icon-tweet} { background-position: 0px -2px; }" +
	".{plugin.class:icon-retweet} { background-position: -80px -2px; }" +
	".{plugin.class:icon-favorite} { background-position: -32px -2px; }" +
	".{plugin.class:activeButton} .{plugin.class:icon-tweet} { background-position: -16px -2px; }" +
	".{plugin.class:activeButton} .{plugin.class:icon-retweet} { background-position: -96px -2px; }" +
	".{plugin.class:activeButton} .{plugin.class:icon-favorite} { background-position: -48px -2px; }" +
	".{plugin.class:tweetUserName} { margin-left: 4px; font-size: 15px; float: left; }" +
	".{plugin.class:twitterIcon} { float: left; margin-right: 3px; }" +
	".{plugin.class:date} { text-decoration: none; color: #C6C6C6; }" +
	".{plugin.class:tweetScreenName} a { text-decoration: none; color: #333333; }" +
	".{plugin.class:tweetPermalink} a { text-decoration: none; }" +
	".{plugin.class:tweetPermalink} a:hover { text-decoration: underline;  }" +
	".{plugin.class:tweetPermalink} { float: right; }";

Echo.Plugin.create(plugin);

})(Echo.jQuery);
