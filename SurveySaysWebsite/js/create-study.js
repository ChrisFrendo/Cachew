var count= 0;


$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div id='questionDiv'><div class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title' class='form-control form-control-user'/></div><div class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'></select></div><div class='form-group'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea></div><div class='form-group' id='paramaters'></div><div id='delete-button' class='form-group'><button class='btn btn-primary btn-user form-control' type='button' onclick='removeQuestion(this)'>Delete Question</button></div></div>");

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

});
});

function scaleOption(element)
{
  var paramaters = element.parentNode.nextSibling.nextSibling;

  paramaters.innerHTML = "";

  var min = document.createElement('input');
  min.setAttribute("placeholder", "Min value");
  min.setAttribute("name", "input1");
  min.setAttribute("class", "form-group form-control form-control-user");

  var max = document.createElement('input');
  max.setAttribute("placeholder", "Max Value");
  max.setAttribute("name", "input2");
  max.setAttribute("class", "form-group form-control form-control-user");

  paramaters.appendChild(min);
  paramaters.appendChild(max);

}

function multipleChoice(element)
{
  var paramaters = element.parentNode.nextSibling.nextSibling;

  paramaters.innerHTML = "";

  var choice1 = document.createElement('input');
  choice1.setAttribute("placeholder", "Input Choice");
  choice1.setAttribute("name", "input1");
  choice1.setAttribute("class", "form-group form-control form-control-user");

  var choice2 = document.createElement('input');
  choice2.setAttribute("placeholder", "Input Choice");
  choice2.setAttribute("name", "input2");
  choice2.setAttribute("class", "form-group form-control form-control-user");

  var choice3 = document.createElement('input');
  choice3.setAttribute("placeholder", "Input Choice");
  choice3.setAttribute("name", "input3");
  choice3.setAttribute("class", "form-group form-control form-control-user");

  paramaters.appendChild(choice1);
  paramaters.appendChild(choice2);
  paramaters.appendChild(choice3);
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
  var studyTargets = document.getElementById('studyTargets').value;
  var questionIds = [];

  var questionTitles = document.getElementsByName('questionTitle');
  var questionTypes = document.getElementsByName('questionType');
  var questionContents = document.getElementsByName('questionContent');

  var input1 = document.getElementsByName('input1');
  var input2 = document.getElementsByName('input2');
  var input3 = document.getElementsByName('input3');


  var i;
  for (i = 0; i < count; i++){
    var question = new Object();
    question.title = questionTitles[i].value;
    question.type = questionTypes[i].value;
    question.content = questionContents[i].value;

    console.log(input1[i].value);
    console.log(input2[i].value);

    var questionJsonString = JSON.stringify(question);

      // console.log(questionJsonString);

      var url = "http://"+ip+":4000/api/question?token="+token;

      $.ajax({
        contentType: 'application/json',
        data: questionJsonString,
        success: function(data){
            // console.log(data._id);
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
  var targets = studyTargets.split(";");

  for (var i = 0; i < targets.length; i++) {
    targets[i] = targets[i].trim();
  }

  targets.length = targets.length -1;

  if (targets == ""){
    targets[0] = "generic";
  }

  study.genres = studyGenres;
  study.targets = targets;

  $.ajax({
    contentType: 'application/json',
    success: function(data){
      study.userId = data;
        // console.log("ID is: " + data);
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
  e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
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
