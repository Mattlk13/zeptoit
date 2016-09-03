'use strict'

var settings = {
	check_lock: false,
	setup_complete: false
}

// run any initial setup, return true when complete
function run_setup(){
	if(hasZepto()){
			console.log('ZeptoIt:: ZeptoJs already loaded')
	}
	else {
		console.log('ZeptoIt:: ZeptoJs not found on page')
		addZepto()
	}
	console.log('ZeptoIt:: Setup Complete')
	return true
}

function addZepto(){
	var s, url
	url = chrome.extension.getURL("/assets/js/lib/zepto.min.js")
	s = document.createElement('script')
	s.src=url
	$('head').append(s)

	console.log('ZeptoIt:: ZeptoJs added to page')
}

function hasZepto(){
	return $('script').filter(function(){
		var src = $(this).attr('src')
		if(src) return src.indexOf('zepto') >= 0
		return false
	}).length > 0
}

function init_check(){
	try {
		if(run_setup())
		{
			settings.setup_complete = true
		} else {
			settings.check_lock = false
		}
	} catch (error) {
		console.error(error)
		settings.check_lock = false
	}
}

Zepto(function ($) {
	setInterval(function(){
		if(!settings.setup_complete && !settings.check_lock){
			settings.check_lock = true
			init_check()
		}
	}, 20)
})

var _version = _version || (function get_version() {
	_version = chrome.runtime.getManifest().version
	return _version
}())

;(function loaded() {
	chrome.runtime.sendMessage({ category: 'page', action: 'view', label: 'extension loaded', value: _version})
}())
