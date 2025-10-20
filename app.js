// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

const questionTitle = document.getElementById('question-title');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');
const scoreValue = document.getElementById('score');
const scoreSpan = document.getElementById('question-number');

const answerContainer = document.getElementById('answer-container');
const progressFill = document.getElementById('progress-fill');
 
const finalScore = document.getElementById('final-score');
const maxScore = document.getElementById('max-score');
const resultBar = document.getElementById('result-bar');
const progressBar = document.getElementById('progress-bar'); 

// Quiz Questions
const quizQuestions = [
    {
        question: "Which African kingdom had universities that attracted scholars from across Europe in the 14th century, long before Oxford and Cambridge became famous?",
        answers: [
            { text: "Songhai Empire", correct: false },
            { text: "Mali Empire", correct: true },
            { text: "Ghana Empire", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Who was the African emperor that was once called the richest man in history, but whose wealth was often erased from school history?",
        answers: [
            { text: "Mansa Musa", correct: true },
            { text: "Shaka Zulu", correct: false },
            { text: "Haile Selassie", correct: false },
            { text: "Genghis Khan", correct: false }
        ]
    },
    {
        question: " Which group of African people were skilled seafarers who reached the Americas before Columbus?",
        answers: [
            { text: "The Moors", correct: false },
            { text: "The Carthaginians", correct: false },
            { text: "The Olmec-linked Africans", correct: true },
            { text: "The Nubians", correct: false }
        ]
    },

    {
        question: "Who was the African-American woman whose cells were taken without her knowledge in 1951, leading to significant medical breakthroughs?",
        answers: [
            { text: "Rosa Parks", correct: false },
            { text: "Henrietta Lacks", correct: true },
            { text: "Maya Angelou", correct: false },
            { text: "Oprah Winfrey", correct: false }
        ]
    },

    {
        question: "Which U.S state had a prosperous African-American community in the early 20th century, known as Black Wall Street, before it was destroyed in a racially motivated attack?",
        answers: [
            { text: "Oklahoma", correct: true },
            { text: "Texas", correct: false },
            { text: "Florida", correct: false },
            { text: "New York", correct: false }
        ]
    },

    {
        question: "Who was the African inventor whose contributions to modern electricity were credited to white scientists?",
        answers: [
            { text: "Nikola Tesla", correct: false },
            { text: "Thomas Edison", correct: false },
            { text: "Lewis Latimer", correct: true },
            { text: "George Washington Carver", correct: false }
        ]
    },

    {
        question: "Which African civilization built massive stone cities with advanced architecture that colonizers later claimed were 'too advanced to be African'?",
        answers: [
            { text: "The Kingdom of Kush", correct: false },
            { text: "The Mali Empire", correct: false },
            { text: "The Songhai Empire", correct: false },
            { text: "The Great Zimbabwe", correct: true },
            
        ]
    },
    {
        question: "Who was the leader of the Montgomery Bus Boycott in 1955 that challenged segregation in public transportation?",
        answers: [
            { text: "Rosa Parks", correct: false },
            { text: "Martin Luther King Jr.", correct: true },
            { text: "Malcolm X", correct: false },
            { text: "Frederick Douglass", correct: false }
        ]
    },

    {
        question: "What invention is Garrett A. Morgan known for creating?",
        answers: [
            { text: "The telephone", correct: false },
            { text: "The light bulb", correct: false },
            { text: "The traffic light", correct: true },
            { text: "The airplane", correct: false }
        ]
    },

    {
        question: "Who was the first Black person elected president of South Africa after apartheid?",
        answers: [
            { text: "Desmond Tutu", correct: false },
            { text: "Nelson Mandela", correct: true },
            { text: "Thabo Mbeki", correct: false },
            { text: "Jacob Zuma", correct: false }
        ]
    }
]


// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestions.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// Event Listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);


function startQuiz() {
    //reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    // switch active screen classes
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    // Reset answer container
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Title and counters
    questionTitle.textContent = currentQuestion.question;
    questionNumber.textContent = currentQuestionIndex + 1;

    // Clear previous answers
    answerContainer.innerHTML = '';

    // Create answer buttons
    currentQuestion.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = ans.text;
        // store correctness on dataset for easy access
        btn.dataset.correct = ans.correct;
        btn.addEventListener('click', () => selectAnswer(btn));
        answerContainer.appendChild(btn);
    });

    // Update progress fill if present
    if (progressFill) {
        const percent = (currentQuestionIndex / quizQuestions.length) * 100;
        progressFill.style.width = percent + '%';
    }
}

function restartQuiz() {

}

// Handle answer selection
function selectAnswer(button) {
    if (answersDisabled) return;
    answersDisabled = true;

    const correct = button.dataset.correct === 'true';

    if (correct) {
        score++;
        if (scoreValue) scoreValue.textContent = score;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // highlight the correct answer
        const buttons = answerContainer.querySelectorAll('button');
        buttons.forEach(b => {
            if (b.dataset.correct === 'true') b.classList.add('correct');
        });
    }

    // move to next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 800);
}

function showResults() {
    finalScore.textContent = score;
    // hide quiz screen, show results
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

function restartQuiz() {
    // Reset state and go back to start screen
    currentQuestionIndex = 0;
    score = 0;
    if (scoreValue) scoreValue.textContent = score;
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}