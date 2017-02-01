/* global $, Stripe */  
//to let know $ exists somewhere else

// Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  // Set Strip public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit button
  submitBtn.click(function(event){
    // prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    // collect credit card fields.
    var ccNum = $('#card_number').val(), 
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
    // use Stripe js library to check for card errors.
    var error = false;
    
    //validate card number.
    if (!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    
    if (!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    
    if (!Stripe.card.validateExpiry(expMonth,expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if (error) {
      //if there are card errors, dont send to Stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
        // send card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }

    return false; //exit out of function
  });
  

  // Stripe will return a card token.
  function stripeResponseHandler(status,response) {
    // get token from response
    var token = response.id;
    
    // inject the card token in a hidden field
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    // Submit form to our Rails app.
    theForm.get(0).submit();
    //get(0) because theForm returns an array. 0 is first position in that.
  }
  
  
});
