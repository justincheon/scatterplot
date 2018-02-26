//Define Margin
var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
    width = 960 - margin.left -margin.right,
    height = 500 - margin.top - margin.bottom;

//Define Color
var colors = d3.scale.category20();

//Define SVG
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Define Scales   
var xScale = d3.scale.linear()
    //.domain([0,16]) //Need to redefine this after loading the data
    .range([0, width]); //0,width means values are increasing to the right

var yScale = d3.scale.linear()
    //.domain([0,450]) //Need to redfine this after loading the data
    .range([height, 0]); //height,0 means values are increasing upward

//Define Tooltip here
var tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

//Define Axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickPadding(2);
var yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(2);

//Get Data
// Define domain for xScale and yScale
d3.csv("scatterdata.csv",function(error, data){
    //for each value in the csv file, read in the value and store them; ensure the value is numeric except for country
    data.forEach(function(d) {
        d.country = d.country;
        d.gdp = +d.gdp;
        d.population = +d.population;
        d.epc = +d.epc;
        d.total = +d.total;
    });
   
    xScale.domain([0,d3.max(data, function(d) {return d.gdp; })]);  //define domain
    yScale.domain([0,d3.max(data, function(d) {return d.epc; })]);
    
    //Draw Scatterplot
    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.total)/.2; })
        .attr("cx", function(d) {return xScale(d.gdp);})
        .attr("cy", function(d) {return yScale(d.epc);})
        .style("fill", function (d) { return colors(d.country); })
    //Add .on("mouseover", .....
    //Add Tooltip.html with transition and style
    //Then Add .on("mouseout", ....
    //http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
        .on("mouseover", function(d) {		
            tooltip.transition()		
                .duration(200)		
                .style("opacity", .9);		
            tooltip.html(d.country + "<br/>"  + 
                 "Population: "+d.population+" Million" + "<br/>" + 
                 "GDP: $"+d.gdp+" Trillion" + "<br/>" + 
                 "EPC: "+d.epc+" Million BTUs" + "<br/>" + 
                 "Total: "+d.total+" Trillion BTUs")
                .style("left", (d3.event.pageX + 5) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");
        })					
        .on("mouseout", function(d) {		
            tooltip.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
    
    //Scale Changes as we Zoom
    // Call the function d3.behavior.zoom to Add zoom
    //http://bl.ocks.org/mbostock/3892919
    var zoom = d3.behavior.zoom()
    .x(xScale)
    .y(yScale)
    //.scaleExtent([1, 320])
    .on("zoom", zoomed);
    
    svg.call(zoom);
    
    function zoomed() {
        svg.selectAll(".dot")   //zoom circles
            .attr("cx", function(d) { return xScale(d.gdp); })
            .attr("cy", function(d) { return yScale(d.epc); })
        svg.selectAll(".text")  //zoom text
            .attr("x", function(d) {return xScale(d.gdp);})
            .attr("y", function(d) {return yScale(d.epc);})
        svg.select(".x.axis").call(xAxis);  //zoom x axis
        svg.select(".y.axis").call(yAxis);  //zoom y axis
    }

  
    //Draw Country Names
        svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("class","text")
        .style("text-anchor", "start")
        .attr("x", function(d) {return xScale(d.gdp);})
        .attr("y", function(d) {return yScale(d.epc);})
        .style("fill", "black")
        .text(function (d) {return d.country; });

    //x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 50)
        .attr("x", width/2)
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .text("GDP (in Trillion US Dollars) in 2010");

    
    //Y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("font-size", "12px")
        .text("Energy Consumption per Capita (in Million BTUs per person)");

    
     // draw legend colored rectangles
    svg.append("rect")
        .attr("x", width-250)
        .attr("y", height-190)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-100)
        .attr("cy", height-175)
        .style("fill", "white");
    
    svg.append("circle")
        .attr("r", 15.8)
        .attr("cx", width-100)
        .attr("cy", height-150)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 50)
        .attr("cx", width-100)
        .attr("cy", height-80)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-172)
        .style("text-anchor", "end")
        .text(" 1 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-147)
        .style("text-anchor", "end")
        .text(" 10 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-77)
        .style("text-anchor", "end")
        .text(" 100 Trillion BTUs");
    
     svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-15)
        .style("text-anchor", "middle")
        .style("fill", "Green") 
        .attr("font-size", "16px")
        .text("Total Energy Consumption");     
});
