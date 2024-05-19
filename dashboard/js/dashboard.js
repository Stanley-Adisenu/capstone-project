// dashboard.js

document.addEventListener('DOMContentLoaded', function() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        window.location.href = '/index.html';
    } 
    // console.log(accessToken);
    else {
        fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${accessToken}`  // Use JWT header type
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    alert("code red")
                    // Token might be expired, try refreshing
                    return refreshAccessToken();
                } else {
                    throw new Error('Authentication error');
                }
            }
            return response.json();
        })
        .then(data => {
            updateDOM(data);            
            updateProfile(data);            
        })
        .catch(error => {
            console.error('Authentication error:', error);
            window.location.href = '/index.html';
        });
    }
});

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }

    const response = await fetch('http://127.0.0.1:8000/auth/jwt/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh: refreshToken
        })
    });

    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access);

}

// Updating the DOM with  the fetched data 
function updateDOM(data) {
    const userNameElement = document.getElementById('user_name');
    if (userNameElement) {
        userNameElement.textContent = data.user_name;
    } else {
        console.error('No username.');
    }
}

// Update profile
function updateProfile(data) {
    const userNameInput = document.getElementById('username_input');
    const emailInput = document.getElementById('email_input');
    const fullnameInput = document.getElementById('fullname_input');
    const departmentInput = document.getElementById('department_input');
    const bioInput = document.getElementById('bio_input');
    function update(domVar,dataVar){
        if (domVar) {
            domVar.value = dataVar;
        } else {
            console.error('No ' +' '+ domVar);
        }
    }

    update(userNameInput,data.user_name);
    update(emailInput,data.email);
    update(fullnameInput,data.full_name);
    update(departmentInput,data.department);
    update(bioInput,data.bio);

    
}
