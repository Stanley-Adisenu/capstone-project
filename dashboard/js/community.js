// Creating a room
function createRoom(){
    const topic = document.getElementById('room_topic').value;
    const name = document.getElementById('room_name').value;
    const description = document.getElementById('room_description').value;

    const accessToken = localStorage.getItem('access_token');
  
    fetch('http://127.0.0.1:8000/dashboard/createroom/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${accessToken}`
                },
                body: JSON.stringify({
                    topic: topic,
                    name: name,
                    description: description
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
            alert('Room created successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
           
        });
}

// Loading rooms into the DOM

document.addEventListener('DOMContentLoaded', function() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        window.location.href = '/index.html';
    } 
    // console.log(accessToken);
    else {


        // alert("fetching")
        fetch('http://127.0.0.1:8000/dashboard/home/', {
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
        const roomNumber= document.getElementById('room_number');
        if (roomNumber) {
            roomNumber.textContent = data.total_rooms;
        } 
        
            // Update room
            const rooms = data.rooms;
            // console.log(rooms) ;
            communityHome(rooms) 

            // update hosts
            const hosts = data.unique_hosts;
            // console.log(hosts);
            updateHosts(hosts);

        })
        .catch(error => {
            // alert("alerted")
            console.error('Authentication error:', error);
        });
    }
});



// community page update 
function communityHome(rooms){
 let roomsContainer = document.getElementById('room_list');
    for (let i = 0; rooms.length > i; i++) {
        let room = rooms[i]

        // console.log(room);
        // console.log(roomsContainer)

        let row =
         `
         <div onClick="chatRoom(${room.id})" class="inbox__item active marginator">
                      <div class="inbox__ava"><img class="inbox__pic" src="img/ava-2.png" alt=""></div>
                      
                      <div class="inbox__details">
                        <div style="display: flex; justify-content: space-between;" class="inbox__head">
                          <div class="name__time">
                            <div class="inbox__author caption">${room.host.user_name}</div>
                          <div class="inbox__time caption"><span>${room.time_since_created}</span></div>
                          </div>
                          <button class="actions__btn"><svg class="icon icon-star">
                              <use xlink:href="img/sprite.svg#icon-star"></use>
                            </svg></button>
                        </div>
                        <div class="inbox__title title"><h1><span>#</span>${room.name}</h1></div>
                        <div class="inbox__text">${room.topic.name}</div>
                        <div style="display: flex; justify-content: space-between;" class="actions">
                          <div class="joined__number" >
                           <h4> <span>${room.participant_count} </span> joined</h4>
                            </div>
                          
                            </div>
                      </div>
                    </div>
        
        `

        roomsContainer.innerHTML += row;

        // let row = `<div>
        //                 <h3>${room.name}</h3>
        //             </div>`

        // roomsContainer.innerHTML += row
    }
   

}

function updateHosts(hosts){
    let hostsContainer = document.getElementById('hostsContainer');
    for (let i = 0; hosts.length > i; i++) {
        let host = hosts[i]

        // console.log(host);
        // console.log(hostsContainer)

        let row =
         `
         <a class="quality__item js-popup-open" href="#popup-user" data-effect="mfp-zoom-in">
         <div  class="quality__preview bg-pink-opacity"><img class="quality__pic" src="img/figure-1.png" alt=""></div>
         <div class="quality__details">
           <div class="quality__category title">${host.user_name}<svg class="icon icon-arrow-right">
               <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
             </svg></div>
           <div class="quality__info caption-sm">${host.full_name}</div>
          <!--<div class="quality__money caption">Rooms</div> --> 
         </div>
       </a>
        
        `

        hostsContainer.innerHTML += row;

        // let row = `<div>
        //                 <h3>${room.name}</h3>
        //             </div>`

        // roomsContainer.innerHTML += row
    }

}


// redirecting to chat section 
function chatRoom(id){
    localStorage.setItem('chat_id', id);
    window.location.href = '/dashboard/chat.html'
}





// updating chat 

function roomSearch(){
const query = document.getElementById('room_search').value;
// console.log(query)
const accessToken = localStorage.getItem('access_token');


    fetch(`http://127.0.0.1:8000/dashboard/home/?q=${query}`, {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${accessToken}`  
            }
        })
        .then(response => {
            if (!response.ok) {
               
                console.log("An error occured ")
            }
            // alert("Done fetching")
            return response.json();
        })
        .then(data => {
            let roomsContainer = document.getElementById('room_list');
            roomsContainer.innerHTML = '';
           // Update room
           const rooms = data.rooms;
        //    console.log(rooms) ;
           communityHome(rooms) 

        
        })
        .catch(error => {
            // alert("alerted")
            console.error('Authentication error:', error);
        });
    }


// Update the room's DOM
// Updating the DOM with  the fetched data 
// function updateRoomDom(data) {
//     const roomName= document.getElementById('room_name');
//     if (roomName) {
//         roomName.textContent = data.user_name;
//     } else {
//         console.error('No username.');
//     }
// }

// Update chatroom with messages 
// function updateChat(data){
//     window.location.href = '/dashboard/chat.html'
//     alert('they were actually talking about this ' + data)
//     console.log(data)
// }