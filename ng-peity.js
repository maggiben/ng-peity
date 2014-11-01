///////////////////////////////////////////////////////////////////////////////
// @file         : ng-peity.js                                               //
// @summary      : An AngularJS directive for Peity charts                   //
// @version      : 0.0.1                                                     //
// @description  :                                                           //
// @author       : Benjamin Maggi                                            //
// @email        : benjaminmaggi@gmail.com                                   //
// @date         : 1 Nov 2014                                                //
// @license:     : MIT                                                       //
// ------------------------------------------------------------------------- //
//                                                                           //
// Copyright 2014 Benjamin Maggi <benjaminmaggi@gmail.com>                   //
//                                                                           //
//                                                                           //
// License:                                                                  //
// Permission is hereby granted, free of charge, to any person obtaining a   //
// copy of this software and associated documentation files                  //
// (the "Software"), to deal in the Software without restriction, including  //
// without limitation the rights to use, copy, modify, merge, publish,       //
// distribute, sublicense, and/or sell copies of the Software, and to permit //
// persons to whom the Software is furnished to do so, subject to the        //
// following conditions:                                                     //
//                                                                           //
// The above copyright notice and this permission notice shall be included   //
// in all copies or substantial portions of the Software.                    //
//                                                                           //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS   //
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF                //
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.    //
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY      //
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,      //
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE         //
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                    //
//                                                                           //
///////////////////////////////////////////////////////////////////////////////

var angularPeity = angular.module( 'ng-peity', [] )
.factory('buildChartDirective', ['$window', '$timeout', function($window, $timeout){
    
    return function(chartType) {    
        return {
            restrict: 'E',
            scope: {
                data: "=",
                options: "="
            },
            link: function ( scope, element, attrs ) {

                var $span, options, chart;

                // Create container
                options = scope.options || {};
                $span = element.append('<span></span>');
                $span.text(scope.data.join());
                chart = $span.peity( chartType, options );

                // Debounce f() ripped from _.
                function debounce(func, wait, immediate) {
                     var timeout;
                     return function() {
                        var context = this, args = arguments;
                        $timeout.cancel(timeout);
                        timeout = $timeout(function() {
                            timeout = null;
                            if (!immediate) {
                                func.apply(context, args);
                            }
                        }, wait);
                        if (immediate && !timeout) {
                            func.apply(context, args);
                        }
                    };
                }

                // Redraw
                var delayedResize = debounce(function() {
                    var peity = chart.data().peity;
                    peity.draw();
                }, 300);
                angular.element($window).bind('resize', delayedResize);

                // Update chart values
                scope.$watchCollection('data', function (newVal, oldVal) {
                    chart.text(newVal.join(",")).change();
                });
                
                // Update options
                scope.$watch('options', function (newVal, oldVal) {
                    var peity = chart.data().peity;
                    peity.opts = $.extend(peity.opts, newVal);
                    peity.draw();
                });
            }
        };
    };
}])
.directive( 'inlinePieChart', ['buildChartDirective', function (buildChartDirective) {
    return buildChartDirective( "pie" );
}])
.directive( 'inlineBarChart', ['buildChartDirective', function (buildChartDirective) {
    return buildChartDirective( "bar" );
}])
.directive( 'inlineLineChart', ['buildChartDirective', function (buildChartDirective) {
    return buildChartDirective( "line" );
}]);
