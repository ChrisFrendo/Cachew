function login(){
  // gets data from form and puts it in variables
  var username = document.getElementById('loginUsername').value;
  var password = document.getElementById('loginPassword').value;

  var url = "http://localhost:4000/api/login?username=" + username + "&password=" + password;

  // console.log(url);

  $.ajax({
    success: function(data){
      console.log(data);
        if (data.found === true){
          window.alert("Account found. Logging in now...");
          window.location = "index.html";
          return false;
        } else {
          window.alert("Account not found, please check username and password");
        }
    },
    error: function(jqXHR, exception){
      console.log("Something went wrong when processing the request");
      alert("Something went wrong when processing the request");
    },
    type: 'GET',
    url: url
    });
}
