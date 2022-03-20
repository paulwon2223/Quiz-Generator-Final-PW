//variables that will be used 
const quizContainer = document.getElementById('quiz');
const answersEl = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submitButton');
const mainHeader = document.getElementById('main-header')
const startBtn = document.getElementById('begin-bttn');
const timeRem = document.getElementById('timerem');

//variable for quiz questions
const quizData = [
    {
        question: 'Which type of language is Javascript?',
        A: 'Programming',
        B: 'Scripting',
        C: 'Markup',
        D: 'None of the above',
        correct: 'b'
    },
    {
        question: 'What does CSS stand for?',
        A: 'Computer System Software',
        B: 'Counter Strike Source',
        C: 'Cascading Style Sheet',
        D: 'Cascading Styling Source',
        correct: 'c'
    },
    {
        question: 'Which tag is used to write the javascript code?',
        A: '<script>',
        B: '<sp>',
        C: '<javascript>',
        D: '<java>',
        correct: 'a'
    },
    {
        question: 'Which of the following is not a valid data type in Javascript?',
        A: 'Boolean',
        B: 'Number',
        C: 'Undefined',
        D: 'Value',
        correct: 'd'
    }
]
let currentQuiz = 0;
let score = 0;
let timerCount = 0;

function loadQuiz(){

    setInterval(function(){
        timeRem.innerHTML = (60 - timerCount);
        timerCount++;
        if (timerCount === 0) {
            clearInterval()
        }
    }, 1000);

    deselectAnswers();
    // Gets the first object of array
    let currentQuizData = quizData[currentQuiz];
   
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.A;
    b_text.innerText = currentQuizData.B;
    c_text.innerText = currentQuizData.C;
    d_text.innerText = currentQuizData.D;

}

function deselectAnswers(){
    answersEl.forEach((answersEl) => {
        answersEl.checked = false;
    })
}

function getSelected(){
    
    let answer = undefined;
    answersEl.forEach((answerEl) => {
        if(answerEl.checked){
            answer = answerEl.id;
        }
    });

    return answer;
}

submitBtn.addEventListener('click', () => {

    const answer = getSelected();

    if(answer){

        if(answer == quizData[currentQuiz].correct){
            // adding the answer to local storage
            localStorage.setItem(currentQuiz, answer);
            score++
        }

        currentQuiz++;

        if(currentQuiz < quizData.length){
            loadQuiz();
        } else {
            quizContainer.innerHTML = `<h2>You answered ${score}/${quizData.length} correctly</h2>
            
            
            <button id="submitButton" onclick="location.reload()">Reload</button>`
            
            // showing user answers from local storage on screen 
            for(let i = 0; i < quizData.length; i++){
                let userAnswer = localStorage.getItem(i);
                if(userAnswer){
                    quizContainer.innerHTML += `<p>Question ${i + 1}: ${userAnswer}</p>`
                }
            }
            ;
        }
    } 
})
//invoking main function
loadQuiz();