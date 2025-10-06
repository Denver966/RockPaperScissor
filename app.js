let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll('.choice');
const meg = document.querySelector('#msg');

const userScorePara = document.querySelector('#user-score')
const compScorePara = document.querySelector('#comp-score')

const genCompChoice = ()=>{
    const options = ['rock', 'paper', 'scissor']
    const ranIdx = Math.floor(Math.random() * 3)
    return options[ranIdx]
}

const drawGame = ()=>{
    meg.innerText = 'Game Was Draw. Play again.'
        meg.style.backgroundColor = '#081b31';
}

const showWinner = (userWin, userChoice, compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        meg.innerText = `You Win! Your ${userChoice} Beats ${compChoice}`
        meg.style.backgroundColor = 'green';
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        meg.innerText = `You Lose ${compChoice} Beats Your ${userChoice}`
        meg.style.backgroundColor = 'red';
    }

}
const playGame = (userChoice) =>{
    const compChoice = genCompChoice();
    if(userChoice === compChoice){
        drawGame();
    }else{
        let userWin = true;
        if(userChoice === 'rock'){
           userWin = compChoice === 'paper' ? false : true
        }else if(userChoice === 'paper'){
           userWin = compChoice === 'scissor' ? false : true;
        }else{
           userWin = compChoice === 'rock' ? false : true;
        }
        showWinner(userWin, userChoice, compChoice)
    }
}

choices.forEach((choices) =>{
    choices.addEventListener('click', ()=>{
        const userChoice = choices.getAttribute('id');
        playGame(userChoice);
    })
})