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

var secondsLeft = 76;
var timerInterval;

var timeEl = document.querySelector(".time");
var questionsEl = document.querySelector(".questionsRendered");
var scoreEl = document.querySelector(".score");
var highScoreEl = document.querySelector(".highScore");
var submitButton = document.querySelector("#submit");
var refreshButton = document.querySelector("#goBack");

var initialInput = document.querySelector("#initials");
var scoreList = document.querySelector("#scoreList");
var scoreForm = document.querySelector("#scoreForm");

var userInitials = [];

document.querySelector('.score').style.display='none';
document.querySelector('.highScorePage').style.display='none';

refreshButton.addEventListener("click", function(){
    location.reload()
});

function setTime(){
    timerInterval = setInterval(function(){
        secondsLeft--;
        timeEl.textContent = "Remaining time: " + secondsLeft;
        if(secondsLeft === 0){
            clearInterval(timerInterval);
            document.querySelector('.score').style.display='block';
            document.querySelector(".time").style.display='none';
            document.querySelector('.questionsRendered').style.display='none';
            highScoreEl.textContent = "Your score is: " + secondsLeft;
        }
    }, 1000);
}

const startBtn = document.getElementById("startQuiz");

startBtn.addEventListener('click', function() {
    setTime();
    startBtn.style.display = 'none';
    document.querySelector('.splashPage').style.display='none';
    displayQuestions(questionIndex);
})

var questionIndex = 0;

function displayQuestions(){
    
    questionsEl.textContent = "";
    var question = questions[questionIndex];
    var questionDiv = document.createElement("div");
    var questionText = document.createElement("h2");
    questionText.textContent = question.title;
    questionDiv.appendChild(questionText)
    
    for (var i=0; i < question.choices.length ;i++) {
        var option = document.createElement("button");
        option.textContent = question.choices[i];
        option.setAttribute("class", "option");
        option.addEventListener("click", function(e) {
            var optionClicked = (e.target.innerHTML);
            
            if(optionClicked === questions[questionIndex].answer){
                alert("Correct!");
                displayQuestions(questionIndex++);
            }
            else{
                alert("Incorrect!");
                displayQuestions(questionIndex++);
                secondsLeft -= 10;
            }
            
        });
        if (questionIndex == questions.length - 1) {
            clearInterval(timerInterval);
            document.querySelector('.score').style.display='block';
            document.querySelector(".time").style.display='none';
            highScoreEl.textContent = "Your score is: " + secondsLeft;
            return;
        }
        questionDiv.appendChild(option);
    }
    questionsEl.appendChild(questionDiv);
}

function renderScores(){
    scoreList.innerHTML = "";
    
    for (var x = 0; x < userInitials.length; x ++){
        var letters = userInitials[x];
        
        var li = document.createElement("li");
        li.textContent = letters;
        li.setAttribute("dataIndex", x);
        
        var button = document.createElement("button");
        button.textContent = "Clear";
        
        li.appendChild(button);
        scoreList.appendChild(li);
    }
} 

function init() {
    var storedScores = JSON.parse(localStorage.getItem("userInitials"));
    
    if(storedScores !==null) {
        userInitials = storedScores;
    }
    
    const submitBtn = document.getElementById("submit");
    
    submitBtn.addEventListener('click', function() {
        event.preventDefault();
        
        var initialText = initialInput.value.trim();
        
        if (initialText === ""){
            return;
        }
        userInitials.push(initialText + " " + secondsLeft);
        console.log(userInitials);
        initialInput.value = "";
        
        document.querySelector('.Score').style.display='none';
        document.querySelector('.highscorePage').style.display='block';
        
        storeScore();
        renderScores();
        
    });
}

function storeScore(){
    localStorage.setItem("userInitials", JSON.stringify(userInitials));
}

scoreList.addEventListener("click", function(event){
    var element = event.target;
    
    if (element.matches("button")=== true){
        var index = element.parentElement.getAttribute("dataIndex");
        userInitials.splice(index, 1);
        
        storeScore();
        renderScores();
    }
});
init();