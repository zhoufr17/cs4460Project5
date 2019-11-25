// **** Your JavaScript code goes here ****

var width = 760;
var height = 600;

//main svg
var svg = d3.select(".barchart").append('svg')
.attr("width", width)
.attr("height", height)
.attr("style", "border: 1px solid #777");

//defining scales (X axis)
var regionScaleX = d3.scaleBand()
    .domain(['Central', 'East', 'South', 'West'])
    .rangeRound([50, width/2 - 50]);

var coffeeScaleX = d3.scaleBand()
    .domain(['Coffee', 'Tea', 'Espresso', 'Herbal Tea'])
    .rangeRound([50, width/2 -50]);

var regionScaleY = d3.scaleLinear()
    .range([320, 20])
    .domain([0, 300]);

var coffeeScaleY = d3.scaleLinear()
    .range([320, 20])
    .domain([0, 300]);

//color
var regionColor =d3.scaleOrdinal()
.domain(['Central', 'East', 'South', 'West'])
.range(['#0000FF', '#FFA500', '#008000', '#FF0000'])

var categoryColor = d3.scaleOrdinal()
.domain(['Coffee', 'Espresso', 'Tea', 'Herbal Tea'])
.range(['#4e342f', '#bd6520', '#cd2818', '#beb66c'])

// appending axies
//X
svg.append('g').attr('class', 'y axis')
.attr('transform', 'translate(0, 450)')
.call(d3.axisBottom(regionScaleX));

svg.append('g').attr('class', 'y axis')
.attr('transform', 'translate(400, 450)')
.call(d3.axisBottom(coffeeScaleX));
 
//Y
svg.append('g').attr('class', 'y axis')
.attr('transform', 'translate(50, 130)')
.call(d3.axisLeft(regionScaleY).ticks(5).tickFormat(function(d) {return d + 'k'}));

svg.append('g').attr('class', 'y axis')
.attr('transform', 'translate(450, 130)')
.call(d3.axisLeft(coffeeScaleY).ticks(5).tickFormat(function(d) {return d + 'k'}));



// Titles/Headers
svg.append('text')
.attr('class', 'title')
.attr('transform','translate(100,80)')
.text('Coffee Sales by Region(USD)');

svg.append('text')
.attr('class', 'label')
.attr('transform','translate(480,80)')
.text('Coffee Sales by Product(USD)');

svg.append('text')
.attr('class', 'label')
.attr('transform','translate(15,310) rotate(270)')
.text('Coffee Sales (USD)');

svg.append('text')
.attr('class', 'label')
.attr('transform','translate(395,310) rotate(270)')
.text('Coffee Sales (USD)');

svg.append('text')
.attr('class', 'title')
.attr('transform','translate(150,570)')
.text('Region');

svg.append('text')
.attr('class', 'label')
.attr('transform','translate(530,570)')
.text('Product');



//NOTE: this is the D3 v4 loading syntax. For more details, see https://piazza.com/class/jnzgy0ktwi34lk?cid=75.
d3.csv("./data/coffee_data.csv", function(data){

	// var 

    console.log("LOADING DATA..." + data[0]);
    
    //get region data
    var nestRegion = d3.nest()
            .key(function(d){
                return d.region;
            })
            .rollup(function(d) { 
                return d3.sum(d, function(g) { 
                    return g.sales; 
                }); 
            }).entries(data);

    console.log(nestRegion);

    //get coffee category data
    var nestCategory = d3.nest()
            .key(function(d){
                return d.category;
            })
            .rollup(function(d) { 
                return d3.sum(d, function(g) { 
                    return g.sales; 
                }); 
            }).entries(data);

    console.log(nestCategory);

    var combinedArrays = nestRegion.concat(nestCategory);
    combinedArrays.forEach(function(d) {
        d.value = parseInt(d.value);
    }); 

    var max = d3.max(combinedArrays, function(d) {
        return d.value
    });

    // regionScaleY.domain([max,0])

    // svg.append("g")
    // .attr("transform", "translate(300,0)")
    // .call(d3.axisLeft(regionScaleY).ticks(6).tickFormat(d3.formatPrefix("k", 5000)))

    //nestRegion bars
    svg.selectAll(".bar1")
    .data(nestRegion)
    .enter().append("rect")
    .attr("y", function (d) {return height - (d.value/1000) })
    .attr("height", function (d) {return d.value/ 1000})
    .attr("width", 50)
    .style('fill', function(d){ // Color based on region key
        return regionColor(d.key);
    })
    .attr("transform", function(d,i) {
        var translate = [69 * i + 65, -150];
        return "translate(" + translate + ")";
    });
    
    //nestCategory bars
    svg.selectAll(".bar2")
    .data(nestCategory)
    .enter().append("rect")
    .attr("y", function (d) {return height - (d.value/1000) })
    .attr("height", function (d) {return d.value/ 1000})
    .attr("width", 50)
    .style('fill', function(d){ // Color based on region key
        return categoryColor(d.key);
    })
    .attr("transform", function(d,i) {
        var translate = [69 * i + 465, -150];
        return "translate(" + translate + ")";
    });
})
