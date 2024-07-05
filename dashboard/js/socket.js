document.addEventListener("DOMContentLoaded", function () {
    const chatId = localStorage.getItem('chat_name');
    const token = localStorage.getItem('access_token');
    function replaceSpacesWithUnderscores(string) {
  // Use regular expression to match one or more spaces (\s+) and replace with underscore (_)
  return string.replace(/\s+/g, '_');
}

const room_name = replaceSpacesWithUnderscores(chatId);

    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/?token=${token}`);

    chatSocket.onmessage = function (e) {
        // alert("activated")
        // const data = JSON.parse(e.data);
        console.log('Message received:');
        const data = JSON.parse(e.data);
        // onChatMessage(JSON.parse(e.data))
        console.log(data)
        let messageContainer = document.getElementById('textBox');

        let row =
        `
        <div class="inbox__box">
             <div class="inbox__ava"><img class="inbox__pic" src="img/ava-2.png" alt=""></div>
             <div class="inbox__details">
               <div class="inbox__head">
                 <div class="inbox__author title">${data.user}</div>
                 <div class="inbox__time caption"></div>
               </div>
               <div class="inbox__text">
                 <p>${data.message}</p>
               </div>
             </div>
           </div>
       
       `
       messageContainer.innerHTML += row;

       messageContainer.scroll({
        top: messageContainer.scrollHeight,
        behavior: 'smooth'
      });

        
        
    };

    chatSocket.onopen = function (e) {
        // alert("activated big time")

        console.log('WebSocket connection opened');
    };

   

    chatSocket.onclose = function (e) {
        console.log('WebSocket connection closed');
    };

    function  onChatMessage(){

        const textArea = document.querySelector(".editor__field textarea"); 

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
     
        const message = escapeHtml(textArea.value);

        // const message = textArea.value;

        if (message){
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            // alert(message)
            textArea.value='';
        }
       
    //     let messageContainer = document.getElementById('textBox');
    // //    console.log(messageContainer)

    //     let row =
    //     `
    //     <div class="inbox__box">
    //     <div class="inbox__ava"><img class="inbox__pic" src="img/ava-2.png" alt=""></div>
    //     <div class="inbox__details">
    //       <div class="inbox__head">
    //         <div class="inbox__author title"></div>
    //         <div class="inbox__time caption"></div>
    //       </div>
    //       <div class="inbox__text">
    //         <p>${data.message}</p>
    //       </div>
    //     </div>
    //   </div>
       
    //    `
    //    messageContainer.innerHTML += row;


        
    }


    const sendButton = document.getElementById("send__btn");
    // Example function to send a message
    sendButton.addEventListener("click", function () {
       
        onChatMessage()
        // const textArea = document.querySelector(".editor__field textarea"); 
        // const message = textArea.value;

        // chatSocket.send(JSON.stringify({
        //     'type':'message',
        //     'message':message,
        //     'name': room_name,
        //     'agent': 'Me the user',

        // }))
        // textArea.value = ""; // Clear the input box after sending

       
        // alert(message)
        
            // const messageData = {
            //     type: 'message',
            //     message: message,
            // };
            // chatSocket.send(JSON.stringify(messageData));
        
    });

   
});



// // const chatId = localStorage.getItem('chat_id');
// // // alert(chatId)
// // let room_name =String(chatId) ;


// // chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${room_name}/`)

// // console.log(chatSocket)
// // chatSocket.onmessage = function(e){
// // const data= JSON.parse(e.data);
// // console.log('onMessage',data.message);
// // }

// // chatSocket.onopen = function(e){
// // console.log('onOpen = chat socket was opened')
// // }


// // chatSocket.onclose = function(e){
// // console.log('onClose = chat socket was closed')
// // }


// // function senders(){

// // const textArea = document.querySelector(".editor__field textarea");
// // const textBox = document.querySelector(".chat__message");

// // // Function to escape HTML characters

// // function escapeHtml(text) {
// //     const map = {
// //         '&': '&amp;',
// //         '<': '&lt;',
// //         '>': '&gt;',
// //         '"': '&quot;',
// //         "'": '&#039;'
// //     };
// //     return text.replace(/[&<>"']/g, function(m) { return map[m]; });
// // }


// // // const chatId = localStorage.getItem('chat_id');
// // const UserTypedMessage = escapeHtml(textArea.value);



// // alert(UserTypedMessage)
// // // const messageData={
// // //     type:'message',
// // //     message:UserTypedMessage
// // // };
// // // chatSocket.send(JSON.stringify(messageData));
// // }