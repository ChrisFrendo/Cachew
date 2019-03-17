var count= 0;


$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title' class='form-control form-control-user'/></div>");
    $("#testForm").append("<div class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'></select></div>");
    $("#testForm").append("<div class='form-group'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea><span class='input-group-addon btn btn-primary'>Remove Question</span></div>");
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

});
});


var questionTypes = [];

var ip = '192.168.1.83';

var getQuestionTypesURL = "http://"+ip+":4000/api/references/questions/questiontypes";

$.ajax({
  contentType: 'application/json',
  type: 'GET',
  url: getQuestionTypesURL,
  async: false,
  success: function(data){
    questionTypes = JSON.parse(data).array;
    console.log(questionTypes);
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
  var questionIds = [];

  var questionTitles = document.getElementsByName('questionTitle');
  var questionTypes = document.getElementsByName('questionType');
  var questionContents = document.getElementsByName('questionContent');

  var i;
  for (i = 0; i < count; i++){
    var question = new Object();
    question.title = questionTitles[i].value;
    question.type = questionTypes[i].value;
    question.content = questionContents[i].value;

    var questionJsonString = JSON.stringify(question);

      // console.log(questionJsonString);

      var url = "http://"+ip+":4000/api/question?token="+token;

      $.ajax({
        contentType: 'application/json',
        data: questionJsonString,
        success: function(data){
            console.log(data._id);
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

  var studyJsonString = JSON.stringify(study);

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
