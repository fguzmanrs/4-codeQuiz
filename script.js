

// user arrives at the landing page
    // presented with a prompt to "Start Quiz"
    // navigation option available to "View Highscores"
    // "Time" value set at 0
// User clicks the "Start Quiz" button
    // timer is initialized
        // timer given value
        // timer begins countdown
        // display quiz instantly
    // Display quiz questions  
        // user presented with a series of questions (5)
            // for each question store list of answer choices
        //user presented with multiple choice buttons
        //user selects answer
            // Keep track of user's score
                //for each question find selected answer
                    // If quick and correct answer 
                        // user gets a higher score
                    // If incorrect answer
                        // user gets a time penalty (ex, 15 seconds are subtracted from time remaining)
                    // If incomplete user input
                        // ?Can they skip the question and just miss out on the opportunity for points?
            // add this question and its answer to the output
        //hide previous question
        //show new question
    // If timer reaches 0 or all questions are answered then game ends
        // user is presented with their final score
        // user is asked to enter their initials
// Game ends
    //user given final score
        // Score is calculated by time remaining 
    //user prompted to input initials
    //User input stored in localStorage
//AC

var currentQuestion: 0
var remainingTime: questions.length*20
var timer: 0
var timeout: 0
var timePenalty: 10
var highScores: []

// Timer
function timerFunc() {

    clearTime();

    var timeDOM = document.querySelector('#time-number');
    timeDOM.innerText = remainingTime;

    timer = setInterval(function () {
        remainingTime--;
        timeDOM.innerText = remainingTime;
    }, 1000)

    timeout = setTimeout(function () {
        console.log("time over");
        clearInterval(timer);
        result()
    }, remainingTime*1000)
}

// Delete previous question's buttons
var choicesDOM = document.querySelector('.choices');
deleteChild(choicesDOM);

// Buttons
for (var i = 0; i < data.choices.length; i++) {

    // User presented with multiple choice buttons
    var choice = document.createElement('button');
    choice.innerText = (i + 1) + '. ' + data.choices[i];
    choice.classList.add(".choice");
    // For each question check if correct/incorrect (true/false)
    var answer = (data.answer === data.choices[i]) ? "Correct" : "Wrong";
    choice.setAttribute('answer', answer);

    choicesDOM.appendChild(choice);
}

// Quiz
function quizRender(data) {

    document.querySelector('#quiz').setAttribute('style', 'display: block;');

    // Begin Quiz
    document.querySelector('#start').addEventListener('click', function (event) {
        // Hide directions
        document.querySelector('#directions').setAttribute('style', 'display: none;')
        // Display quiz questions
        quizRender(questions[currentQuestion]);
        // Timer initialized
        timerFunc();
    });
    // User presented with a series of questions and choices (5)
    document.querySelector('.choices').addEventListener('click', function (event) {

        // Check if selected answer is incorrect
        if (event.target.getAttribute('answer') !== "Correct") {
            // console.log("wrong");
            // If user is incorrect they get a time penalty
            remainingTime = timePenalty;
            timerFunc();
        }
        // Show new question
        currentQuestion++;
        // If there is a question left
        if (currentQuestion < questions.length) {
            quizRender(questions[currentQuestion]);
        }
        // If timer reaches 0 or all questions are answered then game ends
        else {
            result();
            clearTimeout(timeOut);
        }
    })
}

//Results: final score
function result() {
    document.querySelector('#quiz').setAttribute('style', 'display:none');
    document.querySelector('#result').setAttribute('style', 'display: block;');
    document.querySelector('#score').innerText = remainingTime;
    clearInterval(timer);
}