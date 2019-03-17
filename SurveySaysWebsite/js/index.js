function logout(){
  window.localStorage.removeItem('token');
  window.location.assign("login.html");
}
