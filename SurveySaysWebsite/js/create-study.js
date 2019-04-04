var count= 0;
var counter=0;
var targets=[];
var getTargetsURL = "http://"+ip+":4000/api/references/study/targets";

$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getTargetsURL,
  async: false,
  success: function(data){
    targets = JSON.parse(data).array;
    //console.log(targets);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

var radioOptions = document.getElementById('targetSelection');

for (var i = 0; i < targets.length; i++) {
  // Create checkbox.
  var targetElement = document.createElement('input');
  targetElement.type = "checkbox";
  targetElement.setAttribute("name", "targetName");
  targetElement.setAttribute("class", "custom-control-input");
  targetElement.setAttribute("value",targets[i]);
  targetElement.setAttribute("id","defaultInline"+i);

  var newDiv = document.createElement('div');
  newDiv.setAttribute("class", "custom-control custom-checkbox custom-control-inline");
  newDiv.setAttribute("id","option");

  targetSelection.appendChild(newDiv);
  newDiv.appendChild(targetElement);


  // Create the label.
  var targetLabel = document.createElement('label');
  targetLabel.textContent = targets[i];
  targetLabel.setAttribute("for","defaultInline"+i);
  targetLabel.setAttribute("class","custom-control-label");

  newDiv.appendChild(targetLabel);

}


$("input[type=checkbox]").on("change",function(){
  var item = $(this).val();
  console.log(item);
  switch(item){
      case "Country":
      countryOption();
    break;
      case "Gender":
      $("#selectedTargets").append("<div class='gender'><label>Gender</label><div>");
      genderOption();
    break;
      case "Student":
    break;
      case "Salaries":
      if($('#defaultInline3').prop('checked')) {
        $("#selectedTargets").append("<div id='salaryTarget' class='form-group'><label>Salary</label><br><input type='number' min='18000' max='100000' placeholder='Min Salary'> to <input type='number' min='18000' max='100000' placeholder='Max Salary'></div>");
      }else{
        var salaryDiv = document.getElementById('salaryTarget');
        var selectedTargets = document.getElementById('selectedTargets');
        selectedTargets.removeChild(salaryDiv);
      }
    break;
    case "Industry":
      industryOption();
    break;
    case "Years of Experience":
      if($('#defaultInline5').prop('checked')) {
        $("#selectedTargets").append("<div id='yearsOfExpTarget' class='form-group'><label>Years Of Experience</label><br><input type='number' min='0' max='15' placeholder='YearsOfExperience'></div>");
      }else
      {
        var yearsOfExperienceDiv = document.getElementById('yearsOfExpTarget');
        var selectedTargets = document.getElementById('selectedTargets');
        selectedTargets.removeChild(yearsOfExperienceDiv);
      }
    break;
    case "Job Role":
      jobRolesOption();
    break;
  }
});

var genders=[];
var getGenderURL = "http://"+ip+":4000/api/references/users/genders";
$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getGenderURL,
  async: false,
  success: function(data){
    genders = JSON.parse(data).array;
    // debugger;
    console.log(genders);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

function genderOption()
{

  var genderOptions = document.getElementById('selectedTargets');

  if($('#defaultInline0').prop('checked')) {

    for (var i = 0; i < genders.length; i++) {
      // Create the radio element.
      var radioElement = document.createElement('input');
      radioElement.type = "radio";
      radioElement.setAttribute("name", "genderValue");
      radioElement.setAttribute("class", "custom-control-input");
      radioElement.setAttribute("value",genders[i]);
      radioElement.setAttribute("id","radio"+i);


      var radio = document.createElement('div');
      radio.setAttribute("class", "custom-control custom-radio custom-control-inline gender");
      radio.setAttribute("id","option2");

      selectedTargets.appendChild(radio);
      radio.appendChild(radioElement);


      // Create the label.
      var radioLabel = document.createElement('label');
      radioLabel.textContent = genders[i];
      radioLabel.setAttribute("for","radio"+i);
      radioLabel.setAttribute("class","custom-control-label");

      radio.appendChild(radioLabel);

    }
  } else {
    $('.gender').css('display','none');

  }

}

var countries=[];
var getCountryURL = "http://"+ip+":4000/api/references/users/countries";
$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getCountryURL,
  async: false,
  success: function(data){
    countries = JSON.parse(data).array;
    //console.log(countries);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

function countryOption()
{

  if($('#defaultInline2').prop('checked')) {
    $("#selectedTargets").append("<div id='countryTarget' class='form-group'><label>Country</label><select id='countrySelection' class='form-control form-control-user'></select></div>");

    var countrySelect = document.getElementById('countrySelection');

    for (var i = 0; i < countries.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", countries[i]);
      option.text = countries[i];
      if (i == 0){
        option.setAttribute("selected", 'selected');
      }
      countrySelect.appendChild(option);

    }
  }else
  {
    var countryDiv = document.getElementById('countryTarget');
    var selectedTargets = document.getElementById('selectedTargets');
    selectedTargets.removeChild(countryDiv);
  }
}


var jobRoles=[];
var getJobRoleURL = "http://"+ip+":4000/api/references/users/jobRoles";
$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getJobRoleURL,
  async: false,
  success: function(data){
    jobRoles = JSON.parse(data).array;
    //  console.log(jobRoles);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

function jobRolesOption()
{

  if($('#defaultInline6').prop('checked')) {

    $("#selectedTargets").append("<div id='jobRoleTarget' class='form-group'><label>Job Role</label><select id='jobSelection' class='form-control form-control-user'></select></div>");

    var jobRoleSelect = document.getElementById('jobSelection');

    for (var i = 0; i < jobRoles.length; i++) {
      var jobList = document.createElement("option");
      jobList.setAttribute("value", jobRoles[i]);
      jobList.text = jobRoles[i];
      if (i == 0){
        jobList.setAttribute("selected", 'selected');
      }
      jobRoleSelect.appendChild(jobList);

    }
  }else
  {
    var jobRoleDiv = document.getElementById('jobRoleTarget');
    var selectedTargets = document.getElementById('selectedTargets');
    selectedTargets.removeChild(jobRoleDiv);
  }
}

var industries=[];
var getIndustryURL = "http://"+ip+":4000/api/references/users/industry";
$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getIndustryURL,
  async: false,
  success: function(data){
    industries = JSON.parse(data).array;
    console.log(industries);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

function industryOption()
{

  if($('#defaultInline4').prop('checked')) {
    $("#selectedTargets").append("<div id='industryTarget' class='form-group'><label>Industry</label><select id='industrySelection' class='form-control form-control-user' name='industry'></select></div>");

    var industrySelect = document.getElementById('industrySelection');
    for (var i = 0; i < industries.length; i++) {
      var listOption = document.createElement("option");
      listOption.setAttribute("value", industries[i]);
      listOption.text = industries[i];
      if (i == 0){
        listOption.setAttribute("selected", 'selected');
      }
      industrySelect.appendChild(listOption);
    }
  }else {

    var industryTargetDiv = document.getElementById('industryTarget');
    var selectedTargets = document.getElementById('selectedTargets');
    selectedTargets.removeChild(industryTargetDiv);
  }
}



$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div id='questionDiv'><div class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title' class='form-control form-control-user'/></div><div class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'></select></div><div class='form-group'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea></div><div class='form-group' id='paramaters'></div><div id='delete-button' class='form-group row'><div class='col-sm-2 mb-3 mb-sm-0'><select id='frequency' class='form-control form-control-user' name='frequencyOfSchedule'><option value='No Schedule' selected='selected'>No Schedule</option><option value='Just Once'>Just Once</option><option value='Daily'>Daily</option><option value='Weekly'>Weekly</option><option value='Monthly'>Monthly</option></select></div><div class='col-sm-4 mb-3 mb-sm-0'></div><div class='col-sm-6 mb-3 mb-sm-0'><button class='btn btn-primary btn-user form-control' type='button' onclick='removeQuestion(this)'>Delete Question</button></div></div></div>");

    var questionTypeSelect = document.getElementsByName("questionType");

    //Create and append the options
    for (var i = 0; i < questionTypes.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", questionTypes[i]);
      option.text = questionTypes[i];
      if (i == 0){
        option.setAttribute("selected", 'selected');
      }
      questionTypeSelect[count].appendChild(option);
    }
    count++;

    $("select").on("change", function(){
      var option = $(this).val();
      $(".field").hide();
      switch (option) {
        case "Multiple Choice":
        multipleChoice(this);
        break;
        case "Scale":
        scaleOption(this);
        break;
        case "Free Text":
        var paramaters = this.parentNode.nextSibling.nextSibling;
        paramaters.innerHTML = "";
        break;
        case "Boolean":
        booleanOption(this);
        break;
      }
    });

    var frequencySelect = document.getElementsByName("frequencyOfSchedule");

    $("select").on("change", function(){
      var option = $(this).val();
      $(".field").hide();
      switch (option) {
        case "No Schedule":
        this.parentNode.nextSibling.innerHTML = "";
        break;
        case "Just Once":
        this.parentNode.nextSibling.innerHTML = "<input name='questionDateTime' required='true' type='datetime-local' class='form-control form-control-user'/>";
        break;
        case "Daily":

        this.parentNode.nextSibling.innerHTML = "<select id='dailySelect' multiple=true class='form-control form-control-user' name='dailySelection'></select>";


        var timesUrl = "http://"+ip+":4000/api/references/question/times";
        var times = [];

        $.ajax({
          contentType: 'application/json',
          type: 'GET',
          url: timesUrl,
          async: false,
          success: function(data){
            times = JSON.parse(data).array;
            // console.log(questionTypes);
          },
          error: function(jqXHR, exception){
            console.log("Something went wrong");
          }
        });

        for (var i = 0; i < times.length; i++) {
          var option = document.createElement("option");
          option.setAttribute("value", times[i]);
          option.text = times[i];
          this.parentNode.nextSibling.firstChild.appendChild(option);
        }

        break;
        case "Weekly":

        this.parentNode.nextSibling.innerHTML = "<div class='row'><div class='col-sm-6 mb-3 mb-sm-0'><select id='dayInWeek' multiple=true class='form-control form-control-user' name='dayInWeekSelection'></select></div><div class='col-sm-6 mb-3 mb-sm-0'><select id='weeklySelect' multiple=true class='form-control form-control-user' name='weeklySelection'></select></div></div>";

        var weeksUrl = "http://"+ip+":4000/api/references/question/days";
        var weeks = [];

        $.ajax({
          contentType: 'application/json',
          type: 'GET',
          url: weeksUrl,
          async: false,
          success: function(data){
            weeks = JSON.parse(data).array;
            // console.log(questionTypes);
          },
          error: function(jqXHR, exception){
            console.log("Something went wrong");
          }
        });

        for (var i = 0; i < weeks.length; i++) {
          var option = document.createElement("option");
          option.setAttribute("value", weeks[i]);
          option.text = weeks[i];
          this.parentNode.nextSibling.firstChild.firstChild.firstChild.appendChild(option);
        }

        var timesUrl = "http://"+ip+":4000/api/references/question/times";
        var times = [];

        $.ajax({
          contentType: 'application/json',
          type: 'GET',
          url: timesUrl,
          async: false,
          success: function(data){
            times = JSON.parse(data).array;
            // console.log(questionTypes);
          },
          error: function(jqXHR, exception){
            console.log("Something went wrong");
          }
        });

        for (var j = 0; j < times.length; j++) {
          var option = document.createElement("option");
          option.setAttribute("value", times[j]);
          option.text = times[j];
          this.parentNode.nextSibling.firstChild.firstChild.nextSibling.firstChild.appendChild(option);
        }

        break;
        case "Monthly":
        this.parentNode.nextSibling.innerHTML = "<input name='questionDateTime' required='true' type='datetime-local' class='form-control form-control-user'/>";
        break;
      }
    });

  });

});




  function scaleOption(element)
  {
    var paramaters = element.parentNode.nextSibling.nextSibling;

    paramaters.innerHTML = "";

    var min = document.createElement('input');
    min.setAttribute("placeholder", "Min value");
    min.setAttribute("name", "input1");
    min.setAttribute("type", "number");
    min.setAttribute("class", "form-group form-control form-control-user");

    var max = document.createElement('input');
    max.setAttribute("placeholder", "Max Value");
    max.setAttribute("name", "input2");
    max.setAttribute("type", "number");
    max.setAttribute("class", "form-group form-control form-control-user");

    paramaters.appendChild(min);
    paramaters.appendChild(max);

  }

  function multipleChoice(element)
  {
    var paramaters = element.parentNode.nextSibling.nextSibling;

    paramaters.innerHTML = "";

    var choice1 = document.createElement('textarea');
    choice1.setAttribute("placeholder", "Input the multiple choice options and press 'Enter' each time");
    choice1.setAttribute("name", "choiceContent");
    choice1.setAttribute("class", "form-group form-control form-control-user");
    choice1.setAttribute("rows", "5");

    paramaters.appendChild(choice1);
  }

  function booleanOption(element)
  {
    var paramaters = element.parentNode.nextSibling.nextSibling;

    paramaters.innerHTML = "";

    var truevalue = document.createElement('input');
    truevalue.setAttribute("placeholder", "True Value");
    truevalue.setAttribute("name", "input1");
    truevalue.setAttribute("class", "form-group form-control form-control-user");

    var falsevalue = document.createElement('input');
    falsevalue.setAttribute("placeholder", "False Value");
    falsevalue.setAttribute("name", "input2");
    falsevalue.setAttribute("class", "form-group form-control form-control-user");

    paramaters.appendChild(truevalue);
    paramaters.appendChild(falsevalue);
  }


  var questionTypes = [];
  var genres = [];

  var ip = '10.60.10.66';
  var getQuestionTypesURL = "http://"+ip+":4000/api/references/questions/questiontypes";

  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: getQuestionTypesURL,
    async: false,
    success: function(data){
      questionTypes = JSON.parse(data).array;
      // console.log(questionTypes);
    },
    error: function(jqXHR, exception){
      console.log("Something went wrong");
    }
  });

  var getGenresURL = "http://"+ip+":4000/api/references/study/genres";
  var studyGenresSelect = document.getElementById("studyGenresSelect");

  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: getGenresURL,
    async: false,
    success: function(data){
      genres = JSON.parse(data).array;
      for (var i = 0; i < genres.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", genres[i]);
        option.text = genres[i];
        if (i == 0){
          option.setAttribute("selected", 'selected');
        }
        studyGenresSelect.appendChild(option);
      }
    },
    error: function(jqXHR, exception){
      console.log("Something went wrong");
    }
  });


  var token = JSON.parse(localStorage.getItem("token"));


  function submitStudy(){

    if (count == 0){
      window.alert('You must enter at least 1 question');
      return false;
    }

    var studyTitle = document.getElementById('studyTitle').value;
    var studyGenres = $('#studyGenresSelect').val();

    var questionIds = [];

    var questionTitles = document.getElementsByName('questionTitle');
    var questionTypes = document.getElementsByName('questionType');
    var questionContents = document.getElementsByName('questionContent');
    var questionDateTime = document.getElementsByName('questionDateTime');
    var frequencyOfSchedule = document.getElementsByName('frequencyOfSchedule');

    var dailyTimesSelect = document.getElementsByName('dailySelection');
    var weeklyDaysSelect = document.getElementsByName('dayInWeekSelection');
    var weeklyTimesSelect = document.getElementsByName('weeklySelection');

    var input1 = document.getElementsByName('input1');
    var input2 = document.getElementsByName('input2');
    var choiceContent = document.getElementsByName('choiceContent');

    var i;
    var j = 0;
    var k = 0;
    var l = 0;
    var m = 0;
    var n = 0;
    for (i = 0; i < count; i++){


      var question = new Object();
      question.title = questionTitles[i].value;
      question.type = questionTypes[i].value;
      question.content = questionContents[i].value;


      if (frequencyOfSchedule[i].value == "No Schedule"){
        question.time = null;
      } else if (frequencyOfSchedule[i].value == "Just Once"){
        question.time = questionDateTime[k].value;
        k++;
      } else if (frequencyOfSchedule[i].value == "Daily"){
        // debugger;
        question.daily = [];
        var dailyTimes = dailyTimesSelect[m];
        for (var z = 0; z < dailyTimes.selectedOptions.length; z++) {
          question.daily[z] = (dailyTimes.selectedOptions[z].text);
        }
        console.log(question.daily);
        m++;
      } else if (frequencyOfSchedule[i].value == "Weekly"){
        question.weekly;
        question.weekly.days = [];
        var weeklyDays = weeklyDaysSelect[n];
        for (var z = 0; z < weeklyDays.selectedOptions.length; z++) {
          question.weekly.day[z] = weeklyDays.selectedOptions[z].text;
        }

        question.weekly.time = [];
        var weeklyTimes = weeklyTimesSelect[n];
        for (var z = 0; z < weeklyTimes.selectedOptions.length; z++) {
          question.weekly.time[z] = weeklyTimes.selectedOptions[z].text;
        }

        n++;

      }


      if (question.type != "Free Text"){

        if (question.type == "Scale"){
          question.scale = {min: input1[j].value, max: input2[j].value};
          j++;
        } else if (question.type == "Boolean"){
          question.boolean = {trueValue: input1[j].value, falseValue: input2[j].value};
          j++;
        } else if (question.type == "Multiple Choice"){
          question.multiple = choiceContent[l].value;
          l++;
        }
        console.log(question.multiple);

      }

      var questionJsonString = JSON.stringify(question);

      // console.log(questionJsonString);

      var url = "http://"+ip+":4000/api/question?token="+token;

      $.ajax({
        contentType: 'application/json',
        data: questionJsonString,
        success: function(data){
          questionIds[i] = data._id;
        },
        error: function(jqXHR, exception){
          console.log("Some error occoured");
          return false;
        },
        type: 'POST',
        url: url,
        async: false // perhaps try find a better fix for this since this will slow down the browser with many questions
      });
    } // end of for loop


    var study = new Object();
    study.title = studyTitle;
    study.questions = questionIds;

    var targetNames = document.getElementsByName('targetName');
    var targetValues = document.getElementsByName('targetValue');
    study.targets = [];

    for (var i = 0; i < targetNames.length; i++) {
      if (targetNames[i].value != "Select Target"){
        study.targets[i] = {name: targetNames[i].value, value: targetValues[i].value};
      }
    }

    study.genres = studyGenres;

    $.ajax({
      contentType: 'application/json',
      success: function(data){
        study.userId = data;
      },
      error: function(jqXHR, exception){
        console.log("Some error occoured");
      },
      type: 'GET',
      url: "http://"+ip+":4000/api/users/userID?token="+token,
      async: false
    });


    var studyJsonString = JSON.stringify(study);

    console.log(studyJsonString);

    var studyUrl = "http://"+ip+":4000/api/study?token="+token;

    $.ajax({
      contentType: 'application/json',
      data: studyJsonString,
      success: function(data){
        window.alert("Study created Successfully");
        console.log(data);
      },
      error: function(jqXHR, exception){
        console.log("Some error occoured");
        for (var i = 0; i < questionIds.length; i++) {
          deleteQuestion(questionIds[i]);
        }
      },
      type: 'POST',
      url: studyUrl,
      async: false // perhaps try find a better fix for this since this will slow down the browser with many questions
    });

  }

  function removeQuestion(e) {
    e.parentNode.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode.parentNode);
    count--;
    window.alert("REMOVED QUESTION");
  }

  function deleteQuestion(id){

    var deleteQuestionUrl = "http://"+ip+":4000/api/question?token="+token;

    let questionID = {
      id: id
    }

    var jsonString = JSON.stringify(questionID);
    $.ajax({
      contentType: 'application/json',
      data: jsonString,
      success: function(data){
        console.log(data);
      },
      error: function(jqXHR, exception){
        console.log("Some error occoured");
      },
      type: 'DELETE',
      url: deleteQuestionUrl,
      async: false // perhaps try find a better fix for this since this will slow down the browser with many questions
    });
  }
