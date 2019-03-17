var username = document.getElementById('username');


var ip = '192.168.1.83';

var token = JSON.parse(localStorage.getItem("token"));

var url = "http://"+ip+":4000/api/users/username?token="+token;

$.ajax({
  contentType: 'application/json',
  success: function(data, textStatus, xhr){
    console.log(data);
    username.innerHTML = data;
    return false;
  },
  error: function(jqXHR, exception){
    console.log(jqXHR); // make website redirect to login page since token sent is not correct (i.e. user not logged in)
  },
  type: 'GET',
  url: url,
  async: true
});
