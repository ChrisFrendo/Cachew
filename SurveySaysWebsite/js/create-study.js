var count= 0;
$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title' class='form-control form-control-user'/></div>");
    $("#testForm").append("<div class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'><option value='Free Text'>Free Text</option><option value='Scale'>Scale</option><option value='Boolean'>Boolean</option><option value='Multiple Choice'>Multiple Choice</option></select></div>");
    $("#testForm").append("<div class='form-group'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea><span class='input-group-addon btn btn-primary'>Remove Question</span></div>");
    count++;
});
});


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

    var selectForm = document.getElementById('selectForm');

    if (question.type == selectForm.options[0].text){
      question.type = "freetext";
    } else if (question.type == selectForm.options[1].text) {
      question.type = "scale";
    } else if (question.type == selectForm.options[2].text) {
      question.type = "boolean";
    } else {
      question.type = "multiple";
    }


    var questionJsonString = JSON.stringify(question);


      console.log(questionJsonString);

      var url = "http://localhost:4000/api/question";

      $.ajax({
        contentType: 'application/json',
        data: questionJsonString,
        success: function(data){
            console.log(data._id);
            questionIds[i] = data._id;
        },
        error: function(jqXHR, exception){
            console.log("Some error occoured");
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

  var studyUrl = "http://localhost:4000/api/study"

  $.ajax({
    contentType: 'application/json',
    data: studyJsonString,
    success: function(data){
        console.log(data);
    },
    error: function(jqXHR, exception){
        console.log("Some error occoured");
        // Create code to delete questions from question database
    },
    type: 'POST',
    url: studyUrl,
    async: false // perhaps try find a better fix for this since this will slow down the browser with many questions
  });

}
