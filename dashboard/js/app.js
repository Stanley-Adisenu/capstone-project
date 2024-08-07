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

// Takashi 
function fetchMessages() {
    setInterval(async () => {
        try {
            const chatId = localStorage.getItem('chat_id');
            const accessToken = localStorage.getItem('access_token');

            const response = await fetch(`http://127.0.0.1:8000/dashboard/chat/${chatId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `JWT ${accessToken}` 
                }}); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            updateRoomDOM(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, 5000);
}



//chat in comunnity
document.addEventListener('DOMContentLoaded', function() {




    const accessToken = localStorage.getItem('access_token');
   

    if (!accessToken) {
        window.location.href = '/index.html';
    } 
    // console.log(accessToken);
    else {
        const chatId = localStorage.getItem('chat_id');
        // alert(chatId)
    


        // alert("fetching")
        fetch(`http://127.0.0.1:8000/dashboard/chat/${chatId}/`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${accessToken}`  // Use JWT header type
            }
        })
        .then(response => {
            // alert("done fetching")
            if (!response.ok) {
                // if (response.status === 401) {
                //     // Token might be expired, try refreshing
                //     // return refreshAccessToken();
                // } else {
                //     throw new Error('Authentication error');
                // }
                console.log("An error occured ")
            }
            return response.json();
        })
        .then(data => {
            // alert("It has been Jsoned")
            // console.log(data)
            updateRoomDOM(data); 
            // fetchMessages()           
            // updateProfile(data);
            // const rooms = data.rooms;
            // console.log(rooms) ;
            // communityHome(rooms) 
        })
        .catch(error => {
            // alert("alerted")
            console.error('Authentication error:', error);
        });


    }
});

// update the room Dom
function updateRoomDOM(data){
  
    room = data.room;
    messages =data.messages;
    participants = data.room.participants;
    // console.log(messages)
    const hostuserName= document.getElementById('host_userName');
    const hostfullName= document.getElementById('host_fullName');
    const roomName= document.getElementById('room_name');
    let messageContainer = document.getElementById('textBox');
    let roomiesContainer = document.getElementById('roomies');

    messageContainer.innerHTML='';
    roomiesContainer.innerHTML='';

        if (hostuserName) {
            hostuserName.textContent = room.host.user_name;
        } else {
            // console.error('No username.');
        }
        if (hostfullName) {
            hostfullName.textContent = room.host.full_name;
        } else {
            // console.error('No username.');
        }
        if (roomName) {
            roomName.textContent = room.name;
        } else {
            // console.error('No username.');
        }


        for (let i = 0;  messages.length > i; i++) {
            let message =  messages[i]
    
            // console.log( message);
            // console.log(messageContainer)
    
            let row =
             `
             <div class="inbox__box">
             <div class="inbox__ava"><img class="inbox__pic" src="img/ava-2.png" alt=""></div>
             <div class="inbox__details">
               <div class="inbox__head">
                 <div class="inbox__author title">${message.user.user_name}</div>
                 <div class="inbox__time caption">${message.time_since_updated}</div>
               </div>
               <div class="inbox__text">
                 <p>${message.body}</p>
               </div>
             </div>
           </div>
            
            `
    
            messageContainer.innerHTML += row;


            messageContainer.scroll({
             top: messageContainer.scrollHeight,
             behavior: 'smooth'
           });
    
            
        }

        for (let i = 0;  participants.length > i; i++) {
            let  participant =   participants[i]
    
            // console.log(  participant);
            // console.log(roomiesContainer)
    
            let row =
             `
             <a class="quality__item js-popup-open" href="#popup-user" data-effect="mfp-zoom-in">
             <div class="quality__preview bg-pink-opacity"><img class="quality__pic" src="img/figure-1.png" alt=""></div>
             <div class="quality__details">
               <div class="quality__category title">${participant.user_name}<svg class="icon icon-arrow-right">
                   <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                 </svg></div>
               <div class="quality__info caption-sm">${participant.full_name}</div>
             </div>
           </a>
            
            `
    
            roomiesContainer.innerHTML += row;
    
            
        }
       


}




    function sender(){
       
    const textArea = document.querySelector(".editor__field textarea");
    const textBox = document.querySelector(".chat__message");

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
     if(textArea.value.length >0){

        const chatId = localStorage.getItem('chat_id');
        const UserTypedMessage = escapeHtml(textArea.value); 
        
        const accessToken = localStorage.getItem('access_token');
   

        if (!accessToken) {
            window.location.href = '/index.html';
        } 

        fetch(`http://127.0.0.1:8000/dashboard/chat/${chatId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${accessToken}`
            },
            body: JSON.stringify({
                body: UserTypedMessage
            })
        })
    .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
    })
    .then(data => {
        // console.log('Success:', data);
        document.querySelector(".editor__field textarea").value='';
        // window.location.href = '/dashboard/chat.html'
    })
    .catch(error => {
        console.error('Error:', error);
       
    });

    //     textArea.value="";

    //     let message = 
    //     `<div class="inbox__box">
    //     <div class="inbox__ava"><img class="inbox__pic" src="img/ava-2.png" alt=""></div>
    //     <div class="inbox__details">
    //       <div class="inbox__head">
    //         <div class="inbox__author title">Steve</div>
    //         <div class="inbox__time caption">04:59</div>
    //       </div>
    //       <div class="inbox__text">
    //         <p>${UserTypedMessage}</p>
    //       </div>
    //     </div>
    //   </div>`;
    //     textBox.insertAdjacentHTML("beforeend",message);
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
const sendBtn = document.querySelector(".send__btn");
sendBtn.onclick = function(){
const x = document.getElementById("welcome");
const messageBar = document.querySelector(".AIeditor__body textarea");
const messageBox = document.querySelector("#AI__message");
let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "";
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

        fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            const ChatBotResponse = document.querySelector(".bot__message .new");
            const botPic = document.querySelector(".bot__message .bot__pic");
            botPic.classList.remove("bot__pic"); 
            ChatBotResponse.innerHTML = escapeHtml(data.choices[0].message.content);
            ChatBotResponse.classList.remove("new"); 
            // console.log(ChatBotResponse);

        }).catch((error) => {
            const ChatBotResponse = document.querySelector(".bot__message .new");
            ChatBotResponse.classList.remove("new"); 
            //const botPic = document.querySelector(".bot__message .bot__pic");
            //botPic.classList.remove("bot__pic"); 
            ChatBotResponse.innerHTML = "Oops &#x1F61E, an error occurred. Kindly try again &#x1F97A ";
        })
    
      },100);
    }
    else{
        x.style.display="block";
        messageBox.style.display="none";

    }
    }

    //code for profile section
    const selectElement = document.getElementById('profile__select');

    // Add change event listener to the select element
    function handleSelectionChange() {
        var selectElement = document.getElementById("profile__select");
        var selectedOption = selectElement.value;
        
        if (selectedOption === 'link1') {
             link1ed();
        } else if (selectedOption === 'link2') {
             link2ed();
        } else if (selectedOption === 'link3') {
             link3ed();
        }
      }


 function link2ed(){
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const section4 = document.getElementById('avatar');
    section2.style.display='contents';
    section1.style.display='none';
    section3.style.display='none';
    section4.style.display='none';

}

