setTimeout(() => {

    const wrapper = document.createElement('div');
    wrapper.id = "bot-interface-wrapper";
    wrapper.classList.add('bot-interface-wrapper');
    document.querySelector('#base').appendChild(wrapper);


    const startBotButton = document.createElement('button');
    startBotButton.id = 'start-bot';
    startBotButton.classList.add('start-bot');
    startBotButton.innerHTML = 'start';

    const $wrapper = document.querySelector('#bot-interface-wrapper');


    $wrapper.appendChild(startBotButton);






    const stopBotButton = document.createElement('button');
    stopBotButton.id = 'stop-bot';
    stopBotButton.classList.add('stop-bot');
    stopBotButton.innerHTML = 'stop';
    $wrapper.appendChild(stopBotButton)

    const eliteBotButtonStart = document.createElement('button');
    eliteBotButtonStart.id = 'elite-bot-start';
    eliteBotButtonStart.classList.add('elite-bot-start');
    eliteBotButtonStart.innerHTML = 'elite bot start';
    $wrapper.appendChild(eliteBotButtonStart);

    const eliteBotButtonStop = document.createElement('button');
    eliteBotButtonStop.id = 'elite-bot-stop';
    eliteBotButtonStop.classList.add('elite-bot-stop');
    eliteBotButtonStop.innerHTML = 'elite bot stop';
    $wrapper.appendChild(eliteBotButtonStop);


    const $buttonstart = document.querySelector('#start-bot');
    const $buttonStop = document.querySelector('#stop-bot');
    const $buttonEliteStart = document.querySelector('#elite-bot-start');


    $buttonstart.addEventListener('click', () => {
        $buttonstart.classList.add('active');
        $buttonStop.classList.remove('active');
    })

    chrome.storage.sync.get(['botStatus'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
        if ( botStats.botStatus ===  true ) {
            startBotButton.classList.add('active');
        } else {
            stopBotButton.classList.add('active');
        }
    });

}, 1500);
