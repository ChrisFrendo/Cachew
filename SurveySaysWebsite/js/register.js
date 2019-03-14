function register(){
  // gets data from form and puts it in variables
  var username = document.getElementById('inputUsername').value;
  var password = document.getElementById('inputPassword').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  if (username == "" || password == "" || confirmPassword == ""){
    window.alert("All fields must be filled");
    return false;
  }

  if (password != confirmPassword){
    window.alert("Passwords do not match");
    return false;
  }

  var getUserTypeURL = 'http://localhost:4000/api/references/users/usertypes';
  var userTypes;

  $.ajax({
    contentType: 'application/json',
    type: 'GET',
    url: getUserTypeURL,
    async: false,
    success: function(data){
      userTypes = data[1];
    },
    error: function(jqXHR, exception){
      console.log("Something went wrong");
    }
  });

  // creates new object and adds each variable to the correct data piece
  var obj = new Object();


  obj.username = username;
  obj.password = password;
  obj.usertype = userTypes;


  // creates json string from gathered data
  var jsonString = JSON.stringify(obj);

  // Sending and receiving data in JSON format using ajax
  var url = "http://localhost:4000/api/register";

  $.ajax({
    contentType: 'application/json',
    data: jsonString,
    success: function(data){
        console.log("Researcher added successfully"); // do proper success handling here
        window.location.href = "login.html";
    },
    error: function(jqXHR, exception){
      if (jqXHR.status == 400){
        window.alert('Username already exists');
        console.log("Username already exists");  // do proper error handling here
        document.getElementById('registerForm').reset();
      } else {
        window.alert("Something Went wrong, please try again later");
      }
      success = false;
    },
    type: 'POST',
    url: url,
    async: false
  });


}
