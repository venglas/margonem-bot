function heroPositon(){
    const hero = document.querySelector('.mmp-hero');
    
    const coord = {
        x: parseInt( hero.style.left.split(/[. px]/)[0] ), // hero left on minimap
        y: parseInt( hero.style.top.split(/[. px]/)[0] )
    }
    return coord;
}

function mini_map(){
    const map = {
        width: parseInt( document.querySelector('.mmpMap').style.width.split(/[. px]/)[0] ),
        heigh: parseInt( document.querySelector('.mmpMap').style.height.split(/[. px]/)[0] )
    }
    return map;
}

function createRange() {
    const hero = heroPositon();
    const map = mini_map();

    const range = {
        left: hero.x - map.width / 8,
        top: hero.y - map.heigh / 10,
        right: hero.x + map.width / 8,
        bottom: hero.y + map.heigh / 10
    }
    return range;
}

function addRangeToMap(){
    const map = mini_map();
    const mapEl = document.querySelector('.mmpMap');
    const range = createRange();

    const rangeItem = document.createElement('div');
    rangeItem.id="range";
    rangeItem.style.width = `${(map.width / 8 )* 2}px`;
    rangeItem.style.height = `${(map.heigh / 10 )* 2}px`;
    rangeItem.style.backgroundColor = "rgba(65, 150, 235, .6)"
    mapEl.appendChild(rangeItem);
}