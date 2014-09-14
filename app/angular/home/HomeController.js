'use strict';

angular.module('hexApp')
    .controller('HomeCtrl', function ($scope, $state) {

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
        function rgbToHex(r, g, b) {
            return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        // http://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
        var HSVtoRGB = function(h, s, v) {
            var r, g, b, i, f, p, q, t;
            if (h && s === undefined && v === undefined) {
                s = h.s;
                v = h.v;
                h = h.h;
            }
            i = Math.floor(h * 6);
            f = h * 6 - i;
            p = v * (1 - s);
            q = v * (1 - f * s);
            t = v * (1 - (1 - f) * s);
            switch (i % 6) {
                case 0: r = v, g = t, b = p; break;
                case 1: r = q, g = v, b = p; break;
                case 2: r = p, g = v, b = t; break;
                case 3: r = p, g = q, b = v; break;
                case 4: r = t, g = p, b = v; break;
                case 5: r = v, g = p, b = q; break;
            }
            return {
                r: Math.floor(r * 255),
                g: Math.floor(g * 255),
                b: Math.floor(b * 255)
            };
        };

        $scope.setBG = function(c) {
            var colorString = 'rgb(' + c.rgb.r + ',' + c.rgb.g + ',' + c.rgb.b + ')';
            $('body').css('background', colorString);
            $scope.current = {
                rgb: c.rgb,
                hex: rgbToHex(c.rgb.r, c.rgb.g, c.rgb.b),
                hsv: c.hsv
            };
            $scope.generateS();
            $scope.generateV();
        };
        $scope.setS = function(s) {
            var rgb = new HSVtoRGB($scope.current.hsv.h / 360, s.s, 1.0);
            var colorString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            $('body').css('background', colorString);
            $scope.current = {
                rgb: rgb,
                hex: rgbToHex(rgb.r, rgb.g, rgb.b),
                hsv: {h: $scope.current.hsv.h, s: Math.round(s.s * 100), v: 100}
            };
        };
        $scope.setV = function(v) {
            var rgb = new HSVtoRGB($scope.current.hsv.h / 360, 1.0, v.v);
            var colorString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
            $('body').css('background', colorString);
            $scope.current = {
                rgb: rgb,
                hex: rgbToHex(rgb.r, rgb.g, rgb.b),
                hsv: {h: $scope.current.hsv.h, s: 100, v: Math.round(v.v * 100)}
            };
        };
        $scope.generateS = function() {
            $scope.s = [];
            for(var i=0; i <= 100; i=i+2) {
                $scope.s.push({
                    s: i/100,
                    rgb: new HSVtoRGB($scope.current.hsv.h / 360, i / 100, 1.0)
                });
            }
        };

        $scope.generateV = function() {
            $scope.v = [];
            for(var i=0; i <= 100; i=i+2) {
                $scope.v.push({
                    v: i/100,
                    rgb: new HSVtoRGB($scope.current.hsv.h/360, 1.0, i/100)
                });
            }
        };

        // Init vars
        $scope.colors = [];
        for(var i=0; i <= 360; i=i+2) {
            $scope.colors.push({
                hsv: {h: i, s: 100, v: 100},
                rgb: new HSVtoRGB(i/360, 1, 1)
            });
        }

        $scope.setBG({
            rgb: {r:255, g:0, b:0},
            hsv: {h: 0, s: 100, v: 100}
        });
        $scope.generateS();
        $scope.generateV();

    });
