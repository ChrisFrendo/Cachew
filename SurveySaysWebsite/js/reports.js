// setting font
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


//use of the number format function from the
function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
  return s.join(dec);
}

// Bar Chart
var ctx = document.getElementById("BarChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  commonSeriesSettings: {
  label: {
       visible: true
   }
 },
  data: {
    labels: ["Option A", "Option B", "Option C", "Option D"],
    datasets: [{
      label: "Users",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: [4000, 5000, 3500, 7841],
    }],
  },
  options: {
    title: {
           display: true,
           text: 'Question 2: Multiple Choice Answer Report'
       },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Choice Option'
        },
        time: {
          unit: ''
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 10000,
          maxTicksLimit: 5,
          padding: 10,

      scaleLabel: {
        display: true,
        labelString: 'Answer'
      },
         callback: function(value, index, values) {
          return  number_format(value);
      }//
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
        }
      }
    },
  }
});


// Pie Chart
var ctx = document.getElementById("PieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["True","False"],
    datasets: [{
      data: [55, 30],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    title: {
           display: true,
           text: 'Question 3: Boolean Answers Report'
       },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});

//setting the data for all charts created in Sample Charts Card using the same data of the bar chart
let userData =  [4000, 5000, 3500, 7841];
var coloursArray = ['#4e73df', '#1cc88a', '#FF8800', '#36b9cc', '#f50057', '#ffcc00', '#ff66ff', '#69f0ae', '#ffab40']
var data = {

        labels: ["Option A", "Option B", "Option C", "Option D"],
        datasets: [
          {
            label: "Users",
            fill: false,
            backgroundColor: coloursArray,
            borderColor: "#4e73df",
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
            data: userData,
          }],
  };

// creating default chart of type 'radar'
var ctx = document.getElementById('SampleAnswerReport').getContext('2d');
var sampleChart = new Chart(ctx, {
    type: 'radar',
    data: data
});

//on-click function for icons to change chart type
function newChartType() {

      sampleChart.destroy();

       var chartType = $("input:radio[name='chart']:checked").val();
       console.log(chartType);
       sampleChart = new Chart(ctx, {
         type: chartType,
         data: data,
         gridLines: {
           display: false,
           drawBorder: false
         },
         options: {
           title: {
                  display: true,
                  text: 'Question 1: Answer Report'
              },
              scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                // Change here
              barPercentage: 0.4
            }]
        }

       },
     })

};
