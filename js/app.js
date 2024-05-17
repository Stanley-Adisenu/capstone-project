// svg icons support ie11
(function () {
	svg4everybody();
})();

// carousel arrows
var navArrows = ['\n    <svg class="icon icon-arrow-prev">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use>\n    </svg>', '<svg class="icon icon-arrow-next">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use>\n    </svg>'];

// owl carousel
$(document).ready(function () {

	var sliderReview = $('.js-slider-review');
	sliderReview.owlCarousel({
		items: 3,
		nav: true,
		navElement: 'button',
		navText: navArrows,
		dots: false,
		loop: true,
		smartSpeed: 700,
		responsive: {
			0: {
				items: 1,
				autoHeight: true
			},
			768: {
				items: 3
			}
		}
	});

	var sliderComment = $('.js-slider-comment');
	sliderComment.owlCarousel({
		items: 3,
		nav: true,
		navElement: 'button',
		navText: navArrows,
		dots: false,
		loop: true,
		smartSpeed: 700,
		responsive: {
			0: {
				items: 1,
				autoHeight: true
			},
			768: {
				items: 2
			},
			1024: {
				items: 3
			}
		}
	});
});

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

// faq
(function () {
	var item = $('.faq__item, .questions__item'),
	    head = $('.faq__head, .questions__head'),
	    body = $('.faq__body, .questions__body');
	head.on('click', function () {
		var thisHead = $(this);
		thisHead.parents('.faq__item, .questions__item').toggleClass('active');
		thisHead.parents('.faq__item, .questions__item').find('.faq__body, .questions__body').slideToggle();
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

// header
(function () {
	var header = $('.header'),
	    wrapper = header.find('.header__wrapper'),
	    burger = header.find('.header__burger');

	burger.on('click', function () {
		burger.toggleClass('active');
		wrapper.toggleClass('visible');
		$('html').toggleClass('no-scroll');
		$('body').toggleClass('no-scroll');
	});
})();

// pricing options
(function () {
	var view = $('.pricing__view');

	view.on('click', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$(this).parents('.pricing__item').find('.pricing__options').slideToggle();
	});
})();

// aos animation
AOS.init();




// sign up
async function SignUpSubmit(){
var username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const pass1 = document.getElementById('pass').value;
const pass2 = document.getElementById('confirm_pass').value;
// const submitBtn = document.getElementsByClassName('submit_button').textContent;
// submitBtn.textContent = "Submitting...";
// console.log(submitBtn);

if (pass1 !== pass2) {
	    alert('Passwords do not match.');
		return;
	        
	}
else if(pass1.length < 8){
	alert('Password should be at least 8 characters');
	
	return;
}

try {
	        const response = await fetch('http://127.0.0.1:8000/auth/users/', {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({
	                user_name: username,
	                email: email,
	                password: pass1	,			
	                re_password: pass2				
	            })
				
	        });
	
	        if (response.ok) {
			
	           alert('Account created successfully. Please check your email for an activation link');
			   document.getElementById('username').value = '';
			   document.getElementById('email').value = '';
			   document.getElementById('pass').value = '';
			   document.getElementById('confirm_pass').value = '';

			   window.location.href = "activate.html";

	        } else {
	            const data = await response.json();
				
	            alert('Sign up failed. This may be due to an already existing username or email');
				
				
	        }
	    } catch (error) {
	       alert('An error occurred.');
	        console.error('Error:', error);
	    }
	}


// Activate account
async function activateAccount(){
	const inputField= document.getElementById('activation-link');
    const activationLink = inputField.value.trim();
	const parts = activationLink.split('/');
	// token and uid
	const token = parts.pop();
	const uid = parts.pop();
	console.log(uid);

	if(inputField.value.length < 1){
		alert('Enter the activation link in the input field');
			
		return;
	}

	try {
				const response = await fetch('http://127.0.0.1:8000/auth/users/activation/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						uid: uid,
						token: token,
								
					})
					
				});
		
				if (response.ok) {
				
				   alert('Account activated successfully. Please login to continue');
				   document.getElementById('activation-link').value = '';
				   
	
				   window.location.href = "index.html";
	
				} else {
					const data = await response.json();
					
					alert('Activation failed. Please try again');
					
					
				}
			} catch (error) {
			   alert('An error occurred.');
				console.error('Error:', error);
			}
		}


// Resend activation link
async function resendEmail(){
	const re_email= document.getElementById('resend_email').value;
   
	

	if(re_email.length < 1){
		alert('Enter your email');
			
		return;
	}

	try {
				const response = await fetch('http://127.0.0.1:8000/auth/users/resend_activation/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: re_email,
								
					})
					
				});
		
				if (response.ok) {
				
				   alert('Activation link has been sent to your email');
				   document.getElementById('resend_email').value = '';
				   
	
				   window.location.href = "activate.html";
	
				} else {
					const data = await response.json();
					
					alert('Activation email could not be sent. Check the email and try again');
					
					
				}
			} catch (error) {
			   alert('An error occurred.');
				console.error('Error:', error);
			}
		}




	// alert(username);
	// alert(email);
	// alert(pass1);
	// alert(pass2);
// }

// scripts.js

// document.getElementById('signup-form').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const confirmPassword = document.getElementById('confirm-password').value;
//     const messageElement = document.getElementById('message');

//     if (password !== confirmPassword) {
//         messageElement.textContent = 'Passwords do not match.';
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:8000/auth/users/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username: username,
//                 email: email,
//                 password: password
//             })
//         });

//         if (response.ok) {
//             messageElement.style.color = 'green';
//             messageElement.textContent = 'Sign up successful!';
//         } else {
//             const data = await response.json();
//             messageElement.style.color = 'red';
//             messageElement.textContent = data.detail || 'Sign up failed.';
//         }
//     } catch (error) {
//         messageElement.style.color = 'red';
//         messageElement.textContent = 'An error occurred.';
//         console.error('Error:', error);
//     }
// });
