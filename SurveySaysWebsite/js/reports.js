// setting font
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

//creating dropdown for studies selection
var studies=[];
var count = 0;
var ip = '10.60.10.66';
var token = JSON.parse(localStorage.getItem('token'));
var getReportsURL = "http://"+ip+":4000/api/report?token="+token;

var dataLabels = [];
var dataValues = [];
var questionNames = [];
var chartTypes = [];
var counter = 0;


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

$("#selectStudy").append("<select id='studySelection' class='form-control form-control-user'></select><br>");

var studySelect = document.getElementById('studySelection');

//Create and append the options
for (var i = 0; i < studies.length; i++) {
  var option = document.createElement("option");
  option.setAttribute("value", studies[i]);
  option.text = studies[i].title;

  studySelect.appendChild(option);
}
count++;


var studyID;

$("select").change(function() {

  var newSelection = $.trim( $(".form-control option:selected").text());
  // console.log(selectedItem);
  console.log(newSelection);
  //debugger;

  for(var i =0; i < studies.length; i++)
  {
    if(newSelection == studies[i].title)
    {
      studyID = studies[i]._id;
      console.log(studyID);
    }
  }
  var getReportsDataURL = "http://"+ip+":4000/api/getData?token="+token+"&studyID="+studyID;


  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: getReportsDataURL,
    async: false,
    success: function(data){
      // debugger;
      dataValues = data.values;
      dataLabels = data.labels;
      questionNames = data.titles;
    },
    error: function(jqXHR, exception){
      console.log("Something went wrong");
    }
  });

  var chartCanvas = document.getElementById('chartCanvas');

  counter = chartCanvas.childElementCount;
  for (var i = 0; i < counter; i++){
    chartCanvas.removeChild(chartCanvas.firstChild);
  }

  for(var j = 0; j < studies.length; j ++) {
    if(studies[j].title == newSelection) {
      console.log(studies[j].questions);
      for(var k=0; k < studies[j].questions.length; k++){
          chartTypes[k] = 'line';

        if (dataLabels[k].length == 0 && dataValues[k].length != 0){
          $("#chartCanvas").append("<div class='card shadow mb-4' name='reportChart'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[k]+"</h6></div><textarea class='card-body' readonly rows="+dataValues[k].length+">"+dataValues[k]+"</textarea><label name='counter' hidden='true'>"+k+"</label></div>");

        } else if (dataLabels[k].length == 0 && dataValues[k].length == 0){
          $("#chartCanvas").append("<div class='card shadow mb-4'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[k]+"</h6></div><textarea class='card-body' readonly rows="+dataValues[k].length+">No answers available</textarea><label name='counter' hidden='true'>"+k+"</label></div>");

        } else {
        $("#chartCanvas").append("<div class='card shadow mb-4' name='reportChart'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[k]+"</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'><label name='counter' hidden='true'>"+k+"</label><label><input type='button' onclick='updateChart(this)' name='chartType' value='bar' hidden='true'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input type='button' hidden='true' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input hidden='true' type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input hidden='true' type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div></div>");
        createChart(k, chartTypes[k]);
      }
      }
    }
  }
})

setInterval(function () {
  var newSelection = $.trim( $(".form-control option:selected").text());
  // console.log(selectedItem);
  console.log(newSelection);
  //debugger;

  for(var i =0; i < studies.length; i++)
  {
    if(newSelection == studies[i].title)
    {
      studyID = studies[i]._id;
      console.log(studyID);
    }
  }
  var getReportsDataURL = "http://"+ip+":4000/api/getData?token="+token+"&studyID="+studyID;


  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: getReportsDataURL,
    async: false,
    success: function(data){
      // debugger;
      dataValues = data.values;
      dataLabels = data.labels;
      questionNames = data.titles;
    },
    error: function(jqXHR, exception){
      console.log("Something went wrong");
    }
  });

  var chartCanvas = document.getElementById('chartCanvas');

  counter = chartCanvas.childElementCount;
  for (var i = 0; i < counter; i++){
    chartCanvas.removeChild(chartCanvas.firstChild);
  }

  for(var j = 0; j < studies.length; j ++) {
    if(studies[j].title == newSelection) {
      console.log(studies[j].questions);
      for(var k=0; k < studies[j].questions.length; k++){
        if (dataLabels[k].length == 0 && dataValues[k].length != 0){
          $("#chartCanvas").append("<div class='card shadow mb-4' name='reportChart'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[k]+"</h6></div><textarea class='card-body' readonly rows="+dataValues[k].length+">"+dataValues[k]+"</textarea><label name='counter' hidden='true'>"+k+"</label></div>");

        } else if (dataLabels[k].length == 0 && dataValues[k].length == 0){
          $("#chartCanvas").append("<div class='card shadow mb-4'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[k]+"</h6></div><textarea class='card-body' readonly rows="+dataValues[k].length+">No answers available</textarea><label name='counter' hidden='true'>"+k+"</label></div>");

        } else {
        $("#chartCanvas").append("<div class='card shadow mb-4' name='reportChart'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[k]+"</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'><label name='counter' hidden='true'>"+k+"</label><label><input type='button' onclick='updateChart(this)' name='chartType' value='bar' hidden='true'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input type='button' hidden='true' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input hidden='true' type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input hidden='true' type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div></div>");
        createChart(k, chartTypes[k]);
      }
      }
    }
  }
}, 30 * 1000);

//let userData = dataValues;
var coloursArray = ['#4e73df', '#1cc88a', '#FF8800', '#36b9cc', '#f50057', '#ffcc00', '#ff66ff', '#69f0ae', '#ffab40']

var data;

function createChart(counter, type){
  data = {

    labels: dataLabels[counter],
    //labels: dataLabels,
    datasets: [
      {
        label: "User's Selection",
        fill: false,
        backgroundColor: coloursArray,
        borderColor: "#4e73df",
        hoverBackgroundColor: coloursArray,
        hoverBorderColor: "rgba(234, 236, 244, 1)",
        data: dataValues[counter],
      }],
    }

    var sampleAnswers = document.getElementsByName('SampleAnswerReport');
    var choices = document.getElementsByName('chartType');
    // debugger;
    var ctx = sampleAnswers[counter].getContext('2d');
    var sampleChart = new Chart(ctx, {
      type: type,
      data: data,
      gridLines: {
        display: false,
        drawBorder: false
      },
      options: {
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
    });

  }

  function updateChart(element){
    var questionNumber = element.parentNode.parentNode.firstChild.innerHTML;
    console.log(questionNumber);
    var chartType = element.value;

    var chartCard = element.parentNode.parentNode.parentNode.parentNode;
    chartCard.innerHTML = "<div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>"+questionNames[questionNumber]+"</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'><label name='counter' hidden='true'>"+questionNumber+"</label> <label><input hidden='true' type='button' onclick='updateChart(this)' name='chartType' value='bar'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input hidden='true' type='button' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input hidden='true' type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input hidden='true' type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div>"

    var myCTX = chartCard.firstChild.nextSibling.firstChild.firstChild;

    chartTypes[questionNumber] = chartType;

    data = {

      labels: dataLabels[questionNumber],
      //labels: dataLabels,
      datasets: [
        {
          label: "User's Selection",
          fill: false,
          backgroundColor: coloursArray,
          borderColor: "#4e73df",
          hoverBackgroundColor: coloursArray,
          hoverBorderColor: "rgba(234, 236, 244, 1)",
          data: dataValues[questionNumber],
        }],
      }

      var sampleChart = new Chart(myCTX, {
        type: chartType,
        data: data,
        gridLines: {
          display: false,
          drawBorder: false
        },
        options: {
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

      console.log(data);

    }
