// load styles dependency
require('./public/css/main.css');

import {User} from '../common/entities';

const u = new User('John Smith', 'M');

// this will be executed in browser
console.log('User: ', u);
