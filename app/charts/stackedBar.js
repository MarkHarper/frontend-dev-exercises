import * as d3 from 'd3';

// stacked bar chart creator
export function stackedBar (el, data, options) {
    var svg = d3.select(el),
    margin = options.margin,
    width = options.width - margin.left - margin.right,
    height = options.height - margin.top - margin.bottom;

    console.log(data);
}