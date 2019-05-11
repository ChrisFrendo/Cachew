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
      genderOption();
    break;
      case "Student":
    break;
      case "Salaries":
        salaryOption();
    break;
    case "Industry":
      industryOption();
    break;
    case "Years of Experience":
      if($('#defaultInline5').prop('checked')) {
        $("#selectedTargets").append("<div id='yearsOfExpTarget' class='form-group'><label>Years Of Experience</label><br><input type='number'id='expSelection' min='0' max='40' placeholder='YearsOfExperience'></div>");
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


  if($('#defaultInline0').prop('checked')) {
    $("#selectedTargets").append("<div id='genderTarget' class='form-group'><label>Gender</label><select id='genderSelection' class='form-control form-control-user'></select><div>");

    var genderSelect = document.getElementById('genderSelection');

    for (var i = 0; i < genders.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("value", genders[i]);
      option.text = genders[i];
      if (i == 0){
        option.setAttribute("selected", 'selected');
      }
      genderSelect.appendChild(option);

    }
  } else {
    var genderDiv = document.getElementById('genderTarget');
    var selectedTargets = document.getElementById('selectedTargets');
    selectedTargets.removeChild(genderDiv);
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

var salaries=[];
var getSalaryURL = "http://"+ip+":4000/api/references/users/salaries";
$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getSalaryURL,
  async: false,
  success: function(data){
    salaries = JSON.parse(data).array;
    console.log(salaries);
  },
  error: function(jqXHR, exception){
    console.log("Something went wrong");
  }
});

function salaryOption()
{

  if($('#defaultInline3').prop('checked')) {
    $("#selectedTargets").append("<div id='salaryTarget' class='form-group'><label>Salary</label><select id='salarySelection' class='form-control form-control-user' name='industry'></select></div>");

    var salarySelect = document.getElementById('salarySelection');
    for (var i = 0; i < salaries.length; i++) {
      var listOption = document.createElement("option");
      listOption.setAttribute("value", salaries[i]);
      listOption.text = salaries[i];
      if (i == 0){
        listOption.setAttribute("selected", 'selected');
      }
      salarySelect.appendChild(listOption);
    }

  }else {

    var salaryTargetDiv = document.getElementById('salaryTarget');
    var selectedTargets = document.getElementById('selectedTargets');
    selectedTargets.removeChild(salaryTargetDiv);
  }
}



