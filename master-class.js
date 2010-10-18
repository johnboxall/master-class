(function(window, document) {
	var documentElement = document.documentElement,
		klasses = [''],
		klassReplaces = {'no-js': 'js'};
	
	// OS.
	var m = /(ip(od|ad|hone)|android|nokia|blackberry|webos)/gi.exec(navigator.userAgent);
	if (m) {
		klassReplaces['no-os'] = m[2] ? 'ios' : m[1].toLowerCase();
	}
	
	// Orientation.
	if ('orientation' in window) {
		var orientationClasses = ['landscape', 'portrait'],
		    orientationRe = new RegExp('(' + orientationClasses.join('|') + ')'),
		    orientationEvent = ('onorientationchange' in window) ? 'orientationchange' : 'resize',
		    currentOrientationClass = klasses.push(getOrientationClass());
		
		addEventListener(orientationEvent, function() {
			var orientationClass = getOrientationClass();
			if (currentOrientationClass != orientationClass) {
				currentOrientationClass = orientationClass;
				var klassName = documentElement.className;
				documentElement.className = klassName ? 
					klassName.replace(orientationRe, currentOrientationClass) : 
						currentOrientationClass;
			}
		}, false);
		
		function getOrientationClass() {
			return orientationClasses[window.orientation % 180 ? 0 : 1];
		}
	}
	
	// Touch.
	if ('ontouchend' in document) {
		klassReplaces['no-touch'] = 'touch';
	}
	
	
	// HD.
	var test = document.createElement('div');
	test.style.display = 'none';
	test.id = 'mc-test';
	test.innerHTML = '<style type="text/css">@media(-webkit-min-device-pixel-ratio:1.5){#mc-test{color:red}}@media(-webkit-min-device-pixel-ratio:2.0){#mc-test{color:blue}}</style>';
	documentElement.appendChild(test);
	var color = test.ownerDocument.defaultView.getComputedStyle(test, null).getPropertyValue('color'),
		m = /255(\))?/gi.exec(color);
	if (m) {
		klasses.push('hd' + (m[1] ? 20 : 15));
		klassReplaces['no-hd'] = 'hd';
	}
	documentElement.removeChild(test);

	var klassName = documentElement.className;
	for (replace in klassReplaces) {
		klassName = klassName.replace(replace, klassReplaces[replace]);
	}
	documentElement.className = klassName + klasses.join(' ');

})(this, document);