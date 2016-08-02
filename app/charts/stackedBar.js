import * as d3 from 'd3';

// stacked bar chart creator
export function stackedBar (el, data, options) {
    let svg = d3.select(el),
    margin = options.margin,
    width = options.width - margin.left - margin.right,
    height = options.height - margin.top - margin.bottom,
    g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // setup svg height and width
    svg
        .attr('height', options.height)
        .attr('width', options.width);

    let xScale = d3.scaleLinear()
        .rangeRound([0, options.width]);

    let yScale = d3.scaleBand()
        .rangeRound([options.height, 0]);

    let color = d3.scaleOrdinal()
        .range(['#9AC0DA', '#F99990']);
        
    // set the yScale to focus on the desired data attribute
    yScale.domain(data.map(function (d) {
        return d.name;
    }));

    color.domain();

    console.log(data);
}