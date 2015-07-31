//This file initializes the graphs for Crime Score, Restaurant Score, and Number of Restaurants

var m = require('mithril');

//All data for populating the graphs comes from Location.search()
var Location = require('../models/Location');

exports.controller = function(options) {
  ctrl = this;
  
  ctrl.initCrime = function (element, isInit, context) {
    
    //Initialize crime chart
    $(function () { 
      var userData = Math.floor(Location.search().crimeAvg)
      var averageData = Math.floor(Location.search().cityCrimeAvg)
      var colors;
      if (userData > averageData*1.2) {
        colors = ['#DF5353', '#434348']
      } else if (userData < averageData*0.8) {
        colors = ['#55BF3B', '#434348']
      } else {
        colors = ['#DDDF0D', '#434348'] 
      }

      $('.crimeGraph').highcharts({
        colors: colors,
        chart: {
          type: 'column',
          spacing: 50,
        },
        title: {
          text: 'Crime Rate (Adjusted)'
        },
        xAxis: {
          categories: ['']
        },      
        yAxis: {
          title: {
            text: 'Crimes Reported: Jan 2015 - Present'
          }
        },
        series: [{
          name: 'Your Search',
          data: [Math.floor(Location.search().crimeAvg)]
        }, {
          name: 'City of Austin (average)',
          data: [Math.floor(Location.search().cityCrimeAvg)]
        }],
        //Info that appears when you hover over a column
        tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
        },
        credits: {
          enabled: false
        }
      });
    });
  };

  ctrl.initRestSafety = function (element, isInit, context) {

    //Initialize restaurant safety chart
    $(function () {
      var userData = Math.floor(Location.search().restAvg)
      var averageData = Math.floor(Location.search().cityRestAvg)
      var colors;
      if (userData > averageData*1.2) {
        colors = ['#DF5353', '#434348']
      } else if (userData < averageData*0.8) {
        colors = ['#55BF3B', '#434348']
      } else {
        colors = ['#DDDF0D', '#434348'] 
      }
 
      $('.restaurantSafety').highcharts({
        colors: colors,
        chart: {
          type: 'column',
          spacing: 50
        },
        title: {
          text: 'Restaurant Score (Adjusted)'
        },
        xAxis: {
          categories: ['']
        },
        yAxis: {
          title: {
            text: 'Average Health Inspection Rating (2015)'
          }
        },
        series: [{
          name: 'Your Search',
          data: [Math.floor(Location.search().restAvg)]
        }, {
          name: 'City of Austin (average)',
          data: [Math.floor(Location.search().cityRestAvg)]
        }],
         tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
              '<td style="text-align: right"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
        },
        credits: {
          enabled: false
        }
      });
    });
  };

  ctrl.initRestNumber = function (element, isInit, context) {

    //Initialize number of restaurants chart
    $(function () { 
      var userData = Math.floor(Location.search().restaurants)
      var averageData = Math.floor(Location.search().restaurants ? [51] : [0])
      var colors;
      if (userData < averageData*0.8) {
        colors = ['#DF5353', '#434348']
      } else if (userData > averageData*1.2) {
        colors = ['#55BF3B', '#434348']
      } else {
        colors = ['#DDDF0D', '#434348'] 
      }

      $('.restaurantNumber').highcharts({
        colors: colors,
        chart: {
          type: 'column',
          spacing: 50
        },
        title: {
          text: 'Number of Restaurants'
        },
        xAxis: {
          categories: ['']
        },
        yAxis: {
          title: {
            text: 'Restaurants per square mile'
          }
        },
        series: [{
          name: 'Your Search',
          data: [Location.search().restaurants]
        }, {
          name: 'City of Austin (average)',
          data: Location.search().restaurants ? [51] : [0]
        }],
         tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
        },
        credits: {
          enabled: false
        }
      });
    });
  };

  ctrl.initCommuteTime = function (element, isInit, context) {

    //Initialize restaurant safety chart
    $(function () { 
      var userData = Math.floor(Location.commuteTime())
      var averageData = userData > 0 ? 24.6 : 0;
      var colors;
      if (userData > averageData*1.2) {
        colors = ['#DF5353', '#434348']
      } else if (userData < averageData*0.8) {
        colors = ['#55BF3B', '#434348']
      } else {
        colors = ['#DDDF0D', '#434348'] 
      }
      $('.commuteTime').highcharts({
        colors: colors,
        chart: {
          type: 'column',
          spacing: 50
        },
        title: {
          text: 'Commute Time'
        },
        xAxis: {
          categories: ['']
        },
        yAxis: {
          title: {
            text: 'Average Commute Time (2015)'
          }
        },
        series: [{
          name: 'Your Search',
          data: [userData]
        }, {
          name: 'City of Austin (average)',
          data: [averageData]
        }],
         tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
        },
        credits: {
          enabled: false
        }
      });
    });
  };

  ctrl.initCostCompare = function (element, isInit, context) {

    //Initialize number of median income chart
    $(function () {
      var userData = Location.zillowIncomeNeighborhood()
      var averageData = Location.zillowIncomeCity()
      var colors;
      if (userData > averageData*1.2) {
        colors = ['#DF5353', '#434348']
      } else if (userData < averageData*0.8) {
        colors = ['#55BF3B', '#434348']
      } else {
        colors = ['#DDDF0D', '#434348'] 
      }
      $('.costCompare').highcharts({
        colors: colors,
        chart: {
          type: 'column',
          spacing: 50
        },
        title: {
          text: 'Median Neighborhood Income'
        },
        xAxis: {
          categories: ['']
        },
        yAxis: {
          title: {
            text: 'Yearly Income (average)'
          }
        },
        series: [{
        name: 'Your Search',
          data: [Location.zillowIncomeNeighborhood()]
        }, {
        name: 'City of Austin (average)',
          // data: [Location.search().restaurants]
          data: [Location.zillowIncomeCity()]
        }],
        tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
        },
        credits: {
          enabled: false
        }
      });
    });
  };

    ctrl.initSizeCompare = function (element, isInit, context) {
    //Initialize number of restaurants chart
    $(function () {
      var userData = Location.zillowSizeNeighborhood()
      var averageData = Location.zillowSizeCity()
      var colors;
      if (userData > averageData*1.2) {
        colors = ['#55BF3B', '#434348']
      } else if (userData < averageData*0.8) {
        colors = ['#DF5353', '#434348']
      } else {
        colors = ['#DDDF0D', '#434348'] 
      }
      $('.sizeCompare').highcharts({
        colors: colors,
        chart: {
          type: 'column',
          spacing: 50
        },
        title: {
          text: 'Median Neighborhood Home Size'
        },
        xAxis: {
          categories: ['']
        },
        yAxis: {
          title: {
            text: 'Home Size (sq ft)'
          }
        },
        series: [{
        name: 'Your Search',
          data: [Location.zillowSizeNeighborhood()]
        }, {
        name: 'City of Austin (average)',
          // data: [Location.search().restaurants]
          data: [Location.zillowSizeCity()]
        }],
        tooltip: {
          useHTML: true,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
        },
        credits: {
          enabled: false
        }
      });
    });
  };

  ctrl.initSingleLadies = function (element, isInit, context) {
    //Initialize number of single ladies chart
    if (Location.womenWeight() > 0) {
      $(function () {
        var userData = Location.zillowSingleLadies()
        var averageData = Location.zillowSingleLadiesCity()
        var colors;
        if (userData < averageData*0.8) {
          colors = ['#DF5353', '#434348']
        } else if (userData > averageData*1.2) {
          colors = ['#55BF3B', '#434348']
        } else {
          colors = ['#DDDF0D', '#434348'] 
        }
        $('.singleLadies').highcharts({
          colors: colors,
          chart: {
            type: 'column',
            spacing: 50
          },
          title: {
            text: 'Single Women'
          },
          xAxis: {
            categories: ['']
          },
          yAxis: {
            title: {
              text: 'Percent Single'
            }
          },
          series: [{
          name: 'Your Search',
            data: [userData]
          }, {
          name: 'City of Austin (average)',
            data: [averageData]
          }],
          tooltip: {
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
              '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
          },
          credits: {
            enabled: false
          }
        });
      });
    };
  }

  ctrl.initSingleMen = function (element, isInit, context) {

    //Initialize number of restaurants chart
    if (Location.menWeight() > 0) {
      $(function () {
      var userData = Location.zillowSingleMen()
      var averageData = Location.zillowSingleMenCity()
      var colors;
        if (userData < averageData*0.8) {
          colors = ['#DF5353', '#434348']
        } else if (userData > averageData*1.2) {
          colors = ['#55BF3B', '#434348']
        } else {
          colors = ['#DDDF0D', '#434348'] 
        }
        $('.singleMen').highcharts({
          colors: colors,
          chart: {
            type: 'column',
            spacing: 50
          },
          title: {
            text: 'Single Men'
          },
          xAxis: {
            categories: ['']
          },
          yAxis: {
            title: {
              text: 'Percent Single'
            }
          },
          series: [{
          name: 'Your Search',
            data: [userData]
          }, {
          name: 'City of Austin (average)',
            data: [averageData]
          }],
          tooltip: {
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
              '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',

          },
          credits: {
            enabled: false
          }
        });
      });
    }
  }

}


exports.view = function(ctrl, options) {
 return  m('div', 
    [m('.col-sm-4 .crimeGraph', {config: ctrl.initCrime}),
     m('.col-sm-4 .restaurantSafety', {config: ctrl.initRestSafety}),
     m('.col-sm-4 .restaurantNumber', {config: ctrl.initRestNumber}),
     m('.col-sm-4 .commuteTime', {config: ctrl.initCommuteTime}),
     m('.col-sm-4 .costCompare', {config: ctrl.initCostCompare}),
     m('.col-sm-4 .sizeCompare', {config: ctrl.initSizeCompare}),
     m('.col-sm-4 .singleLadies', {config: ctrl.initSingleLadies}),
     m('.col-sm-4 .singleMen', {config: ctrl.initSingleMen}),
  ]);
};

