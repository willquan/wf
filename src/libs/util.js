import axios from 'axios';
import env from '../config/env';
let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iview project';
    window.document.title = title;
};

function rnd(n, m){
    var random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}

util.setAutoId = function(data) {
    data.id = rnd(1, 100000);
}
export default util;