(function(){
    $('#btn-contact').click(function(event){
        if(event)
           event.preventDefault()


           var s = $('#success');

           var visitor = {
               name: $('#contact-user-name').val(),
               email: $('#contact-user-email').val(),
               message: $('#contact-user-message').val()
           }

          console.log('Contact Form Submitted' + JSON.stringify(visitor))
          $.ajax({
              url: '/api/subscriber',
              type: 'POST',
              data: visitor,
              success: function(response){
                  console.log('Subscriber added' + JSON.stringify(response))
                  $('#contact-user-name').val('');
                  $('#contact-user-email').val('');
                  $('#contact-user-message').val('');
                  $('<p class="text-success"><i class="fa fa-check"></i> Thank you for your message, we will reach out to you soon!</p>').appendTo('#success');
              },
              error: function(response){

              }
          })
    })

})()