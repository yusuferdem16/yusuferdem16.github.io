//Checks on registration form inputs
$(document).ready(function() {

    // Initialize AOS Animate on Scroll
    AOS.init();
    
    // Initialize Datepicker
    $("#birthday").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:2025",
        dateFormat: "dd/mm/yy"
    });

    // Initialize Validation
    $(".form-container").validate({
        rules: {
            fullName: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            birthday: {
                required: true,
                date: true
            },
            whatsapp: {
                required: true,
                minlength: 10
            },
            'interests': {
                required: true,
                minlength: 1
            }
        },
        messages: {
            fullName: {
                required: "Please enter your full name",
                minlength: "Your name must consist of at least 3 characters"
            },
            email: {
                required: "Please enter your AYBU email",
                email: "Please enter a valid email address"
            },
            birthday: {
                required: "Please select your birth date",
                date: "Please enter a valid date"
            },
            whatsapp: {
                required: "Please enter your WhatsApp number",
                minlength: "Please enter a valid phone number"
            },
            'interests': {
                required: "Please select at least one interest",
                minlength: "Select at least one interest"
            }
        },
        errorElement: "div",
        errorClass: "error-message",
        validClass: "valid-message",
        errorPlacement: function(error, element) {
            if (element.attr("name") == "interests") {
                error.appendTo(element.closest('.checkbox-group'));
            } else {
                error.insertAfter(element);
            }
        },
    
        highlight: function(element) {
            $(element).addClass('input-error');
        },
        unhighlight: function(element) {
            $(element).removeClass('input-error');
        },
        invalidHandler: function(event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                // 1️⃣ Shake the form
                $(".form-container").effect("shake", { distance: 10 });
    
                // 2️⃣ Scroll to first invalid field
                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top - 100
                }, 600);
            }
        },
    
        submitHandler: function(form) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your submission has been sent.',
                confirmButtonColor: '#3085d6'
            }).then(() => {
                form.reset();
            });
            return false;
        }
    });
    

});

//Slick Slider for Game Section
$(document).ready(function(){
    $('.game-slider').slick({
        infinite: false, // prevent looping problem
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });
});

//Scroll to Top Button
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#scrollTopBtn').fadeIn();
        } else {
            $('#scrollTopBtn').fadeOut();
        }
    });

    $('#scrollTopBtn').click(function() {
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });
});

//Selecting Game Categories
$(document).ready(function() {
    $('.category-tab').click(function() {
        var selectedCategory = $(this).attr('data-category');

        // Update active tab
        $('.category-tab').removeClass('active');
        $(this).addClass('active');

        // Animate hiding first, then showing
        $('.game-item').fadeOut(300, function() {
            if (selectedCategory === "all") {
                $('.game-item').fadeIn(300);
            } else {
                $('.game-item').each(function() {
                    var gameCategory = $(this).attr('data-category');
                    if (gameCategory === selectedCategory) {
                        $(this).fadeIn(300);
                    }
                });
            }
        });
    });
});

//Accordion for FAQ Section
$(document).ready(function() {
    $("#faq-accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        animate: 200
    });
});

//Tooltip for Game Section
$(document).ready(function() {
    $(document).tooltip({
        trigger: 'hover',
        placement: 'top'
    });
});

//Chekbox for Interests
$(document).ready(function() {
    $(".checkbox-group input[type='checkbox']").checkboxradio();
});

$(document).ready(function() {
    $("#faq-accordion").accordion({
    });
});

$(document).ready(function() {
    // Initialize Age Slider
    $("#age-slider").slider({
        range: "min",
        value: 18,
        min: 14,
        max: 65,
        slide: function(event, ui) {
            $("#age-value").text(ui.value);
            $("#age").val(ui.value);
        }
    });
    // Set initial value
    $("#age").val($("#age-slider").slider("value"));
    $("#age-value").text($("#age-slider").slider("value"));
});