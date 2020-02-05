$(function() {
    $(document).ready(function() {
        // form reset flag
        let isReset = true,
            loaderHTML = document.querySelector('.overlay-content').innerHTML; // caching the loader gif

        // 'escape' key can be used for closing the overlay
        $(document).keyup(function(e) {
            if (e.keyCode === 27) {
                close(e);
            }
        });

        // overlay close function
        function close(e) {
            e.preventDefault();
            document.querySelector('.overlay').style.display = 'none';

            // reset the loader content
            notification();

            // reseting the form values
            if (isReset) {
                $('form')[0].reset();
            }
        }
        $('#close').on('click', close);

        // setting the notification message
        function notification(message) {
            document.querySelector('.overlay-content').innerHTML = message
                ? `<span class='${
                      isReset ? 'success' : 'fail'
                  }'>${message}</span>`
                : loaderHTML;
        }

        // remove the error highlighter if exists
        $('input, email, textarea').focus(function() {
            $(this).removeClass('error');
        });

        // if there is a validation error, highlight the fields accordingly
        function errorHighlighter(error) {
            Object.keys(error).forEach((key) => {
                $(`#${key}`).addClass('error');
            });
        }

        $('form').submit(function(e) {
            e.preventDefault();
            var values = $(this).serialize();
            document.querySelector('.overlay').style.display = 'block';

            $.ajax({
                url: '/ws/sendmail',
                type: 'post',
                data: values,
                success: function() {
                    isReset = true;
                    notification('The mail is successfully sent.');
                },
                error: function(res) {
                    if (res.responseJSON) {
                        errorHighlighter(res.responseJSON);
                    }
                    isReset = false;
                    notification('Failed, the mail is not sent. Try again.');
                },
            });
        });
    });
});
