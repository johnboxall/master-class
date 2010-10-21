/*!
 * master-class v0.1
 * http://johnboxall.github.com/master-class/
 * Copyright 2010, Mobify
 * Freely distributed under the MIT license.
 */
(function(window, document) {
    var documentElement = document.documentElement,
        classes = [''],
        classReplaces = {'no-js': 'js'};
    
    // OS.
    var m = /(ip(od|ad|hone)|android|nokia|blackberry|webos)/gi.exec(navigator.userAgent);
    if (m) {
        classReplaces['no-os'] = m[2] ? 'ios' : m[1].toLowerCase();
    }
    
    // Orientation.
    if ('orientation' in window) {
        var orientationClasses = ['landscape', 'portrait'],
            orientationRe = new RegExp('(' + orientationClasses.join('|') + ')'),
            orientationEvent = ('onorientationchange' in window) ? 'orientationchange' : 'resize',
            currentOrientationClass = classes.push(getOrientationClass());
        
        addEventListener(orientationEvent, function() {
            var orientationClass = getOrientationClass();
            if (currentOrientationClass != orientationClass) {
                currentOrientationClass = orientationClass;
                var className = documentElement.className;
                documentElement.className = className ? 
                    className.replace(orientationRe, currentOrientationClass) : 
                        currentOrientationClass;
            }
        }, false);
        
        function getOrientationClass() {
            return orientationClasses[window.orientation % 180 ? 0 : 1];
        }
    }
    
    // Touch.
    if ('ontouchend' in document) {
        classReplaces['no-touch'] = 'touch';
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
        classes.push('hd' + (m[1] ? 20 : 15));
        classReplaces['no-hd'] = 'hd';
    }
    documentElement.removeChild(test);

    var className = documentElement.className;
    for (replace in classReplaces) {
        className = className.replace(replace, classReplaces[replace]);
    }
    documentElement.className = className + classes.join(' ');

})(this, document);