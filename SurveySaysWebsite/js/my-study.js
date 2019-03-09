var count= 0;

$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div id='questionTitle' class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title' class='form-control form-control-user'/></div>");
    $("#testForm").append("<div id='questionType' class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'><option value='sample'>Select Option</option><option value='Free Text'>Free Text</option><option value='Scale'>Scale</option><option value='Boolean'>Boolean</option><option value='Multiple Choice'>Multiple Choice</option></select></div>");
    count++;
    $("select").on("change", function(){
     var option = $(this).val();
     switch (option) {
       case "Multiple Choice":
         multipleChoice();
         break;
       case "Scale":
         scaleOption();
         break;
       case "Free Text":
        textOption();
        break;
       case "Boolean":
        booleanOption();
        break;
     }
});
});
});

function textOption()
{
$("#testForm").append("<div id='textSection' class='form-group'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea><span class='input-group-addon btn btn-primary' id='removeButton'>Remove Question</span></div>");
$("#removeButton").click( function(evt) {
  if(confirm("Are you sure you want to remove this question? Action cannot be undone.") ){
     evt.preventDefault();
      $("#textSection").remove();
      $("#questionTitle").remove();
      $("#questionType").remove();
    }
       });
};

function multipleChoice()
{
    var radioChoice = $(".radio-choice");
    var choice = radioChoice.length;
    $("#testForm").append("<div class='form-group'><input type='text' class='form-control answer-option radio-choice' name='radiochoice0_q1' id='radiochoice0' placeholder='Question Content'><div class='text-right'><span class='input-group-addon btn btn-primary' id='choiceButton'>Add Choice</span></div>");

    if (choice <= 0)
    {
       $("#choiceButton").click( function(evt) {
            evt.preventDefault();
      $("#testForm").append("<div id='radioButton' class='form-group'><input type='radio' name='radioButton' id='radioButton' value=''><input type='text' name='textField'/>");
    });
  };
};

function booleanOption()
{
    $("#testForm").append("<div class='form-group'><input type='text' class='form-control answer-option radio-choice' name='radiochoice0_q1' id='radiochoice0' placeholder='Question Content'><div class='text-right'></div>");
    $("#testForm").append("<input type='radio' name='radioButton' id='radioButton1' value='True'>True<br><input type='radio' name='radioButton' id='radioButton2' value='False'>False</>");
};

function scaleOption()
{
  $("#testForm").append("<div class='form-group'><input type='text' class='form-control answer-option radio-choice' name='radiochoice0_q1' id='radiochoice0' placeholder='Question Content'><div class='text-right'></div>");
  $("#testForm").append("<div class='form-group'><input type='text'value='' id='range-slider' placeholder='Min value'><br>");
}

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
