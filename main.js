var width =500;
var height= 500;

d3.csv("calvinCollegeSeniorScores.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
		csv[i].GPA = Number(csv[i].GPA);
		csv[i].SATM = Number(csv[i].SATM);
		csv[i].SATV = Number(csv[i].SATV);
		csv[i].ACT = Number(csv[i].ACT);
    }
    var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
    var satvExtent = d3.extent(csv, function(row) { return row.SATV; });
    var actExtent = d3.extent(csv,  function(row) { return row.ACT;  });
    var gpaExtent = d3.extent(csv,  function(row) {return row.GPA;   });    

    
    var satExtents = {
	"SATM": satmExtent,
	"SATV": satvExtent
	}; 
	
	var resultExtents = {
	"ACT": actExtent,
	"GPA": gpaExtent
	}

	var satmResult = d3.select('#satm');
	var satvResult = d3.select('#satv');
	var actResult = d3.select('#act');
	var gpaResult = d3.select('#gpa');

    // Axis setup
    var xScale = d3.scaleLinear().domain(satmExtent).range([50, 470]);
    var yScale = d3.scaleLinear().domain(satvExtent).range([470, 30]);
 
    var xScale2 = d3.scaleLinear().domain(actExtent).range([50, 470]);
    var yScale2 = d3.scaleLinear().domain(gpaExtent).range([470, 30]);
     
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
  
    var xAxis2 = d3.axisBottom().scale(xScale2);
    var yAxis2 = d3.axisLeft().scale(yScale2);

    //Create SVGs for charts
    var chart1 = d3.select("#chart1")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);


    var chart2 = d3.select("#chart2")
	                .append("svg:svg")
	                .attr("width",width)
	                .attr("height",height);


	 /******************************************
		
		ADD BRUSHING CODE HERE

	 ******************************************/

	var isChart1 = false;
	var isChart2 = false;

	var brush = d3.brush()
		.extent([[0, 0], [width, height]])
		.on("start", handleBrushStart1)
		.on("brush", handleBrushMove1)
		.on("end", handleBrushEnd);
	 
	var brushCell1 = chart1.append('g')
		.attr('class', 'brush')
		.call(brush)
		.on("click", function(d,i) {
			satmResult.text("");
			satvResult.text("");
			actResult.text("");
			gpaResult.text("");
		});

	
	// Clear the previously-active brush, if any.
	function handleBrushStart1() {
		// chart1.selectAll("circle").classed('selected2', false);
		// chart2.selectAll("circle").classed('selected', false);
		// brush.move(d3.selectAll('.brush'), null); 
		satmResult.text("");
		satvResult.text("");
		actResult.text("");
		gpaResult.text("");
		if (!isChart1) {
			brushCell2.call(brush2.move, null);
			isChart1 = true;
			isChart2 = false;
		}
	}


	// Highlight the selected circles.
	function handleBrushMove1() {
		console.log("brushing now");
		var selection = d3.event.selection
		// console.log(selection);
		// If the selection is non-empty, get the boundaries of the rectangle
		if (selection) {
			var [[left, top], [right, bottom]] = selection;
			// console.log(left);
			// console.log(bottom);
			
			chart2.selectAll("circle")
				.classed('selected2', function(d) {
					console.log("Got here");
					var x = xScale([d["SATM"]]);
					var y = yScale(d["SATV"]);
					// Hide the dots that are outside of the selected area
					return (left <= x && x <= right && top <= y && y <= bottom);
			});
		}
	}

	
	// If the brush is empty, select all circles.
	function handleBrushEnd() {
		console.log("Ending brushing");
		if (d3.event.selection !== null) return;
			chart2.selectAll("circle")
				.classed('selected2', false);
				chart1.selectAll("circle")
				.classed('selected', false);
			isChart2 = false;
			isChart1 = false;
	}

///////////////////////////////////////////////////////////////////////////////////////////////////

	var brush2 = d3.brush()
		.extent([[0, 0], [width, height]])
		.on("start", handleBrushStart2)
		.on("brush", handleBrushMove2)
		.on("end", handleBrushEnd);
	

	var brushCell2 = chart2.append('g')
			.attr('class', 'brush2')
			.call(brush2)
			.on("click", function(d,i) {
				satmResult.text("");
				satvResult.text("");
				actResult.text("");
				gpaResult.text("");
			});   

	// Clear the previously-active brush, if any.
	function handleBrushStart2() {		
		satmResult.text("");
		satvResult.text("");
		actResult.text("");
		gpaResult.text("");

		if (!isChart2) {
			brushCell1.call(brush.move, null);
			isChart2 = true;
			isChart1 = false;
		}
	}
	

	// Highlight the selected circles.
	function handleBrushMove2() {
		console.log("brushing now");
		var selection = d3.event.selection
		if (selection) {
			var [[left, top], [right, bottom]] = selection;

			chart1.selectAll("circle")
				.classed('selected', function(d) {
					console.log("Got here2");
					var x = xScale2(d["ACT"]);
					var y = yScale2(d["GPA"]);
					// Hide the dots that are outside of the selected area
					// console.log(x);
					// console.log(y);
					return (left <= x && x <= right && top <= y && y <= bottom);
			});
		}
	}


	/////////////////////////////////////////////////////////////////////////////////

	 //add scatterplot points
     var temp1= chart1.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale(d.SATM); })
	   .attr("cy", function(d) { return yScale(d.SATV); })
	   .attr("r", 5)
	   .on("click", function(d,i){ 
			d3.selectAll("circle")
				// .style("fill", "none");
				// .style("fill", "black");
				.classed("selected2", false);


		   var index = i;
		   var circles = chart2.selectAll("circle")
					.filter(function(d,i) {
					return i == index;
				});

			console.log(circles);
			// circles.style("fill", "orange");
			circles.classed('selected2', true);
			satmResult.text(d.SATM);
			satvResult.text(d.SATV);
			actResult.text(d.ACT);
			gpaResult.text(d.GPA);
       });

    var temp2= chart2.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale2(d.ACT); })
	   .attr("cy", function(d) { return yScale2(d.GPA); })
	   .attr("r", 5)
	   .on("click", function(d,i){ 
			d3.selectAll("circle")
				.classed('selected', false);
			var index = i;
			var circles = chart1.selectAll("circle")
					.filter(function(d,i) {
					return i == index;
				});
				console.log(circles);
			// circles.style("fill", "red");
			circles.classed('selected', true);
			satmResult.text(d.SATM);
			satvResult.text(d.SATV);
			actResult.text(d.ACT);
			gpaResult.text(d.GPA);
       });
    


    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis);
	chart1 // call the axis generator
		.append("text")
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", height - 35)
		.style("text-anchor", "end")
		.text("SATM");


    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis);
	chart1
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 60)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("SATV");



    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis2);

	chart2
		.append("text")
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", height - 35)
		.style("text-anchor", "end")
		.text("ACT");


    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis2);
	chart2
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("GPA");

	});
