setTimeout(() => {
  // document.querySelectorAll('.mmp-gw'); przejscia. 0 element powinien byc wyjsciem (przejscia z minimapy)

  function goToMob(){
    if( document.querySelectorAll('.mmp-mob')[0] ){
      document.querySelectorAll('.mmp-mob')[0].click();
    } else {
      console.log('Here is not mob');
      document.querySelectorAll('.mmp-gw')[document.querySelectorAll('.mmp-gw').length-1].click();
    }
  }

  function attackMob(){
    setTimeout(() => {
      document.querySelectorAll('.npc')[0].click();
    }, 1500);
  }

  function autoFight(){
    setInterval(() => {
      document.querySelector('#autobattleButton').click(); 
    }, 2000);
  }

  function closeFight(){
    setInterval(() => {
        if ( document.querySelector('#battleclose') ) {
          document.querySelector('#battleclose').click();
        }
    }, 2500);
  }

  function checkHeroPosition(){
    const MyHero = document.querySelector('.mmp-hero');
    const mob = document.querySelectorAll('.mmp-mob')[0];
    const stepLength = 20; // px

    let interval = setInterval(() => {

      if( mob ){

        if ( 
          parseInt( MyHero.style.top.split(/[px .]/)[0] ) >= parseInt( mob.style.top.split(/[px .]/)[0] ) - stepLength 
              &&
          parseInt( MyHero.style.top.split(/[px .]/)[0] ) <= parseInt( mob.style.top.split(/[px .]/)[0] ) + stepLength
              &&
          parseInt( MyHero.style.left.split(/[px .]/)[0] ) >= parseInt( mob.style.left.split(/[px .]/)[0] ) - stepLength
              &&
          parseInt( MyHero.style.left.split(/[px .]/)[0] ) <= parseInt( mob.style.left.split(/[px .]/)[0] ) + stepLength
        ) {
          console.log('attack')
          clearInterval(interval);

          attackMob();
        }

      }
        
    }, 2000);
  }

  function GoToMobAndAttack(){
    goToMob();
    checkHeroPosition();
  }

  function bot(){
    autoFight();
    closeFight();
    

    let interval = setInterval(() => {
      GoToMobAndAttack();
    }, 5000);
  }


  let data = {
    'botStatus': true
  };

  chrome.storage.sync.set(data, function (){
    console.log('exp ')
  });


  document.querySelector('#nick').addEventListener('click', ()=>{

    chrome.storage.sync.get(['botStatus'], (botStats) => {
      console.log(botStats.botStatus)
    })

    chrome.storage.sync.get(['botStatus'], (botStats) => { // pobieranie wartosci total i limit z chrome storage do obiektu budget i wyswietlanie go
      if ( botStats.botStatus === true ) {
        console.log('Start Bot.')
        bot();

        let data = {
          'botStatus': false
        };
    
        chrome.storage.sync.set(data, function (){
          console.log('next bot stop.')
        });


      } else {
        console.log('Stop Bot.');
        window.location.reload();
      }
    });
    
  });
}, 1500);