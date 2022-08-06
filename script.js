const personagem = document.querySelector('.personagem');
const obstaculo = document.querySelector('.obstaculo');
const flappyOne = document.querySelector('.flappy-bird');
const flappyTwo = document.querySelector('.flappy-bird-2');
const grass = document.querySelector('.grass-m1');
const clouds = document.querySelector('.clouds');
const lose = document.querySelector('.lose');

const localStorageHiscore = JSON.parse(localStorage.getItem('hiscore'));
let hiscore = localStorage.getItem('hiscore') !== null ? localStorageHiscore : 0

var placar = document.querySelector('.pontuacao-number');
var placar_hiscore = document.querySelector('.pontuacao-hiscore');

placar_hiscore.innerHTML = hiscore;

function jump(){

    var number = placar.innerHTML;

    if(number >= 35){
        if(personagem.classList.contains('jump-fast')){

            return;
    
        }else{
    
            personagem.classList.add('jump-fast');
    
            setTimeout(function(){
    
                personagem.classList.remove('jump-fast');
        
            }, 400);
        }
    }else{
        if(personagem.classList.contains('jump')){

            return;
    
        }else{
    
            personagem.classList.add('jump');
    
            setTimeout(function(){
    
                personagem.classList.remove('jump');
        
            }, 500);
        }
    }



}

function resetAnm(){
    obstaculo.style.animation = 'none';
    obstaculo.offsetLeft;
    obstaculo.style.animation = null;
}

var time = 1500;

function score_tmt(){

    const score_interval = setTimeout(function () {

        const obstaculoPosition = obstaculo.offsetLeft;
        const personagemPosition = +window.getComputedStyle(personagem).bottom.replace('px', '');
    
        if (obstaculoPosition <= 120 && obstaculoPosition > 0 && personagemPosition < 45){

            var number = placar.innerHTML;
            
            if(parseInt(number) > parseInt(hiscore)){
                localStorage.setItem('hiscore', JSON.stringify(number));
            }

            clearTimeout(score_interval);
    
        }else{
            
            var number = placar.innerHTML;
            number++;
            placar.innerHTML = number;

            if(number == 5){
                              
                resetAnm();
                time = 1000;                 
                obstaculo.style.animation = "animate-obstaculo 1s infinite linear";
                
            }

            if(number == 15){

                resetAnm();
                time = 800;                           
                obstaculo.style.animation = "animate-obstaculo 800ms infinite linear";
                
            }

            if(number == 25){

                resetAnm();
                time = 600;                          
                obstaculo.style.animation = "animate-obstaculo 600ms infinite linear";
                
            }

            if(number == 35){

                resetAnm();
                time = 500;                                 
                obstaculo.style.animation = "animate-obstaculo 500ms infinite linear";
                
            }

        }

        score_tmt();

    }, time);
};

score_tmt();

const loop = setInterval(function(){

    const obstaculoPosition = obstaculo.offsetLeft;
    const personagemPosition = +window.getComputedStyle(personagem).bottom.replace('px', '');
    const cloudsPosition = clouds.offsetLeft;
    const flappyOnePosition = flappyOne.offsetLeft;
    const flappyTwoPosition = flappyTwo.offsetLeft;

    if (obstaculoPosition <= 120 && obstaculoPosition > 0 && personagemPosition < 45){

        obstaculo.style.animation = 'none';
        obstaculo.style.left = `${obstaculoPosition}px`;

        personagem.style.animation = 'none';
        personagem.style.bottom = `${personagemPosition}px`;

        obstaculo.src = 'static-k.png';
        personagem.src = 'static-p.png';
        personagem.classList.add('die');

        clouds.style.animation = 'none';
        flappyOne.style.animation = 'none';
        flappyTwo.style.animation = 'none';
        grass.style.animation = 'none';

        clouds.style.left = `${cloudsPosition}px`;
        flappyOne.style.left = `${flappyOnePosition}px`;
        flappyTwo.style.left = `${flappyTwoPosition}px`;

        clearInterval(loop);

        audio.pause();
        
        lose.style.display = 'block';

        var lost = new Audio('lose.mp3');
        lost.play();
    }

}, 10);

document.addEventListener('click', jump);