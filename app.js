const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _nextBtn = document.getElementById('next-question');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 20;

const questions = [
    {
        question: "1. What is the capital of France?",
        options: [
            "Berlin",
            "Madrid",
            "Paris",
            "Lisbon"
        ],
        correct: "Paris"
    },
    {
        question: "2. What is the capital of Japan?",
        options: [
            "Beijing",
            "Seoul",
            "Tokyo",
            "Bangkok"
        ],
        correct: "Tokyo"
    },
    {
        question: "3. What is the capital of Australia?",
        options: [
            "Sydney",
            "Canberra",
            "Melbourne",
            "Brisbane"
        ],
        correct: "Canberra"
    },
    {
        question: "4. What is the capital of Canada?",
        options: [
            "Toronto",
            "Vancouver",
            "Ottawa",
            "Montreal"
        ],
        correct: "Ottawa"
    },
    {
        question: "5. What is the capital of Brazil?",
        options: [
            "Buenos Aires",
            "Lima",
            "Brasília",
            "Rio de Janeiro"
        ],
        correct: "Brasília"
    },
    {
        question: "6. What is the capital of India?",
        options: [
            "Mumbai",
            "New Delhi",
            "Kolkata",
            "Chennai"
        ],
        correct: "New Delhi"
    },
    {
        question: "7. What is the capital of Germany?",
        options: [
            "Munich",
            "Berlin",
            "Frankfurt",
            "Hamburg"
        ],
        correct: "Berlin"
    },
    {
        question: "8. What is the capital of Russia?",
        options: [
            "Saint Petersburg",
            "Moscow",
            "Kazan",
            "Novosibirsk"
        ],
        correct: "Moscow"
    },
    {
        question: "9. What is the capital of South Korea?",
        options: [
            "Seoul",
            "Pyongyang",
            "Busan",
            "Incheon"
        ],
        correct: "Seoul"
    },
    {
        question: "10. What is the capital of Italy?",
        options: [
            "Venice",
            "Milan",
            "Rome",
            "Naples"
        ],
        correct: "Rome"
    },
    {
        question: "11. What is the capital of Egypt?",
        options: [
            "Alexandria",
            "Cairo",
            "Giza",
            "Luxor"
        ],
        correct: "Cairo"
    },
    {
        question: "12. What is the capital of China?",
        options: [
            "Shanghai",
            "Beijing",
            "Hong Kong",
            "Guangzhou"
        ],
        correct: "Beijing"
    },
    {
        question: "13. What is the capital of Mexico?",
        options: [
            "Guadalajara",
            "Monterrey",
            "Mexico City",
            "Tijuana"
        ],
        correct: "Mexico City"
    },
    {
        question: "14. What is the capital of the United States?",
        options: [
            "New York",
            "Washington, D.C.",
            "Los Angeles",
            "Chicago"
        ],
        correct: "Washington, D.C."
    },
    {
        question: "15. What is the capital of Argentina?",
        options: [
            "Buenos Aires",
            "Santiago",
            "Lima",
            "Bogotá"
        ],
        correct: "Buenos Aires"
    },
    {
        question: "16. What is the capital of Turkey?",
        options: [
            "Istanbul",
            "Ankara",
            "Izmir",
            "Antalya"
        ],
        correct: "Ankara"
    },
    {
        question: "17. What is the capital of Saudi Arabia?",
        options: [
            "Jeddah",
            "Mecca",
            "Riyadh",
            "Medina"
        ],
        correct: "Riyadh"
    },
    {
        question: "18. What is the capital of South Africa?",
        options: [
            "Cape Town",
            "Johannesburg",
            "Pretoria",
            "Durban"
        ],
        correct: "Pretoria"
    },
    {
        question: "19. What is the capital of Thailand?",
        options: [
            "Bangkok",
            "Phuket",
            "Chiang Mai",
            "Pattaya"
        ],
        correct: "Bangkok"
    },
    {
        question: "20. What is the capital of Spain?",
        options: [
            "Barcelona",
            "Madrid",
            "Seville",
            "Valencia"
        ],
        correct: "Madrid"
    }
];

// load question from local list
function loadQuestion() {
    _result.innerHTML = "";
    showQuestion(questions[askedCount]);
}

// event listeners
function eventListeners() {
    _checkBtn.addEventListener('click', checkAnswer);
    _nextBtn.addEventListener('click', loadNextQuestion);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});

// display question and options
function showQuestion(data) {
    _checkBtn.style.display = 'block';
    _nextBtn.style.display = 'none';
    _checkBtn.disabled = false;
    correctAnswer = data.correct;
    let optionsList = data.options;
    
    _question.innerHTML = `${data.question}`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}

// options selection
function selectOption() {
    _options.querySelectorAll('li').forEach(function (option) {
        option.addEventListener('click', function () {
            if (_options.querySelector('.selected')) {
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// answer checking
function checkAnswer() {
    _checkBtn.style.display = 'none';
    _nextBtn.style.display = 'block';
    _checkBtn.disabled = true;
    if (_options.querySelector('.selected')) {
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if (selectedAnswer === HTMLDecode(correctAnswer)) {
            correctScore++;
            _result.innerHTML = `<p><i class="fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class="fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        setCount();
    } else {
        _result.innerHTML = `<p><i class="fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.style.display = 'block';
        _nextBtn.style.display = 'none';
        _checkBtn.disabled = false;
    }
}

// to convert HTML entities into normal text of correct answer if there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function loadNextQuestion() {
    askedCount++;
    _checkBtn.style.display = 'block';
    _nextBtn.style.display = 'none';
    if (askedCount < questions.length) {
        loadQuestion();
    } else {
        _result.innerHTML = `<p>Your score is ${correctScore} out of ${totalQuestion}.</p>`;
        _playAgainBtn.style.display = 'block';
        _checkBtn.style.display = 'none';
    }
}

function setCount() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function restartQuiz() {
    correctScore = askedCount = 0;
    _playAgainBtn.style.display = "none";
    _checkBtn.style.display = "block";
    _nextBtn.style.display = 'none';
    _checkBtn.disabled = false;
    setCount();
    loadQuestion();
}

// Load the first question and set event listeners when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});
