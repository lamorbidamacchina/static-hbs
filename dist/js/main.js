$(document).ready(function() {
  $("#buttonMenuMobile").on("click",function() {
    $("#sidebar").toggleClass("active");
    $(".main").toggleClass("inactive");
    $(".spacer").toggle();
  });
  $(".spacer").on("click", function(){
    $("#sidebar").removeClass("active");
    $(".main").removeClass("inactive");
    $(".spacer").hide();
  });
 


  const urlParams = new URLSearchParams(window.location.search);
  const login_error = urlParams.get('error');
  if (login_error == "username") {
    $("#userError").addClass("active");
    $("#utente").addClass("error");
  }
  if (login_error == "password") {
    $("#pwdError").addClass("active");
    $("#password").addClass("error");
  }
  if (login_error == "otp") {
    $("#otpError").addClass("active");
    $("#otp").addClass("error");
  }
});