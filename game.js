const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "O que é vitelo em Embriologia?",
        choice1: "Área de estudo acerca das plantas.",
        choice2: "Substância nutritiva presente no ovo que ajuda no desenvolvimento inicial do embrião.",
        choice3: "Uma membrana fina e externa ao osso que os envolve por completo.",
        choice4: "Unidade celular relacionada a síntese de lipídios e carboidratos.",
        answer: 2,
    },
    {
        question: "Em qual cidade está localizado o prédio mais alto do mundo?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shanghai",
        choice4: "Nenhuma das anteriores",
        answer: 1,
    },
    {
        question: "Que artista pintou o teto da Capela Sistina em Roma?",
        choice1: "Edvard Munch",
        choice2: "Frida Kahlo",
        choice3: "Michelangelo",
        choice4: "Sandro Botticelli",
        answer: 3,
    },
    {
        question: "Quantas casas decimais tem o número pi?",
        choice1: "Infinitas",
        choice2: "Duas",
        choice3: "Centenas",
        choice4: "Vinte",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()



