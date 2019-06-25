function InvalidUsername(textbox) {
      if (textbox.value == '') {
          textbox.setCustomValidity('Rellene este campo.');
      }
      else if (textbox.value.length < 4 || textbox.value.length > 20){
          textbox.setCustomValidity('El nickname debe ser mayor a 4 caracteres y menor a 20.');
      }
      else {
        textbox.setCustomValidity('');
      }
      return true;
    }
    
function hideError(){
  var errorServer = document.getElementById('error-servidor');
  errorServer.style.display = 'none';
}