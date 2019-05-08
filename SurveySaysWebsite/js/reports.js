// setting font
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

//creating dropdown for studies selection
var studies=[];
var count = 0;
var ip = '10.60.10.66';
var token = JSON.parse(localStorage.getItem('token'));
var getReportsURL = "http://"+ip+":4000/api/report?token="+token;


$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getReportsURL,
  async: false,
  success: function(data){
    // debugger;
    studies = data.array;
    console.log(studies);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

$("#selectStudy").append("<select id='studySelection' class='form-control form-control-user' name='studyOption'></select><br>");
//var studySelect = document.getElementById('studySelection');
var studySelect = document.getElementsByName('studyOption');


//Create and append the options
for (var i = 0; i < studies.length; i++) {
  var option = document.createElement("option");
  option.setAttribute("value", studies[i]);
  option.text = studies[i].title;
  if (i == 0){
    option.setAttribute("selected", 'selected');
  }
  studySelect[count].appendChild(option);

}
count++;


var selectedItem;
$("select")
// .focus(function(){
//
//  selectedItem = $.trim( $(".form-control option:selected").text());
//  console.log(selectedItem);
//


// })
.change(function() {

  var newSelection = $.trim( $(".form-control option:selected").text());
  // console.log(selectedItem);
  console.log(newSelection);
  //debugger;

  var chartCanvas = document.getElementById('chartCanvas');

  var counter = chartCanvas.childElementCount;
  for (var i = 0; i < counter; i++){
    chartCanvas.removeChild(chartCanvas.firstChild);
  }

  for(var j = 0; j < studies.length; j ++) {
    if(studies[j].title == newSelection) {
      console.log(studies[j].questions.length);
      for(var k=0; k < studies[j].questions.length; k++){
        $("#chartCanvas").append("<div class='card shadow mb-4' name='reportChart'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Sample Answer Report</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'> <label><input type='button' onclick='updateChart(this)' name='chartType' value='bar'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input type='button' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div></div>");
        createChart(k);
      }
    }

  }
})



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

  function createChart(counter){
    var sampleAnswers = document.getElementsByName('SampleAnswerReport');
    var choices = document.getElementsByName('chartType');
    // debugger;
    var ctx = sampleAnswers[counter].getContext('2d');
    var sampleChart = new Chart(ctx, {
      type: 'radar',
      data: data
    });
    }

    function updateChart(element){

      var chartType = element.value;

      var chartCard = element.parentNode.parentNode.parentNode.parentNode;
      chartCard.innerHTML = "<div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Sample Answer Report</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'> <label><input type='button' onclick='updateChart(this)' name='chartType' value='bar'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input type='button' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div>"

      var myCTX = chartCard.firstChild.nextSibling.firstChild.firstChild;

    var sampleChart = new Chart(myCTX, {
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
  }
