'use strict'

var _gaq
var ga_id = "UA-83645427-1"

var _version = _version || (function get_version() {
	_version = chrome.runtime.getManifest().version
	return _version
}())

;( function setup () {

	if(ga_id !== "UA-xxx-1"){
		injectGA()
	}

	chrome.runtime.onInstalled.addListener( function ( details ) {
		if ( details.reason === "install" ) {
			chrome.tabs.create({
				url: chrome.extension.getURL("/assets/html/welcome.html"),
				active: true
			})
		}
	})

	chrome.runtime.onMessage.addListener(function( event, sender, sendResponse ) {
		_gaq.push(['_trackEvent', event.category, event.action, event.label, event.value])
	})

} () )

function injectGA(){

	_gaq = _gaq || []
	_gaq.push(['_setAccount', ga_id])
	_gaq.push(['_trackPageview'])

	;(function() {

		var ga, s
		ga = document.createElement('script')
		ga.type = 'text/javascript'
		ga.async = true
		ga.src = 'https://ssl.google-analytics.com/ga.js'

		s = document.getElementsByTagName('script')[0]
		s.parentNode.insertBefore(ga, s)
	}

)()

}
