$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

var err_lbls = [$('#fillinError'), $('#confirmError'), $('pwdError'), $('emailError')];

function validateLogin() {
  clear_errors();
  var username = $('#usernameLogin').val();
  var pwd = $('#passwordLogin').val();
  if (username == '' || pwd == '') {
    $('#fillinError').show();
    return false;
  }
  return true;
}

function validateRegistration() {
  clear_errors();
  var username = $('#usernameRegister').val();
  var email = $('#emailRegister').val();
  var pwd = $('passwordRegister').val();
  var conPwd = $('confirmPasswordRegister').val();
  if (pwd != conPwd) {
    $('#confirmError').show();
    return false;
  }
  if (username == '' || email == '' || email == '') {
    $('#fillinError').show();
    return false;
  }
  var email_pattern =
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var pwd_pattern = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
  if (!email_pattern.test(email)) {
    $('#emailError').show();
    return false;
  }
  if (!pwd_pattern.test(pwd)) {
    $('#pwdError').show();
    return false;
  }
  return true;
}

function clear_errors() {
  for (var i in err_lbls) {
    err_lbls[i].hide();
  }
}
