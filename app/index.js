import 'main.css'
import {stackedBar} from './charts/stackedBar.js'
import data from './census.csv'

let options = {
    margin: { top: 20, 
        right: 60, 
        bottom: 30, 
        left: 40
    }
}

stackedBar('.edu-bar', data, options);