## Demo 
[plnkr](http://embed.plnkr.co/ITWOx4CJnVpVaDmpHewY/preview)

## About
[Peity](http://benpickles.github.io/peity/) is a jQuery plugin that converts an element's content into simple `<svg>` charts. This is an AngularJS directive that makes them easy to use in any project by binding data and options to a controller.

## Installation
This project, along with all of its dependencies are installed with [Bower](http://bower.io/): `bower install ng-peity`.

## Set up
If you're familar with how to include third-party modules in AngularJS, then you can probably skip this section. If you're new to the framework, this should help.

### Step 1
Include the file before the main app file:

~~~html
<script src="/bower_components/jquery/jquery.min.js"></script>
<script src="/bower_components/peity/jquery.peity.min.js"></script>
<script src="/bower_components/ng-peity/ng-peity.js"></script>
<script src="/js/app.js"></script>
~~~

### Step 3
Add `ng-peity` to the app requirements (`/js/app.js`).
~~~javascript
var app = angular.module('myApp', [
    'myApp.controllers',
    'myApp.filters',
    'myApp.services',
    // 3rd party dependencies
    'ng-peity'
]);
~~~

## Use it
This module creates three custom directives (tags) that can be used anywhere in your templates. Each directive uses two attributes that are bound to properties of a controller.

* **data** - This attribute is required and is used to supply the data points that the chart will display in an array.

* **options** - This attribute is not required. If used it should be an object with property names that match the available options for the type of chart being used. Information about specific options for each chart type is available at: [http://benpickles.github.io/peity/](http://benpickles.github.io/peity/).

#### Controller Example
~~~javascript
var cMod = angular.module( 'myApp.controllers', ['ng-peity'] );

cMod.controller( 'ChartCtrl', function ( $scope, $interval ) {

    /*
        This example is over simplified to demonstrate the relationship
        between the 'controller' and the 'template' with regard to loading
        the 'icon' value. Hopefully, you will be loading your controller with
        data from an actual API response. :)
    */
    $scope.PieChart = {
        data: [1, 2, 3, 4],
        options: {
            diameter: 150
        }
    };

    $scope.BarChart = {
        data: [1, 2, 3, 4],
        options: {
            width: 150,
            height: 150
        }
    };
    
    // Test automatic updates
    $interval(function() {
        var random = Math.round(Math.random() * 10);
        $scope.BarChart.data.shift();
        $scope.BarChart.data.push(random);
        $scope.BarChart.options.fill[0] = '#'+Math.floor(Math.random()*16777215).toString(16);
    }, 1000);

    $scope.LineChart = {
        data: [1, 2, 3, 4, 3, 1],
        options: {
            width: 150,
            stroke: "#eee"
        }
    };

} );
~~~

#### Template Example
~~~html
<inline-pie-chart data="PieChart.data" options="PieChart.options"></pie-chart>

<inline-bar-chart data="BarChart.data" options="BarChart.options"></bar-chart>

<inline-line-chart data="LineChart.data" options="LineChart.options"></line-chart>
~~~
