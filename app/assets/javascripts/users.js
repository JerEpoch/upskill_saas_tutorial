/* global $, Stripe */  //to let know $ exists somewhere else

// Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro-form');
  var submitBtn = $('#form-signup-btn');
  // Set Strip public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  // When user clicks form submit button
  submitBtn.click(function(event){
    // prevent default submission behavior.
    event.preventDefault();
    // collect credit card fields.
    var ccNum = $('#card_number').val(), 
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
    // send card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  

  // Stripe will return a card token.
  // Inject card token as hidden field into form.
  // Submit form to our Rails app.
});
