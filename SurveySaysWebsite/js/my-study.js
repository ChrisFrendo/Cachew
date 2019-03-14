var count= 0;

$(document).ready(function() {
  $("#btnNewQuestion").click(function(e) {
    e.preventDefault();
    $("#testForm").append("<div id='questionTitle' class='form-group'><input type='text' name='questionTitle' required='true' placeholder='Question Title'+ count class='form-control form-control-user'/></div>");
    $("#testForm").append("<div id='questionType' class='form-group'><select id='selectForm' class='form-control form-control-user' name='questionType'><option value='sample'>Select Option</option><option value='Free Text'>Free Text</option><option value='Scale'>Scale</option><option value='Boolean'>Boolean</option><option value='Multiple Choice'>Multiple Choice</option></select></div>");
    //$("#testForm").append("<div class='text-right'><span class='input-group-addon btn btn-primary' id='scheduleButton'>Schedule Question</span></div>");
    $("select").on("change", function(){
     var option = $(this).val();
     $(".field").hide();
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
        count++;
});
});
});

//in each function a class field was added to hide elements after a change in booleanSelection
//to fix buttons in multiple choice work only once

function textOption()
{
  //class field previously 'form-group'
  $("#testForm").append("<div id='textSection' class='field'><textarea required='true' rows='10' class='form-control form-control-user' type='text' name='questionContent' placeholder='Question Content'></textarea><span class='input-group-addon btn btn-primary' id='removeButton'>Remove Question</span><br><hr></div>");
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
    $("#testForm").append("<div class='field'><input type='text' class='form-control answer-option radio-choice' name='radiochoice0_q1' id='radiochoice0' placeholder='Question Content'><div class='text-right'><span class='input-group-addon btn btn-primary' id='choiceButton'>Add Choice</span></div>");

    if (choice <= 0)
    {
       $(document).on("click","#choiceButton", function(evt) {
          evt.preventDefault();
       $("#testForm").append("<div id='radioButton' class='form-group'><div class='field'><input type='radio' name='radioButton' id='radioButton' value=''><input type='text' name='textField'/></div></div>");
    });
  };
};

function booleanOption()
{

  $("#testForm").append("<div class='field'><input type='text' class='form-control answer-option radio-choice' name='radiochoice0_q1' id='radiochoice0' placeholder='Question Content'><br><div class='text-right'></div>");
  $("#testForm").append("<div id='booleanSelection' class='col-md-6'><div class='field'><select id='selectBoolean' class='form-control form-control-boolean' name='boolean'><option value='sample'>Select Option</option><option value='Radio'>Radio Buttons</option><option value='Checkbox'>Checkbox</option></div></div>");
  $("#selectBoolean").change(function booleanOption(){
    var selection = $(this).val();
    $(".fields").hide();
    if(selection == "Radio")
    {
      $("#testForm").append("<div id='radioButtonBoolean' class='form-group'><div class='fields'><br><input type='radio' name='radioButton' id='radioButton' value='true'><input type='text' name='textField' placeholder='true'/><br><br><input type='radio' name='radioButton' id='radioButton' value='false'><input type='text' name='textField' placeholder='false'/><br><hr></div></div>");
    }else
    {
      $("#testForm").append("<div id='checkboxBoolean' class='form-group'><div class='fields'><br><input type='checkbox' name='checkButton' id='checkBox' value='true'><input type='text' name='textField' placeholder='true'/><br><br><input type='checkbox' name='checkButton2' id='checkBox2' value='false'><input type='text' name='textField' placeholder='false'/><br><hr></div></div>");
    }
  }
);
};

function scaleOption()
{
  $("#testForm").append("<div class='field'><input type='text' class='form-control answer-option scale' name='scale' id='scale' placeholder='Question Content'><br></div>");
  $("#testForm").append("<div class='field'><div class='form-group mx-sm-3 mb-2'><input type='number' value='' id='min' placeholder='Min value'><br><br><input type='number' value='' id='max' placeholder='Max value'><br><hr></div></div>");

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

  var min= document.getElementById("min").value;
  var max= document.getElementById("max").value;

  var i;
  for (i = 0; i < count; i++){
    var question = new Object();
    question.title = questionTitles[i].value;
    question.type = questionTypes[i].value;
    question.content = questionContents[i].value;

    var selectForm = document.getElementById('selectForm');

    if (question.type == selectForm.options[0].text){
      question.type = "freetext";
    } else if (question.type == selectForm.options[1].number) {
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
