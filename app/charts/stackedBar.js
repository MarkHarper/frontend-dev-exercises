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
        .attr('height', options.height + margin.top + margin.bottom)
        .attr('width', options.width + margin.left + margin.right);

    let xScale = d3.scaleLinear()
        .rangeRound([0, width]);

    let yScale = d3.scaleBand()
        .rangeRound([height, 0])
        .padding(0.1)
        .align(0.1);

    let color = d3.scaleOrdinal()
        .range(['#9AC0DA', '#F99990']);

    var stack = d3.stack()
        .offset(d3.stackOffsetExpand);
        
    // set the yScale to focus on the desired data attribute
    yScale.domain(data.map(function (d) {
        return d.name;
    }));

    // provide the color scale with the two options (over 50, below 50)
    color.domain([options.a, options.b]);

    // append a series and set the color
    // stack reorganizes the data for a series
    var serie = g.selectAll(".serie")
        .data(stack.keys([options.a, options.b])(data))
        .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function(d) { 
            return color(d.key);
        })

    serie.selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("y", function(d) { 
                return yScale(d.data.name); 
            })
            .attr("x", function(d) { 
                return xScale(d[0]); 
            })
            .attr("width", function(d) { 
                return xScale(d[1]) - xScale(d[0]); 
            })
            .attr("height", yScale.bandwidth());
    
    // Axes
    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (parseInt(height) - 10) + ")")
        .call(d3.axisBottom(xScale).ticks(10, "%"));

    // Legend
    var legend = g.selectAll(".legend")
        .data([options.b, options.a])
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { 
            return "translate(0," + i * 21 + ")"; 
        })
        .style("font", "10px sans-serif");

    legend.append("rect")
        .attr("x", width + 10)
        .attr("y", 1)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", color);

    legend.append("text")
        .attr("x", width + 40)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("text-anchor", "left")
        .text(function(d) { 
            return d; 
        });
}
