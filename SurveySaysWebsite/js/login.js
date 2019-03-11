function login(){
  // gets data from form and puts it in variables
  var username = document.getElementById('loginUsername').value;
  var password = document.getElementById('loginPassword').value;

  var url = "http://localhost:4000/api/login/researcher?username=" + username + "&password=" + password;

  // console.log(url);

  $.ajax({
    contentType: 'application/json',
    success: function(data, textStatus, xhr){
        if (xhr.status == 200){
          window.alert("Account found. Logging in now...");
          window.location.assign("index.html");
          return false;
        } else {
          window.alert("Account not found, please check username and password");
        }
    },
    error: function(jqXHR, exception){
      window.alert("Account not found, please check username and password");
    },
    type: 'GET',
    url: url,
    async: true
    });
}
