const accessToken = localStorage.getItem('access_token');
document.addEventListener('DOMContentLoaded', function() {
    // alert("alerted")
    loadQuizHome()

});

function loadQuizHome(){
    // alert("quiz me ")
    fetch('http://127.0.0.1:8000/quiz/home/', {
        method: 'GET',
        headers: {
            'Authorization': `JWT ${accessToken}`  // Use JWT header type
        }
    })
    .then(response => {
        if (!response.ok) {
            if(!response.ok) {
                throw new Error('Authentication error');
            }
        }
        return response.json();
    })
    .then(data => {
        // loadDepartments(data)
        // loadLevels(data)
        // loadQuiz(data)
        // updateProfile(data);
        console.log(data)  
        updateQuizDOM(data);            
        // console.log(data.levels)  
        // console.log(data.quizzes)  
    })
    .catch(error => {
        console.log('An error occured'), error;
    });
}

function updateQuizDOM(data){
    const departments = data.departments
    const levels = data.levels
    const quizzes = data.quizzes

    console.log(departments) 
    console.log(levels) 
    console.log(quizzes)
    
    const departmentContainer = document.getElementById('department-container')
    const levelContainer = document.getElementById('level-container')
    const quizContainer = document.getElementById('quiz-container')

    for (i=0; i<departments.length; i++ ){
        department = departments[i]
        console.log(department)
        let row1 = 
        `<option value="${department.id}">${department.name}</option>`

        departmentContainer.innerHTML += row1;
    }

    for(i=0; i<levels.length;i++){
        level = levels[i]
        console.log(level)

        let row2=
        `<option value="${level.id}">${level.year}</option>`

        levelContainer.innerHTML += row2;
    }

    for (i=0; i<quizzes.length;i++){
        quiz = quizzes[i]
        console.log(quiz)
        console.log(quizContainer)
        console.log(quiz.course.level.year)
        let row3 =
        `<a  class="sidebar__item  js-popup-open" href="#quiz" data-effect="mfp-zoom-in" style="width: 15rem; margin-bottom: 2rem; margin-left: 2rem ;" class="schedules__item active" href="#">
                      <div class="schedules__date bg-purple-light">
                        <div class="schedules__name caption-sm">${quiz.course.code}</div>
                        <div class="schedules__number h4">${quiz.course.department.name}</div>
                      </div>
                      <div class="schedules__details">
                        <div class="schedules__category title">${quiz.name}<svg class="icon icon-arrow-right">
                            <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
                          </svg></div>
                        <div class="schedules__time caption">lvl ${quiz.course.level.year}</div>
                      </div>
                    </a>
`

        quizContainer.innerHTML+= row3;
    }
}

// // Populate departments
// function loadDepartments(data){
    
//     const departmentContainer = document.getElementById('department-container')
//     console.log(data)
//     // console.log(departmentContainer)

//     // for(i=0; i<data.length;i++){
//     //     const dpt = data[i]
//     //     console.log(dpt)
//     //     let row =
//     //     `<option value="${dpt.id}">${dpt.name}</option>`

//     //     departmentContainer.innerHTML += row

//     // }
// }

//     // Populate levels
// function loadLevels(data){
//     const data= data.levels
//     // const levelContainer = document.getElementById('level-container')
//     // console.log(data1)
//     console.log(levelContainer)

//     for(i=0; i<data1.length;i++){
//         const lvl = data1[i]
//         // console.log(lvl)
//         let row =
//         `<option value="${lvl.id}">${lvl.year}</option>`

//         levelContainer.innerHTML += row

//     }
// }

// // Populate quiz region
// function loadQuiz(data){
//     const data2 = data.quizzes
//     const quizContainer = document.getElementById('quiz-container')
//     console.log(data2)
//     console.log(quizContainer)

// //     for(i=0; i<data2.length;i++){
// //         const qui = data2[i]
// //         console.log(lvl)
// //         let row =
// //         `<a  class="sidebar__item  js-popup-open" href="#quiz" data-effect="mfp-zoom-in" style="width: 15rem; margin-bottom: 2rem; margin-left: 2rem ;" class="schedules__item active" href="#">
// //                       <div class="schedules__date bg-purple-light">
// //                         <div class="schedules__name caption-sm">${qui.code}</div>
// //                         <div class="schedules__number h4">${qui.code}</div>
// //                       </div>
// //                       <div class="schedules__details">
// //                         <div class="schedules__category title">${qui.name}<svg class="icon icon-arrow-right">
// //                             <use xlink:href="img/sprite.svg#icon-arrow-right"></use>
// //                           </svg></div>
// //                         <div class="schedules__time caption">${qui.level.year}</div>
// //                       </div>
// //                     </a>
// // `

// //         quizContainer.innerHTML += row

// //     }
// }                                                                                                                                         