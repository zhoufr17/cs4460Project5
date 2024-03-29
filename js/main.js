var width =500;
var height= 500;

d3.csv("./data/movies.csv", function(csv) {
    for (var i=0; i<csv.length; ++i) {
		// Numbers
			//general movie metrics
			csv[i].duration = Number(csv[i].duration);
			csv[i].gross = Number(csv[i].gross);
			csv[i].budget = Number(csv[i].budget);
			csv[i].title_year = Number(csv[i].title_year);
			csv[i].imdb_score = Number(csv[i].imdb_score);
			csv[i].aspect_ratio = Number(csv[i].aspect_ratio);

			csv[i].num_voted_users = Number(csv[i].num_voted_users);
			csv[i].facenumber_in_poster = Number(csv[i].facenumber_in_poster);
			csv[i].num_user_for_reviews = Number(csv[i].num_user_for_reviews);
			csv[i].num_critic_for_reviews = Number(csv[i].duration);

			//facebook likes
			csv[i].director_facebook_likes = Number(csv[i].director_facebook_likes);
			csv[i].actor_1_facebook_likes = Number(csv[i].actor_1_facebook_likes);
			csv[i].actor_2_facebook_likes = Number(csv[i].actor_3_facebook_likes);
			csv[i].actor_3_facebook_likes = Number(csv[i].actor_3_facebook_likes);
			csv[i].cast_total_facebook_likes = Number(csv[i].cast_total_facebook_likes);
			csv[i].movie_facebook_likes = Number(csv[i].movie_facebook_likes);

		// Strings
			csv[i].director_name = String(csv[i].director_name).trim();
			csv[i].actor_1_name = String(csv[i].actor_1_name).trim();
			csv[i].actor_2_name = String(csv[i].actor_2_name).trim();
			csv[i].actor_3_name = String(csv[i].actor_3_name).trim();

			csv[i].color = String(csv[i].color).trim();
			csv[i].genres = String(csv[i].genres).trim();
			csv[i].movie_title = String(csv[i].movie_title).trim();
			csv[i].plot_keywords = String(csv[i].plot_keywords).trim();
			csv[i].movie_imdb_link = String(csv[i].movie_imdb_link).trim();
			csv[i].language = String(csv[i].language).trim();
			csv[i].country = String(csv[i].country).trim();
			csv[i].content_rating = String(csv[i].content_rating).trim();
			csv[i].num_critic_for_reviews = String(csv[i].num_critic_for_reviews).trim();


		// console.log("Got here");
		// console.log(csv[i].movie_imdb_link);
	}

	var actor_1_facebook_likesExtent = d3.extent(csv, function(row) {return row.actor_1_facebook_likes});
	var actor_2_facebook_likesExtent = d3.extent(csv, function(row) {return row.actor_2_facebook_likes});
	var actor_3_facebook_likesExtent = d3.extent(csv, function(row) {return row.actor_3_facebook_likes});
	
	var director_name = d3.extent(csv, function(row) {return row.director_name});
	var actor_1_name = d3.extent(csv, function(row) {return row.actor_1_name});
	var actor_2_name = d3.extent(csv, function(row) {return row.actor_2_name});
	var actor_3_name = d3.extent(csv, function(row) {return row.actor_3_name});

	var title_yearExtent = d3.extent(csv, function(row) {return row.title_year});
	var aspect_ratioExtent = d3.extent(csv, function(row) {return row.aspect_ratio});
	var num_voted_usersExtent = d3.extent(csv, function(row) {return row.num_voted_users});
	var facenumber_in_posterExtent = d3.extent(csv, function(row) {return row.facenumber_in_poster});
	var num_user_for_reviewsExtent = d3.extent(csv, function(row) {return row.num_user_for_reviews});
	var num_critic_for_reviewsExtent = d3.extent(csv, function(row) {return row.num_critic_for_reviews});
	//Filters
	var movieResult = d3.select('#movieName');
	var aspectResult = d3.select('#aspectRatio');
	var imdbLinkResult = d3.select('#imdbLink');
	var directorResult = d3.select('#directorName');
	var actor1Result = d3.select('#actor1Name');
	var actor2Result = d3.select('#actor2Name');
	var actor3Result = d3.select('#actor3Name');

	var userReviewResult = d3.select('#userReviews');
	var criticReviewResult = d3.select('#criticReviews');
	var grossResult = d3.select('#gross');
	var imdbScoreResult = d3.select('#imdbScore');
	var movieFLikesResult = d3.select('#movieFLikes');
	var budgetResult = d3.select('#budget');
	var directorFLikesResult = d3.select('#directorFLikes');
	var durationResult = d3.select('#duration');


	// Graph 1
	var grossExtent = d3.extent(csv, function(row) {return row.gross});
	// console.log("Got here");
	// console.log(grossExtent);
	var imdb_scoreExtent = d3.extent(csv, function(row) {return row.imdb_score});

	// Graph 2
	var movie_facebook_likesExtent = d3.extent(csv, function(row) {return row.movie_facebook_likes});
	var budgetExtent = d3.extent(csv, function(row) {return row.budget});

	// Graph 3
	var durationExtent = d3.extent(csv, function(row) {return row.duration});
	var director_facebook_likesExtent = d3.extent(csv, function(row) {return row.director_facebook_likes});




    // Axis setup
    var xScale = d3.scaleLinear().domain(imdb_scoreExtent).nice().range([50, 470]);
    var yScale = d3.scaleLinear().domain(grossExtent).nice().range([470, 30]);
 
    var xScale2 = d3.scaleLinear().domain(budgetExtent).nice().range([50, 470]);
	var yScale2 = d3.scaleLinear().domain(movie_facebook_likesExtent).nice().range([470, 30]);
	
	var xScale3 = d3.scaleLinear().domain(durationExtent).range([50, 470]);
	var yScale3 = d3.scaleLinear().domain(director_facebook_likesExtent).range([470, 30]);
     
    var xAxis = d3.axisBottom().scale(xScale).ticks(7);
    var yAxis = d3.axisLeft().scale(yScale).tickFormat(function(d){
        if (d === 0) {
            return d;
        } else {        
            return d/1000000 + " M"}
    });
  
    var xAxis2 = d3.axisBottom().scale(xScale2).ticks(7);
	var yAxis2 = d3.axisLeft().scale(yScale2);
	
	var xAxis3 = d3.axisBottom().scale(xScale3);
	var yAxis3 = d3.axisLeft().scale(yScale3);
	
    //Create SVGs for charts
    var chart1 = d3.select("#chart1")
	                .append("svg:svg")
	                .attr("width",width)
					.attr("height",height);
					
    var chart2 = d3.select("#chart2")
	                .append("svg:svg")
	                .attr("width",width)
					.attr("height",height);
					
	var chart3 = d3.select("#chart3")
	                .append("svg:svg")
	                .attr("width",width)
					.attr("height",height);

	d3.select(document.getElementById("Filters"))
    .append("p")
    .append("button")
    .style("border", "1px solid black")
    .text("Filter Data")
    .on('click', function() {
        var colorSelected = d3.select("#color").node().value;
        var contentRatingSelected = d3.select("#contentRating").node().value;
        var language = d3.select("#language").node().value;
        var genre = d3.select("#genre").node().value;
        var grossCutoff = document.getElementById("grossCutoff").value;
        var titleYear = Number(document.getElementById("titleYear").value);


        var visible = d3.selectAll("circle").filter(function(d,i) {
            var hasGenre = d.genres.includes(genre);
            var filterCriteria = ((d.color == colorSelected || colorSelected == "All") 
                && (d.content_rating == contentRatingSelected || contentRatingSelected == "All")
                && (d.language == language || language == "All") && (d.gross >= grossCutoff || grossCutoff == "")
                && (d.title_year === titleYear || titleYear == "") && (hasGenre || genre == "All"));

            if(filterCriteria) {
                return d;
            }
        });
        visible.transition().duration(function(d) {
            return Math.floor(Math.random() * 1500 + 50)}).style("opacity", 1);

        //console.log(colorSelected);
        //console.log(grossCutoff);
        //console.log(contentRatingSelected);
        //console.log(language);
        //console.log(genre);
        //console.log(titleYear);


        var hidden = d3.selectAll("circle").filter(function(d,i) {
            var hasGenre = d.genres.includes(genre);
            var filterCriteria = ((d.color == colorSelected || colorSelected == "All") 
                && (d.content_rating == contentRatingSelected || contentRatingSelected == "All")
                && (d.language == language || language == "All") && (d.gross >= grossCutoff || grossCutoff == "")
                && (d.title_year === titleYear || titleYear == "") && (hasGenre || genre == "All"));

            if(!filterCriteria) {
                return d;
            }
        });
        hidden.transition().duration(function(d) {
            return Math.floor(Math.random() * 1500 + 50)}).style("opacity", 0).each(function(){this.disabled = true;});
    });


	d3.select(document.getElementById("Filters"))
    .append("p")
    .append("button")
    .style("border", "1px solid black")
    .text("Reset Filter")
    .on('click', function() {
        d3.selectAll("circle").transition().duration(function(d) {
            return Math.floor(Math.random() * 1500 + 50)}).style("opacity", 1);
        d3.select("#color").node().value = "All";
        d3.select("#contentRating").node().value = "All";
        d3.select("#language").node().value = "All";
        d3.select("#genre").node().value = "All";
        document.getElementById("grossCutoff").value = "";
        document.getElementById("titleYear").value = "";
    });


	 /******************************************
		
		ADD BRUSHING CODE HERE

	 ******************************************/

	var isChart1 = false;
	var isChart2 = false;
	var isChart3 = false;

	var brush = d3.brush()
		.extent([[0, 0], [width, height]])
		.on("start", handleBrushStart1)
		.on("brush", handleBrushMove1)
		.on("end", handleBrushEnd);
	 
	var brushCell1 = chart1.append('g')
		.attr('class', 'brush')
		.call(brush)
		.on("click", function(d,i) {
			movieResult.text("");
			aspectResult.text("");
			imdbLinkResult.text("");
			directorResult.text("");
			actor1Result.text("");
			actor2Result.text("");
			actor3Result.text("");
			userReviewResult.text("");
			criticReviewResult.text("");
			grossResult.text("");
			imdbScoreResult.text("");
			movieFLikesResult.text("");
			budgetResult.text("");
			directorFLikesResult.text("");
			durationResult.text("");

		    var circles = d3.selectAll("circle");
		    circles.classed("selected", false);
		    circles.classed("selected2", false);
		    circles.classed*("selected3", false);
			// satmResult.text("");
			// satvResult.text("");
			// actResult.text("");
			// gpaResult.text("");
		});

	
	// Clear the previously-active brush, if any.
	function handleBrushStart1() {
		// chart1.selectAll("circle").classed('selected2', false);
		// chart2.selectAll("circle").classed('selected', false);
		// brush.move(d3.selectAll('.brush'), null); 


		if (!isChart1) {
			brushCell2.call(brush2.move, null);
			brushCell3.call(brush3.move, null);
			isChart1 = true;
			isChart2 = false;
			isChart3 = false;
		}
	}


	// Highlight the selected circles.
	function handleBrushMove1() {
		// console.log("brushing now");
		var selection = d3.event.selection
		// console.log(selection);
		// If the selection is non-empty, get the boundaries of the rectangle
		if (selection) {
			var [[left, top], [right, bottom]] = selection;
			//  console.log("Right: " + right);
			//  console.log("Bottom: " + bottom);
			
			chart1.selectAll("circle")
				.classed('selected', function(d) {
					// console.log("Got here");
					var x = xScale(d.imdb_score);
					var y = yScale(d.gross);
					// Hide the dots that are outside of the selected area
					return (left <= x && x <= right && top <= y && y <= bottom);
			});

			chart2.selectAll("circle")
				.classed('selected2', function(d) {
					var x = xScale(d.imdb_score);
					var y = yScale(d.gross);
					return (left <= x && x <= right && top <= y && y <= bottom);
				});
			chart3.selectAll("circle")
				.classed('selected3', function(d) {
					var x = xScale(d.imdb_score);
					var y = yScale(d.gross);
					return (left <= x && x <= right && top <= y && y <= bottom);
				});	
		}
	}

	
	// If the brush is empty, select all circles.
	function handleBrushEnd() {
		// console.log("Ending brushing");
		if (d3.event.selection !== null) return;
			chart2.selectAll("circle")
				.classed('selected2', false);
			chart1.selectAll("circle")
				.classed('selected', false);
			chart3.selectAll("circle")
				.classed('selected3', false);	
			isChart3 = false;
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
				movieResult.text("");
				aspectResult.text("");
				imdbLinkResult.text("");
				directorResult.text("");
				actor1Result.text("");
				actor2Result.text("");
				actor3Result.text("");
				userReviewResult.text("");
				criticReviewResult.text("");
				grossResult.text("");
				imdbScoreResult.text("");
				movieFLikesResult.text("");
				budgetResult.text("");
				directorFLikesResult.text("");
				durationResult.text("");

			    var circles = d3.selectAll("circle");
			    circles.classed("selected", false);
			    circles.classed("selected2", false);
			    circles.classed*("selected3", false);
			});   

	// Clear the previously-active brush, if any.
	function handleBrushStart2() {		



		if (!isChart2) {
			brushCell1.call(brush.move, null);
			brushCell3.call(brush3.move, null);
			isChart2 = true;
			isChart1 = false;
			isChart3 = false;
		}
	}
	

	// Highlight the selected circles.
	function handleBrushMove2() {
		//console.log("brushing now");
		var selection = d3.event.selection
		if (selection) {
			var [[left, top], [right, bottom]] = selection;

			chart2.selectAll("circle")
				.classed('selected2', function(d) {
					// console.log("Got here2");
					var x = xScale2(d.budget);
					var y = yScale2(d.movie_facebook_likes);
					// Hide the dots that are outside of the selected area
					// console.log(x);
					// console.log(y);
					return (left <= x && x <= right && top <= y && y <= bottom);
			});

			chart1.selectAll("circle")
				.classed('selected', function(d) {
					// console.log("Got here2");
					var x = xScale2(d.budget);
					var y = yScale2(d.movie_facebook_likes);
					// Hide the dots that are outside of the selected area
					// console.log(x);
					// console.log(y);
					return (left <= x && x <= right && top <= y && y <= bottom);
			});

			chart3.selectAll("circle")
				.classed('selected3', function(d) {
					// console.log("Got here2");
					var x = xScale2(d.budget);
					var y = yScale2(d.movie_facebook_likes);
					// Hide the dots that are outside of the selected area
					// console.log(x);
					// console.log(y);
					return (left <= x && x <= right && top <= y && y <= bottom);
			});

		
		}
	}


	/////////////////////////////////////////////////////////////////////////////////
	var brush3 = d3.brush()
		.extent([[0, 0], [width, height]])
		.on("start", handleBrushStart3)
		.on("brush", handleBrushMove3)
		.on("end", handleBrushEnd);
	

	var brushCell3 = chart3.append('g')
			.attr('class', 'brush3')
			.call(brush3)
			.on("click", function(d,i) {
				movieResult.text("");
				aspectResult.text("");
				imdbLinkResult.text("");
				directorResult.text("");
				actor1Result.text("");
				actor2Result.text("");
				actor3Result.text("");
				userReviewResult.text("");
				criticReviewResult.text("");
				grossResult.text("");
				imdbScoreResult.text("");
				movieFLikesResult.text("");
				budgetResult.text("");
				directorFLikesResult.text("");
				durationResult.text("");


			    var circles = d3.selectAll("circle");
			    circles.classed("selected", false);
			    circles.classed("selected2", false);
			    circles.classed*("selected3", false);
			});   

	// Clear the previously-active brush, if any.
	function handleBrushStart3() {		
		// satmResult.text("");
		// satvResult.text("");
		// actResult.text("");
		// gpaResult.text("");

		if (!isChart3) {
			brushCell1.call(brush.move, null);
			brushCell2.call(brush2.move, null);
			isChart3 = true;
			isChart2 = false;
			isChart1 = false;
		}
	}
	

	// Highlight the selected circles.
	function handleBrushMove3() {
		// console.log("brushing now");
		var selection = d3.event.selection
		if (selection) {
			var [[left, top], [right, bottom]] = selection;

			chart3.selectAll("circle")
				.classed('selected3', function(d) {
					// console.log("Got here2");
					var x = xScale3(d.duration);
					var y = yScale3(d.director_facebook_likes);
					// Hide the dots that are outside of the selected area
					// console.log(x);
					// console.log(y);
					return (left <= x && x <= right && top <= y && y <= bottom);
			});

			chart1.selectAll("circle")
				.classed('selected', function(d) {
					// console.log("Got here2");
					var x = xScale3(d.duration);
					var y = yScale3(d.director_facebook_likes);
					// Hide the dots that are outside of the selected area
					// console.log(x);
					// console.log(y);
					return (left <= x && x <= right && top <= y && y <= bottom);
			});

			chart2.selectAll("circle")
				.classed('selected2', function(d) {
					// console.log("Got here2");
					var x = xScale3(d.duration);
					var y = yScale3(d.director_facebook_likes);
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
	   .attr("cx", function(d) { return xScale(d.imdb_score); })
	   .attr("cy", function(d) { return yScale(d.gross); })
	   .attr("r", 3)
	   .on("click", function(d,i){
           


	       if (d3.select(this).attr("style") == null || d3.select(this).attr("style") == "opacity: 1;"){
	           var circles = d3.selectAll("circle");

	           circles.classed("selected", false);
	           circles.classed("selected2", false);
	           circles.classed("selected3", false);

	           brushCell1.call(brush.move, null);
	           brushCell2.call(brush2.move, null);
	           brushCell3.call(brush3.move, null);

	           movieResult.text(d.movie_title);
	           aspectResult.text(d.aspect_ratio);
	           imdbLinkResult.text(d.movie_imdb_link);
	           directorResult.text(d.director_name);
	           actor1Result.text(d.actor_1_name);
	           actor2Result.text(d.actor_2_name);
	           actor3Result.text(d.actor_3_name);
	           userReviewResult.text(d.num_user_for_reviews);
	           criticReviewResult.text(d.num_critic_for_reviews);
	           grossResult.text(d.gross);
	           imdbScoreResult.text(d.imdb_score);
	           movieFLikesResult.text(d.movie_facebook_likes);
	           budgetResult.text(d.budget);
	           directorFLikesResult.text(d.director_facebook_likes);
	           durationResult.text(d.duration);
	       }

	       var index = i;

	       var chart1Circle = chart1.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected", true);

	       var chart2Circle = chart2.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected2", true);

	       var chart3Circle = chart3.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected3", true);

			//console.log(circles);
			// circles.style("fill", "orange");\
			

       });

    var temp2= chart2.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale2(d.budget); })
	   .attr("cy", function(d) { return yScale2(d.movie_facebook_likes); })
	   .attr("r", 3)
	   .on("click", function(d,i){ 

	       if (d3.select(this).attr("style") == null || d3.select(this).attr("style") == "opacity: 1;"){

	           var circles = d3.selectAll("circle");

	           circles.classed("selected", false);
	           circles.classed("selected2", false);
	           circles.classed("selected3", false);

	           brushCell1.call(brush.move, null);
	           brushCell2.call(brush2.move, null);
	           brushCell3.call(brush3.move, null);

	           movieResult.text(d.movie_title);
	           aspectResult.text(d.aspect_ratio);
	           imdbLinkResult.text(d.movie_imdb_link);
	           directorResult.text(d.director_name);
	           actor1Result.text(d.actor_1_name);
	           actor2Result.text(d.actor_2_name);
	           actor3Result.text(d.actor_3_name);
	           userReviewResult.text(d.num_user_for_reviews);
	           criticReviewResult.text(d.num_critic_for_reviews);
	           grossResult.text(d.gross);
	           imdbScoreResult.text(d.imdb_score);
	           movieFLikesResult.text(d.movie_facebook_likes);
	           budgetResult.text(d.budget);
	           directorFLikesResult.text(d.director_facebook_likes);
	           durationResult.text(d.duration);
	       }

	       var index = i;

	       var chart1Circle = chart1.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected", true);

	       var chart2Circle = chart2.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected2", true);

	       var chart3Circle = chart3.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected3", true);


       });
	
	   
	var temp3= chart3.selectAll("circle")
	   .data(csv)
	   .enter()
	   .append("circle")
	   .attr("id",function(d,i) {return i;} )
	   .attr("stroke", "black")
	   .attr("cx", function(d) { return xScale3(d.duration); })
	   .attr("cy", function(d) { return yScale3(d.director_facebook_likes); })
	   .attr("r", 3)
	   .on("click", function(d,i){ 

	       if (d3.select(this).attr("style") == null || d3.select(this).attr("style") == "opacity: 1;"){

	           var circles = d3.selectAll("circle");

	           circles.classed("selected", false);
	           circles.classed("selected2", false);
	           circles.classed("selected3", false);

	           brushCell1.call(brush.move, null);
	           brushCell2.call(brush2.move, null);
	           brushCell3.call(brush3.move, null);

	           movieResult.text(d.movie_title);
	           aspectResult.text(d.aspect_ratio);
	           imdbLinkResult.text(d.movie_imdb_link);
	           directorResult.text(d.director_name);
	           actor1Result.text(d.actor_1_name);
	           actor2Result.text(d.actor_2_name);
	           actor3Result.text(d.actor_3_name);
	           userReviewResult.text(d.num_user_for_reviews);
	           criticReviewResult.text(d.num_critic_for_reviews);
	           grossResult.text(d.gross);
	           imdbScoreResult.text(d.imdb_score);
	           movieFLikesResult.text(d.movie_facebook_likes);
	           budgetResult.text(d.budget);
	           directorFLikesResult.text(d.director_facebook_likes);
	           durationResult.text(d.duration);
	       }

	       var index = i;

	       var chart1Circle = chart1.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected", true);

	       var chart2Circle = chart2.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected2", true);

	       var chart3Circle = chart3.selectAll("circle").filter(function(d,i) {
	           return i == index}).classed("selected3", true);
		

       });

 //////////////////////////////////////////////////////////////////////////////////////////////

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
		.text("IMDB Score");


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
		.text("Gross");

	// chart1.attr("transform", "translate(50,0)");

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
		.text("Budget");


    chart2 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis2);
	chart2
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 60)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Movie Facebook Likes");

	// chart2.attr("transform", "translate(50,0)");


	chart3 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -30)+ ")")
		.call(xAxis3);

	chart3
		.append("text")
		.attr("class", "label")
		.attr("x", width-16)
		.attr("y", height - 35)
		.style("text-anchor", "end")
		.text("Duration (min)");


    chart3 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis3);
	chart3
		.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 60)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Director Facebook Likes");


	});
