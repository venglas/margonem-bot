import checkIsGameLoaded from '../checkIsGameLoaded';
import add_bot_interface from './add_bot_interface';
import change_fight_window from '../appearance_features/change_fight_window';

const exp_bot = () => {
    const exp_bot_data = {
        is_game_loaded: false
    };

    const interval = setInterval(() => {
        if ( checkIsGameLoaded() === true ){
            exp_bot_data.is_game_loaded = true;
            console.log('Game loaded.');
            
            //here should be bot code
            add_bot_interface();
            change_fight_window();

            clearInterval(interval);
        }
    }, 1000);
};


export default exp_bot;