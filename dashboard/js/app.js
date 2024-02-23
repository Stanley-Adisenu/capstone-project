// svg icons support ie11
(function () {
    svg4everybody();
})();

// carousel arrows
var navArrows = ['\n    <svg class="icon icon-arrow-prev">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use>\n    </svg>', '<svg class="icon icon-arrow-next">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use>\n    </svg>'];

// owl carousel
$(document).ready(function () {
    var slider = $('.js-slider');
    slider.owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        loop: true,
        smartSpeed: 700
    });

    var sliderGoal = $('.js-slider-goal');
    sliderGoal.owlCarousel({
        items: 1,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: true,
        loop: true,
        smartSpeed: 700
    });
});

// dropdown
(function () {
    var dropdown = $('.js-dropdown');
    dropdown.each(function () {
        var item = $(this);
        head = item.find('.js-dropdown-head'), body = item.find('.js-dropdown-body');
        head.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!item.hasClass('active')) {
                dropdown.removeClass('active');
                item.addClass('active');
            } else {
                dropdown.removeClass('active');
            }
        });
        body.on('click', function (e) {
            e.stopPropagation();
        });
        $('body').on('click', function () {
            dropdown.removeClass('active');
        });
    });
})();

// magnificPopup
(function () {
    var link = $('.js-popup-open');
    link.magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        removalDelay: 200,
        callbacks: {
            beforeOpen: function beforeOpen() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        }
    });
})();

// page
(function () {
    var page = $('.page'),
        sidebar = $('.sidebar'),
        burgerSidebar = sidebar.find('.sidebar__burger'),
        user = sidebar.find('.sidebar__user'),
        details = sidebar.find('.sidebar__details'),
        close = sidebar.find('.sidebar__close'),
        header = $('.header'),
        burgerHeader = header.find('.header__burger'),
        searchOpen = header.find('.header__search'),
        search = $('.search');
    burgerSidebar.on('click', function () {
        page.toggleClass('toggle');
        sidebar.toggleClass('active');
    });

    burgerHeader.on('click', function () {
        page.toggleClass('toggle');
        sidebar.toggleClass('active');
        $('body').toggleClass('no-scroll');
        $('html').toggleClass('no-scroll');
    });

    close.on('click', function () {
        page.removeClass('toggle');
        sidebar.removeClass('active');
        $('body').removeClass('no-scroll');
        $('html').removeClass('no-scroll');
    });

    searchOpen.on('click', function () {
        searchOpen.toggleClass('active');
        search.toggleClass('show');
        $('.notifications').removeClass('active');
    });

    user.on('click', function () {
        $(this).toggleClass('active');
        $(this).prev().toggle();
    });

    $('.search__toggle').on('click', function () {
        $('.notifications').removeClass('active');
        $('.search').toggleClass('active');
    });

    $('.notifications__open').on('click', function () {
        $('.notifications').toggleClass('active');
        $('.search').removeClass('active');
        searchOpen.removeClass('active');
        search.removeClass('show');
    });
})();

// toggle body theme
(function () {
    var switchTheme = $('.js-switch-theme'),
        body = $('body');

    switchTheme.on('change', function () {
        if (!body.hasClass('dark')) {
            body.addClass('dark');
            localStorage.setItem('darkMode', "on");
        } else {
            body.removeClass('dark');
            localStorage.setItem('darkMode', "off");
        }
    });
})();

(function () {
    var checkboxAll = $('.products__row_head .checkbox__input');
    checkboxAll.on('click', function () {
        if ($(this).is(':checked')) {
            $(this).parents('.products__table').find('.products__row:not(.products__row_head) .checkbox__input').prop('checked', true).attr('checked', 'checked');
        } else {
            $(this).parents('.products__table').find('.products__row:not(.products__row_head) .checkbox__input').prop('checked', false).removeAttr('checked');
        }
    });
})();

$('.schedules__item').on('click', function (e) {
    e.preventDefault();
    $('.schedules__item').removeClass('active');
    $(this).addClass('active');
});

$('.tabs__item').on('click', function (e) {
    e.preventDefault();
    $('.tabs__item').removeClass('active');
    $(this).toggleClass('active');
});

$('.tabs__link').on('click', function (e) {
    e.preventDefault();
    $('.tabs__link').removeClass('active');
    $(this).toggleClass('active');
});

