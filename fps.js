(function() {
    'use strict';

    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = function(callback) {
        return setTimeout(function() {
            callback(performance.now());
        }, 0);
    };

    console.log('fps was boosted!');
})();
