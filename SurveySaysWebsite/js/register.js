function register(){
  // gets data from form and puts it in variables
  var username = document.getElementById('inputUsername').value;
  var password = document.getElementById('inputPassword').value;
  var salary = document.getElementById('inputSalary').value;
  var industry = document.getElementById('inputIndustry').value;

  // creates new object and adds each variable to the correct data piece
  var obj = new Object();
  obj.username = username;
  obj.password = password;
  obj.salary = salary;
  obj.industry = industry;

  // creates json string from gathered data
  var jsonString = JSON.stringify(obj);

  console.log(jsonString);

  // Sending and receiving data in JSON format using ajax
  var url = "http://localhost:4000/api/participant";

  $.ajax({
    contentType: 'application/json',
    data: jsonString,
    success: function(data){
        console.log("participant added successfully"); // do proper success handling here
        window.location = "index.html";
        return false;
    },
    error: function(jqXHR, exception){
      if (jqXHR.status == 420){
        window.alert('Username already exists');
        console.log("Username already exists");  // do proper error handling here
        document.getElementById('registerForm').reset();
      }
    },
    type: 'POST',
    url: url
  });


}
