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
    console.log(data.id);
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


// Update profile info 
function UpdateProfile(){
    const userNameInput = document.getElementById('username_input');
    const fullnameInput = document.getElementById('fullname_input');
    const departmentInput = document.getElementById('department_input');
    const bioInput = document.getElementById('bio_input');

    const data = {
        User_name: userNameInput.value,
        full_name: fullnameInput.value,
        department: departmentInput.value,
        bio: bioInput.value

    };

    updateUserDetails(data);
}

async function updateUserDetails(data) {
    try {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            alert('No access token found. Please log in first.');
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT${accessToken}`
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            // Token might be expired, try to refresh it
            console.log('Access token expired. Refreshing token...');
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                return updateUserDetails(data); // Retry the request with the new token
            } else {
                alert('Failed to refresh token. Please log in again.');
                return;
            }
        }

        const result = await response.json();
        if (response.ok) {
            console.log('Success:', result);
            alert('User details updated successfully!');
        } else {
            console.error('Error:', result);
            alert('Failed to update user details. ' + (result.detail || ''));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating user details.');
    }
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        alert('No refresh token found. Please log in first.');
        return null;
    }

    try {
        const response = await fetch('http://localhost:8000/auth/jwt/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            return data.access;
        } else {
            console.error('Failed to refresh token:', await response.json());
            return null;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}
