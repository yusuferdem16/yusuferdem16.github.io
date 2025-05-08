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

$(document).ready(function() {
    // Load club news from JSON file
    $.ajax({
        url: 'data/news.json',
        method: 'GET',
        success: function(data) {
            const newsContainer = $('#news-container');
            data.news.forEach((item, index) => {
                newsContainer.append(`
                    <div class="accordion-item">
                        <button class="accordion-header" aria-expanded="false">
                            <span class="news-title">${item.title}</span>
                            <span class="news-date">${item.date}</span>
                            <span class="accordion-icon">+</span>
                        </button>
                        <div class="accordion-content">
                            <p>${item.content}</p>
                        </div>
                    </div>
                `);
            });

            // Add click event for accordion
            $('.accordion-header').click(function() {
                const isExpanded = $(this).attr('aria-expanded') === 'true';
                
                // Close all other accordion items
                $('.accordion-header').attr('aria-expanded', 'false');
                $('.accordion-content').slideUp();
                $('.accordion-icon').text('+');
                
                if (!isExpanded) {
                    $(this).attr('aria-expanded', 'true');
                    $(this).find('.accordion-icon').text('-');
                    $(this).next('.accordion-content').slideDown();
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading news:', error);
        }
    });

    // Fetch weather data from OpenMeteo API (free, no API key needed)
    // Ankara coordinates
    const ANKARA_LAT = 39.9334;
    const ANKARA_LON = 32.8597;

    $.ajax({
        url: `https://api.open-meteo.com/v1/forecast?latitude=${ANKARA_LAT}&longitude=${ANKARA_LON}&current_weather=true&temperature_unit=celsius`,
        method: 'GET',
        success: function(data) {
            const weather = data.current_weather;
            const weatherDescription = getWeatherDescription(weather.weathercode);
            
            // Determine if weather is "good" or "bad"
            const isBadWeather = [3, 45, 48, 51, 53, 55, 61, 63, 65, 71, 73, 75, 95].includes(weather.weathercode);
            const message = isBadWeather ? 
                'Perfect time to stay in and play board games!' : 
                'Beautiful weather outside - go touch some grass! (But come back later for games!)';
            
            $('.weather-info').html(`
                <h3>Ankara Weather</h3>
                <p>Temperature: ${Math.round(weather.temperature)}°C</p>
                <p>Conditions: ${weatherDescription}</p>
                <p class="weather-message">${message}</p>
            `);
        },
        error: function(xhr, status, error) {
            console.error('Error loading weather:', error);
            $('.weather-info').html('<p>Weather information temporarily unavailable</p>');
        }
    });

    // Helper function to convert weather codes to descriptions
    function getWeatherDescription(code) {
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Foggy',
            48: 'Depositing rime fog',
            51: 'Light drizzle',
            53: 'Moderate drizzle',
            55: 'Dense drizzle',
            61: 'Slight rain',
            63: 'Moderate rain',
            65: 'Heavy rain',
            71: 'Slight snow',
            73: 'Moderate snow',
            75: 'Heavy snow',
            95: 'Thunderstorm'
        };
        return weatherCodes[code] || 'Unknown';
    }
});