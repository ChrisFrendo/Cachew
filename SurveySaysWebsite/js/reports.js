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
      console.log(dataValues);
      console.log(dataLabels);
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
      console.log(studies[j].questions.length);
      for(var k=0; k < studies[j].questions.length; k++){
        $("#chartCanvas").append("<div class='card shadow mb-4' name='reportChart'><div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Sample Answer Report</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'> <label><input type='button' onclick='updateChart(this)' name='chartType' value='bar'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input type='button' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div></div>");
        createChart(k);
        // var item = document.getElementById("chartCounter").innerHTML = counter;
        // console.log(item);
      }
    }

  }
})

//let userData = dataValues;
var coloursArray = ['#4e73df', '#1cc88a', '#FF8800', '#36b9cc', '#f50057', '#ffcc00', '#ff66ff', '#69f0ae', '#ffab40']

var data;

  function createChart(counter){

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
      type: 'line',
      data: data
    });

    }

    function updateChart(element){
      var sampleAnswers = document.getElementsByName('SampleAnswerReport');
      var chartType = element.value;

      var chartCard = element.parentNode.parentNode.parentNode.parentNode;
      chartCard.innerHTML = "<div class='card-header py-3'><h6 class='m-0 font-weight-bold text-primary'>Sample Answer Report</h6></div><div class='card-body'><div class='chart-bar'><canvas name='SampleAnswerReport'></canvas></div><hr><div class='icon-bar text-right'> <label><input type='button' onclick='updateChart(this)' name='chartType' value='bar'><i class='fa fa-chart-bar fa-lg' style='color:royalblue'></i></a> </label><label><input type='button' onclick='updateChart(this)' name='chartType' value='doughnut'><i class='fa fa-chart-pie fa-lg' style='color:royalblue'></i></label> <label><input type='button'  onclick='updateChart(this)' name='chartType' value='line'><i class='fa fa-chart-line fa-lg' style='color:royalblue'></i></a></label> <label><input type='button' onclick='updateChart(this)' name='chartType' value='radar'><img aria-hidden='true' class='fa fa-chart-area fa-lg' src='img/radar-plot-24.ico' alt='img'></i></label></div></div>"

      var myCTX = chartCard.firstChild.nextSibling.firstChild.firstChild;

      for (var i = 0; i < counter; i++) {
          if (myCTX === sampleAnswers[i].getContext('2d')){
            data = {

               labels: dataLabels[i],
               //labels: dataLabels,
               datasets: [
                 {
                   label: "User's Selection",
                   fill: false,
                   backgroundColor: coloursArray,
                   borderColor: "#4e73df",
                   hoverBackgroundColor: coloursArray,
                   hoverBorderColor: "rgba(234, 236, 244, 1)",
                   data: dataValues[i],
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

               console.log(data);

               break;
          }
      }

  }