function link1ed(){
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const section4 = document.getElementById('avatar');
    section2.style.display='none';
    section1.style.display='contents';
    section3.style.display='none';
    section4.style.display='contents';

} 

function link3ed(){
    const section1 = document.getElementById('section1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const section4 = document.getElementById('avatar');
    section2.style.display='none';
    section1.style.display='none';
    section3.style.display='contents';
    section4.style.display='none';

} 
   


// logout 
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('chat_id');
    localStorage.removeItem('chat_name');
    window.location.href = '/index.html';
}






// const chatId = localStorage.getItem('chat_id');
// // alert(chatId)
// let room_name =String(chatId) ;


// chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/`)

// console.log(chatSocket)
// chatSocket.onmessage = function(e){
// console.log('onMessage')
// }

// chatSocket.onopen = function(e){
// console.log('onOpen = chat socket was opened')
// }


// chatSocket.onclose = function(e){
// console.log('onClose = chat socket was closed')
// }

// // Testing something
// function senders(e){
//     e.preventDefault()

//     chatInstant()

//     return false
// }


// function chatInstant(){
//     const textArea = document.querySelector(".editor__field textarea");
//     const textBox = document.querySelector(".chat__message");

//         // Function to escape HTML characters

//         function escapeHtml(text) {
//             const map = {
//                 '&': '&amp;',
//                 '<': '&lt;',
//                 '>': '&gt;',
//                 '"': '&quot;',
//                 "'": '&#039;'
//             };
//             return text.replace(/[&<>"']/g, function(m) { return map[m]; });
//         }
   

//         // const chatId = localStorage.getItem('chat_id');
//         const UserTypedMessage = escapeHtml(textArea.value);

//     chatSocket.send(JSON.stringify({
       
//         'type':'message',
//         'message':UserTypedMessage

//     }))
//     alert(UserTypedMessage)
//     alert("worked")
//     document.querySelector(".editor__field textarea").value='';
// }