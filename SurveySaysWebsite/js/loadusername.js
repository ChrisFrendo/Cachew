var username = document.getElementById('username');


var ip = '10.60.10.66';

var token = JSON.parse(localStorage.getItem("token"));

var url = "http://"+ip+":4000/api/users/username?token="+token;

$.ajax({
  contentType: 'application/json',
  success: function(data, textStatus, xhr){
    if (data.success == false){
      window.alert("Something went wrong");
      window.location.assign("login.html");
      window.localStorage.clear();
    } else {
    console.log(data);
    username.innerHTML = data;
  }
    return false;
  },
  error: function(jqXHR, exception){
    console.log(jqXHR);
    window.location.assign("login.html");
    window.localStorage.clear();
  },
  type: 'GET',
  url: url,
  async: false
});
