'use strict'

var _gaq
var ga_id = "UA-xxx-1"
var watch_url = ""

;( function setup () {

	injectGA()

	chrome.runtime.onInstalled.addListener( function ( details ) {
		if ( details.reason === "install" ) {
			chrome.tabs.create({
				url: chrome.extension.getURL("/assets/html/welcome.html"),
				active: true
			})
		}
	})

	chrome.tabs.query({ url: watch_url }, function ( tabs ) {
		tabs.forEach( function ( tab ) {
			chrome.tabs.reload( tab.id )
		})
	})

	chrome.runtime.onMessage.addListener(function( event, sender, sendResponse ) {
		_gaq.push(['_trackEvent', event.category, event.action, event.label, event.value])
	})

} () )

function injectGA(){

	if(ga_id !== "UA-xxx-1"){
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

	})()

}
