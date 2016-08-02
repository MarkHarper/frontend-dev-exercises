import 'main.css'
import {stackedBar} from './charts/stackedBar.js'
import data from './census.csv'

let options1 = {
    margin: { top: 20, 
        right: 60, 
        bottom: 30, 
        left: 40
    },
    width: 856,
    height: 426,
    attr: 'education_level',
    a: 'over_50k',
    b: 'under_50k'
}

// filter data for education level
let filteredForEdu = filterForAttr(data, options1); 

// arrange data in order for education level
let eduData = [];
eduData.push(filteredForEdu['Did not complete high school']);
eduData.push(filteredForEdu['High school']);
eduData.push(filteredForEdu['Some college']);
eduData.push(filteredForEdu['Associates']);
eduData.push(filteredForEdu['Bachelors']);
eduData.push(filteredForEdu['Masters']);
eduData.push(filteredForEdu['Doctorate']);
eduData.push(filteredForEdu['Professional school']);

stackedBar('.edu-bar', eduData, options1);

// filter data for attribute
function filterForAttr (data, options) {
    let obj = {};
    data.forEach(function(el, i, arr) {
        if (obj[el[options.attr]]) {
            if (el[options.a] === '1') {
                obj[el[options.attr]][options.a]++;
            } else {
                obj[el[options.attr]][options.b]++;
            }
        } else {
            obj[el[options.attr]] = {};
            obj[el[options.attr]].name = el[options.attr]
            obj[el[options.attr]][options.a] = el[options.a] === '1' ? 1 : 0;
            obj[el[options.attr]][options.b] = el[options.a] === '1' ? 1 : 0;
        }
    });
    return obj;
}