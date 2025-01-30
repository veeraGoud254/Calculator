const questions = [
    {
        question:"If 3x + 5x = -8, then x + 1 =",
        answers:[
            {text:"-1",correct:false},
            {text:"0",correct:true},
            {text:"2",correct:false},
            {text:"1",correct:false},
        ]
    },
    {
        question:"Find the missing terms in multiple of 3: 3, 6, 9, __, 15",
        answers:[
            {text:"10",correct:false},
            {text:"11",correct:false},
            {text:"12",correct:true},
            {text:"13",correct:false},
        ]
    },
    {
        question:"What is the value of Triple point of water?",
        answers:[
            {text:"273.16 k",correct:true},
            {text:"273.16° c",correct:false},
            {text:"0° c",correct:false},
            {text:"-273.16 k",correct:false},
        ]
    },
    {
        question:"which is smallest country in the world?",
        answers:[
            {text:"Vatican City",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri Lanka",correct:false},
        ]
    },
    {
        question:"A projectile will achieve maximum horizontal range at which angle?",
        answers:[
            {text:"90°",correct:false},
            {text:"60°",correct:false},
            {text:"45°",correct:false},
            {text:"30°",correct:true},
        ]
    },
    {
        question:"what is the largest planet in our solarsystem?",
        answers:[
            {text:"earth",correct:false},
            {text:"venus",correct:false},
            {text:"mars",correct:false},
            {text:"jupiter",correct:true},
        ]
    }
];

const questionElement =document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score =0;

function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML ="Next";
    showQuestion();
}
function showQuestion(){
    
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct =answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
nextButton.style.display ="none";
while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
}
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();     
    var percent= parseFloat((score/questions.length)*100).toFixed(2);
   
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!
    and got ${percent} percent of total marks and taken ${minutes} minutes and ${seconds} seconds to complete the quiz`;
    clearInterval(time);
    nextButton.innerHTML ="Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex <questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
}
);
startQuiz();