$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div id='questionDiv'><div class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title' class='form-control form-control-user'/></div><div class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'></select></div><div class='form-group'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea></div><div class='form-group' id='paramaters'></div><div id='delete-button' class='form-group row'><div class='col-sm-2 mb-3 mb-sm-0'><select id='frequency' class='form-control form-control-user' name='frequencyOfSchedule'><option value='No Schedule' selected='selected'>No Schedule</option><option value='Just Once'>Just Once</option><option value='Daily'>Daily</option><option value='Weekly'>Weekly</option></select></div><div class='col-sm-4 mb-3 mb-sm-0'></div><div class='col-sm-6 mb-3 mb-sm-0'><button class='btn btn-primary btn-user form-control' type='button' onclick='removeQuestion(this)'>Delete Question</button></div></div></div>");

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
        this.parentNode.nextSibling.innerHTML = "<select id='dailySelect' multiple=true class='form-control form-control-user' name='dailySelection'></select><div style='padding:10px' class='form-group col-sm-12 mb-3 mb-sm-0'><label>Termination Date</label><input name='terminationDaily' required='true' title='Termination Date' type='datetime-local' class='form-control form-control-user'/></div>";

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

        this.parentNode.nextSibling.innerHTML = "<div class='row'><div class='col-sm-6 mb-3 mb-sm-0'><select id='dayInWeek' multiple=true class='form-control form-control-user' name='dayInWeekSelection'></select></div><div class='col-sm-6 mb-3 mb-sm-0'><select id='weeklySelect' class='form-control form-control-user' name='weeklySelection'></select></div><div style='padding:10px' class='form-group col-sm-12 mb-3 mb-sm-0'><label>Termination Date</label><input name='terminationWeekly' required='true' title='Termination Date' type='datetime-local' class='form-control form-control-user'/></div></div>";

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
        this.parentNode.nextSibling.innerHTML = "<div class='row'><div class='col-sm-12 mb-3 mb-sm-0'><input name='questionDateTime' required='true' type='datetime-local' class='form-control form-control-user'/></div><div style='padding:10px' class='form-group col-sm-12 mb-3 mb-sm-0'><input name='terminationDate' required='true' title='Termination Date' type='datetime-local' class='form-control form-control-user'/></div></div>";
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
    var dailyTermination = document.getElementsByName('terminationDaily');
    var weeklyDaysSelect = document.getElementsByName('dayInWeekSelection');
    var weeklyTimesSelect = document.getElementsByName('weeklySelection');
    var weeklyTermination = document.getElementsByName('terminationWeekly');

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
        question.daily = [];
        question.weeklyDay = [];
        question.weeklyTime = [];
      } else if (frequencyOfSchedule[i].value == "Just Once"){
        question.time = questionDateTime[k].value;
        question.daily = [];
        question.weeklyDay = [];
        question.weeklyTime = [];
        k++;
      } else if (frequencyOfSchedule[i].value == "Daily"){
        // debugger;
        question.daily = [];
        var dailyTimes = dailyTimesSelect[m];
        question.terminationDate = dailyTermination[m].value;
        for (var z = 0; z < dailyTimes.selectedOptions.length; z++) {
          question.daily[z] = (dailyTimes.selectedOptions[z].text);
        }
        console.log(question.daily);
        question.weeklyDay = [];
        question.weeklyTime = [];
        m++;
      } else if (frequencyOfSchedule[i].value == "Weekly"){
        question.daily = [];
        // debugger;
        question.weeklyDay = [];
        var weeklyDays = weeklyDaysSelect[n];
        question.terminationDate = weeklyTermination[n].value;
        for (var z = 0; z < weeklyDays.selectedOptions.length; z++) {
          question.weeklyDay[z] = weeklyDays.selectedOptions[z].text;
        }

        question.weeklyTime = [];
        var weeklyTimes = weeklyTimesSelect[n];
        for (var z = 0; z < weeklyTimes.selectedOptions.length; z++) {
          question.weeklyTime[z] = weeklyTimes.selectedOptions[z].text;
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
          window.alert("Some error occured");
          return false;
        },
        type: 'POST',
        url: url,
        async: false
      });
    } // end of for loop


    var study = new Object();
    study.title = studyTitle;
    study.questions = questionIds;

    var genderCheckbox = document.getElementById('defaultInline0');
    var studentCheckbox = document.getElementById('defaultInline1');
    var countryCheckbox = document.getElementById('defaultInline2');
    var salaryCheckbox = document.getElementById('defaultInline3');
    var industryCheckbox = document.getElementById('defaultInline4');
    var expCheckbox = document.getElementById('defaultInline5');
    var jobroleCheckbox = document.getElementById('defaultInline6');


    study.targets = [];

    if (genderCheckbox.checked){
      var targetName = genderCheckbox.nextSibling.textContent;
      var targetValue = document.getElementById('genderSelection').value;
      study.targets.push({name: targetName, value: targetValue});
    }
    if (studentCheckbox.checked){
      var targetName = studentCheckbox.nextSibling.textContent;
      study.targets.push({name: targetName, value: true});
    }
    if (countryCheckbox.checked){
      var targetName = countryCheckbox.nextSibling.textContent;
      var targetValue = document.getElementById('countrySelection').value;
      study.targets.push({name: targetName, value: targetValue});
    }
    if (salaryCheckbox.checked){
      var targetName = salaryCheckbox.nextSibling.textContent;
      var targetValue = document.getElementById('salarySelection').value;
      study.targets.push({name: targetName, value: targetValue});
    }
    if (industryCheckbox.checked){
      var targetName = industryCheckbox.nextSibling.textContent;
      var targetValue = document.getElementById('industrySelection').value;
      study.targets.push({name: targetName, value: targetValue});
    }
    if (expCheckbox.checked){
      var targetName = genderCheckbox.nextSibling.textContent;
      var targetValue = document.getElementById('expSelection').value;
      study.targets.push({name: targetName, value: targetValue});
    }
    if (jobroleCheckbox.checked){
      var targetName = genderCheckbox.nextSibling.textContent;
      var targetValue = document.getElementById('jobSelection').value;
      study.targets.push({name: targetName, value: targetValue});
    }


    study.genres = studyGenres;

    $.ajax({
      contentType: 'application/json',
      success: function(data){
        study.userId = data;
      },
      error: function(jqXHR, exception){
        console.log("Some error occoured");
        window.alert("Some error occoured");
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
        console.log(data);
        window.alert("Study created Successfully");

      },
      error: function(jqXHR, exception){
        console.log("Some error occoured");
        window.alert("Some error occoured");
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
        window.alert("Some error occoured");
      },
      type: 'DELETE',
      url: deleteQuestionUrl,
      async: false // perhaps try find a better fix for this since this will slow down the browser with many questions
    });
  }