$('.inbox__item').on('click', function () {
    $('.inbox__item').removeClass('active');
    $(this).toggleClass('active');
});

$('.notification__item').on('click', function () {
    $('.notification__item').removeClass('active');
    $(this).toggleClass('active');
});

$('.activity__item').on('click', function () {
    $('.activity__item').removeClass('active');
    $(this).toggleClass('active');
});


//chat for chatroom 
const textBar = document.querySelector(".editor__body textarea");
const sendbtn = document.querySelector(".chat__send");
const messagebox = document.querySelector(".chat__message");

function sendbutton (){
     // Function to escape HTML characters

     function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
    if(textbar.value.length > 0){

        const UserTypedMessage = escapeHtml(textBar.value); // Sanitize user input
        textbar.value = "";
        console.log(UserTypedMessage);
        
        let message = 
        `<div class="inbox__box my__message">
            <div class="inbox__ava"><img class="inbox__pic " src="img/ava-2.png" alt=""></div>
            <div class="inbox__details">
                <div class="inbox__head">
                    <div class="chatbot__title color-purple"><b>Me</b></div>
                </div>
                <div class="inbox__title ">
                    <p>${UserTypedMessage}</p>
                </div>
            </div>
        </div>`;
      messagebox.insertAdjacentHTML("beforeend",message);  
    }
}





//display send button only after a valid input 
function alerter() {
    var y = document.getElementById("send__btn");
    var inputElement = document.getElementById("input");

    // Add an event listener for the 'keyup' event
    inputElement.addEventListener("keyup", function() {
        var len = inputElement.value;

        // Hide or show the button based on the length
        if (len < 1) {
            y.style.display = "none";
        } else {
            y.style.display = "block";
        }  
    });
}


//code for chatbot
const x = document.getElementById("welcome");
const messageBar = document.querySelector(".AIeditor__body textarea");
const sendBtn = document.querySelector(".send__btn");
const messageBox = document.querySelector("#AI__message");
let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "";

sendBtn.onclick = function(){
            // Function to escape HTML characters

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
    if(messageBar.value.length > 0){
        x.style.display="none";
        messageBox.style.display="block";

        const UserTypedMessage = escapeHtml(messageBar.value); // Sanitize user input
        messageBar.value = "";
        
        let message = 
        `<div class="inbox__box my__message">
            <div class="inbox__ava"><img class="inbox__pic " src="img/ava-2.png" alt=""></div>
            <div class="inbox__details">
                <div class="inbox__head">
                    <div class="chatbot__title color-purple"><b>Me</b></div>
                </div>
                <div class="inbox__title ">
                    <p>${UserTypedMessage}</p>
                </div>
            </div>
        </div>`;
         

      let response = 
      ` <div class="inbox__box bot__message">
      <div class="inbox__ava"><img class="inbox__pic bot__pic" src="img/ava-2.png" alt=""></div>
      <div class="inbox__details">
        <div class="inbox__head">
          <div class="chatbot__title color-purple"><b>Bard</b></div>
        </div>
        <div class="inbox__title ">
          <p class="new">...</p>
        </div>
      </div>
    </div>`

      messageBox.insertAdjacentHTML("beforeend",message);


      setTimeout(()=>{
        messageBox.insertAdjacentHTML("beforeend",response);

        const requestOptions ={
            method : "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": UserTypedMessage}],
            })
        }

        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
            const ChatBotResponse = document.querySelector(".bot__message .new");
            const botPic = document.querySelector(".bot__message .bot__pic");
            botPic.classList.remove("bot__pic"); 
            ChatBotResponse.innerHTML = escapeHtml(data.choices[0].message.content);

            ChatBotResponse.classList.remove("new"); 
            console.log(ChatBotResponse);

        }).catch((error) => {
            const ChatBotResponse = document.querySelector(".bot__message .new");
            ChatBotResponse.classList.remove("new"); 
            const botPic = document.querySelector(".bot__message .bot__pic");
            botPic.classList.remove("bot__pic"); 
            ChatBotResponse.innerHTML = "Oops &#x1F61E, an error occurred. Kindly try again &#x1F97A ";
        })
    
      },100);
    }
    else{
        x.style.display="block";
        messageBox.style.display="none";

    }
}


