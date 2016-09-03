'use strict'

var settings = {
	watch_url: "",
	check_lock: false,
	setup_complete: false
}

// run any initial setup, return true when complete
function run_setup(){
	return true
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
