   /* var scatterdataset = [ {
        "name": "United States",
        "country": "United States",
        "gdp": 14.9,
        "epc": 317,
        "total": 98.9
    }, {

        "name": "China",
        "country": "China",
        "gdp": 5.93,
        "epc": 76,
        "total": 103
    }, {
        "name": "Japan",
        "country": "Japan",
        "gdp": 5.49,
        "epc": 171, 
        "total": 21.7
    }, {
        "name": "Germany",
        "country": "Germany",
        "gdp": 3.28,
        "epc": 171,
        "total": 14.1
    }, {
        "name": "France",
        "country": "France",
        "gdp": 2.54,
        "epc": 170,
        "total": 10.7
    }, {
        "name": "United Kingdom",
        "country": "United Kingdom",
        "gdp": 2.28,
        "epc": 143,
        "total": 8.8
    }, {
        "name": "Brazil",
        "country": "Brazil",
        "gdp": 2.14,
        "epc": 58,
        "total": 11.3
    }, {
        "name": "Italy",
        "country": "Italy",
        "gdp": 2.04,
        "epc": 126,
        "total": 7.6
    }, {
        "name": "India",
        "country": "India",
        "gdp": 1.70,
        "epc": 19,
        "total": 22.9
    }, {
        "name": "Canada",
        "country": "Canada",
        "gdp": 1.57,
        "epc": 385,
        "total": 13.1
    }, {
        "name": "Russian Federation",
        "country": "Russian Federation",
        "gdp": 1.52,
        "epc": 206,
        "total": 29.5
    }, {

        "name": "Spain",
        "country": "Spain",
        "gdp": 1.37,
        "epc": 134,
        "total": 6.1
    }, {
        "name": "Australia",
        "country": "Australia",
        "gdp": 1.14,
        "epc": 270,
        "total": 6.0
    }, {
        "name": "Mexico",
        "country": "Mexico",
        "gdp": 1.04,
        "epc": 65,
        "total": 7.6
    }, {
        "name": "Korea",
        "country": "Korea",
        "gdp": 1.01,
        "epc": 222,
        "total": 10.7
    }];*/

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
        .domain([0,16]) //Need to redefine this after loading the data
        .range([0, width]);

    var yScale = d3.scale.linear()
        .domain([0,450]) //Need to redfine this after loading the data
        .range([height, 0]);
    
    //Define Tooltip here
    
      
       //Define Axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(2);

d3.csv("scatterdata.csv",function(error, data){
    //for each key-value pair in the csv file, read in the key and the value and store them; ensure the value in the pair is numeric
    data.forEach(function(d) {
        d.country = d.country;
        d.gdp = +d.gdp;
        d.population = +d.population;
        d.epc = +d.epc;
        d.total = +d.total;
    });
    
    //Get Data
    // Define domain for xScale and yScale
    
    
   
    //Draw Scatterplot
        svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.total)/.2; })
        .attr("cx", function(d) {return xScale(d.gdp);})
        .attr("cy", function(d) {return yScale(d.epc);})
        .style("fill", function (d) { return colors(d.country); });
    //Add .on("mouseover", .....
    //Add Tooltip.html with transition and style
    //Then Add .on("mouseout", ....
    
    //Scale Changes as we Zoom
    // Call the function d3.behavior.zoom to Add zoom

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
}
