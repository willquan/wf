import axios from 'axios';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iview project';
    window.document.title = title;
};

export default util;