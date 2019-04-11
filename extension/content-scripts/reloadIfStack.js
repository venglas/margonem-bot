// const coordinates = {
//     old: getCoordinates(),
//     active: getCoordinates()
// }

// function getCoordinates(){
//     return document.querySelector('#botloc').innerHTML;
// }

// function updateOldCoordinates(){
//     coordinates.old = getCoordinates();
// }

// function updateActiveCoordinates(){
//     coordinates.active = getCoordinates();
// }

// function updateCoordinates() {
//     setInterval(() => {
//         updateOldCoordinates();
//     }, 10000);

//     setInterval(() => {
//         updateActiveCoordinates();
//         // console.log(coordinates)
//     }, 3731);
// }

// function reload (message) {
//     console.log(message)
//     window.location.reload();
// }

// function checkCoordinates(){
//     chrome.storage.sync.get(['botStatus'], (botStats) => {
//         if( botStats.botStatus === true && coordinates.old === coordinates.active ){
//             reload('Reload beacuse your hero is stuck.');
//         }
//     });
// }

// function isDead(){
//     if (document.querySelector('#dazed').style.display == "block"){
//         return true;
//     } else {
//         return false;
//     }
// }

// function init_reloading() {
//     updateCoordinates();


//     setInterval(() => {
//         checkCoordinates();
//     }, 15000);

//     setInterval(() => {
        
//         chrome.storage.sync.get(['botStatus'], (bot) => {
//             if (isDead() === true && bot.botStatus === true){
//                 document.querySelector('#logoutbut').click();
//             }
//         });
        
//     }, 45000);

// }

function checkLoading() {
    let interval = setInterval(() => {
        const loading_el = document.querySelector('#loading');
        
        if ( loading_el.style.display === '' ) {
            console.log('loading')
        } else if (loading_el.style.display === 'none') {
            // init_reloading();
            tests();
            clearInterval(interval);
        }
    }, 1500);
}

checkLoading();

function tests(){
    const data = {
        coordinates_old: document.querySelector('#botloc').innerHTML,
        coordinates_active: document.querySelector('#botloc').innerHTML,
        distance: 0
    }

    setInterval(() => {
        coordinates_old = document.querySelector('#botloc').innerHTML;
    }, 1331);

    setInterval(() => {
        data.coordinates_active = document.querySelector('#botloc').innerHTML;
    }, 888);

    setInterval(() => {
        // checkWalking(data.coordinates_old, data.coordinates_active, data.distance, data);
        if (data.coordinates_old !== data.coordinates_active){
            data.distance+=1;
            console.log('Distance: ', data)
        }
    }, 2450);
}

function checkWalking(coordinates_old, coordinates_active, distance, dataV){
    if (coordinates_old !== coordinates_active){
        distance+=1;
        console.log('Distance: ', dataV)
    }
}