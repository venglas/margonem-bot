checkIsGameLoaded();

function checkIsGameLoaded() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
        } else if (loading_el.style.display === 'none') {
            init_config();
            clearInterval(interval);
        }
    }, 1000);
}

function init_config () {
    getBotStatus();
    openConfiguration();
    setMiniMapConfig(10);

    setTimeout(() => {
        if (bot_status == true){
            if (checkIfAutoPassingPortalsIsOn() === false) {
                TurnOffAutoPassingPortals();
                saveConfiguration();
            } else {
                closeConfiguration();
            }
        } else {
            if (checkIfAutoPassingPortalsIsOn() === true){
                TurnOffAutoPassingPortals();
                saveConfiguration();
            } else {
                closeConfiguration();
            }
        }
    }, 200);
}

function openConfiguration() {
    document.querySelector('#b_config').click();
    
}

function closeConfiguration() {
    setTimeout(() => {
        document.querySelector('.cancel').click();
    }, 200);
}

function TurnOffAutoPassingPortals() {
    setTimeout(() => {
        document.querySelector('#opt12').click();    
    }, 200);
}

function saveConfiguration() {
    setTimeout(() => {
        document.querySelector('.save').click();
    }, 200);
}

function checkIfAutoPassingPortalsIsOn(){
    if (document.querySelector('#opt12').style.backgroundPosition === '0px 0px') {
        return false
    } else {
        return true
    }
}

let bot_status;
function getBotStatus() {
    chrome.storage.sync.get(['botStatus'], (bot) => {
        if (bot.botStatus === false){
            bot_status = false;
        } else {
            bot_status = true;
        }
    });
}

// minimap config:
function toggleMiniMapConfig(display){
    document.querySelector('.ns-wrapper').style.display = display;
}

function showMiniMapConfig(){
    toggleMiniMapConfig('block');
    document.querySelector('.ns-lpanel-entry[data-name="Inne"]').click();
}

function setMinMobLvl(lvl){
    //here should be loading specyfic data based on player nickname and set lvl of mobs
    //min lvl of mobs should be get from minimap or popup ('better way')
    document.querySelector('input[data-key="/minlvl"]').value = lvl;
}

function saveMiniMapConfig(){
    document.querySelector('.ns-save-button').click();
    toggleMiniMapConfig('none')
}

function setMiniMapConfig(lvl){
    showMiniMapConfig();
    setMinMobLvl(lvl);
    saveMiniMapConfig();
}