// Data visualization project for CS 235
/*
  Creates a map of USA and ties up the road traffic data for the year 2015 with each state.

  dataset used:https://kaggle.com
  description: ~2gb dataset containing daily volumes of traffic, binned by the hour.
  fields: daily observation of traffic volume divided into 24 hourly bins, station_id,
          traffic flow direction, type of road

  data sanitization: downloaded the raw text data file and sanitized data by converting it into CSV format
  using python script, attached both original and new in the project.
  Using csv

  Additional Libraries used: d3-svg-legend, d3-tooltip, datamaps.js, boostrap(CDN)

  Usage: Run `npm install` and then run npm start
  NOTE: ENSURE ACTIVE INTERNET CONNECTION FOR CDNs to work while running the application.
  open  localhost:8090 in browser to view the app.

  Data - Visualizations used:
  -> on map of US, color gradient showing highest to lowest traffic volume in all states
  -> tooltips on hover over the map showing the state specific details
  -> clicking on state opens up a popup window showing day-wise traffic in a bar graph
  -> detailed overview on the left side of the canvas showing salient details for selected month
  -> Interactive changing of month
  -> clicking on a bar opens up a line graph to view hourly traffic for the selected day (used image as a mockup
    for this purpose)
  -> button to view rural and urban traffic pie chart
  -> button to view traffic on holidays dynamic bubble chart

  Future Work/ Features to be implemented:
  -> Customizable pie chart that changes value when a different month is selected
  -> Line graph to appear dynamically
  -> Use complete dataset instead of 1500 rows
  -> Use real time data


  Interesting insights from the current visualization, validating application's purpose:
  -> As we study the heatmap, we can see that the month of June shows the highest road traffic volumes, it might be
    because of the summer holiday season when people like to travel or the time that attracts more tourists. Also the
    study of bar charts reveals Thursdays and Fridays to be the busiest.

  Last Tested:
  4th Dec, 2017

  Developed by:
    Anuja Tike
    Rashmeet Kaur Khanuja

 */


// load all the data files, styles and d3 up front
var style = require('./style.css');
var d3 = require('d3'),
 d3tooltip = require('d3-tooltip'),
 tooltip = d3tooltip(d3);
var d3legend = require('d3-svg-legend');
var Datamap = require("datamaps");
var data = require('./Final2.csv');
var bubbleData = require('./holiday.csv');

//An array of month names for the drop down menu
var data_month = ["None","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Call Bubble chart on button click
d3.select("#bubbleButton").on("click", function(){createBubbleChart(bubbleData)});

// Appending values to dropdown menu
var select = d3.select('#inputContainer').append("label").attr("class","labelEl").text("Select Month")
.append('select')
.attr('class','selectEl')
.on('change',draw);

var options = select
.selectAll('option')
.data(data_month)
.enter()
.append('option')
.text(function (d) { return d; })
.call(draw);


//clears current map and draws new svg by calling createmap
// each time month is changed
//Also calls the pie chart for rural and urban areas
//
function draw() {

      var	selectValue = d3.select('select').property('value');
      d3.select('svg').remove();
      createMap(selectValue);
      d3.select("#rubutton")
        .style("font", "Monotype Corsiva")
        .on("click", function(){
             createPie();});
}

// Creates Map to visualize data and adds relevant values to overview table
// Called each time month is changed
function createMap(month)
{
        var list_of_states = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
        var abbrv_obj = {"AL":"AL","AK":"AK","AS":"AS","AZ":"AZ","AR":"AR","CA":"CA","CO":"CO","CT":"CT","DE":"DE","DC":"DC","FM":"FM","FL":"FL","GA":"GA","GU":"GU","HI":"HI","ID":"ID","IL":"IL","IN":"IN","IA":"IA","KS":"KS","KY":"KY","LA":"LA","ME":"ME","MH":"MH","MD":"MD","MA":"MA","MI":"MI","MN":"MN","MS":"MS","MO":"MO","MT":"MT","NE":"NE","NV":"NV","NH":"NH","NJ":"NJ","NM":"NM","NY":"NY","NC":"NC","ND":"ND","MP":"MP","OH":"OH","OK":"OK","OR":"OR","PW":"PW","PA":"PA","PR":"PR","RI":"RI","SC":"SC","SD":"SD","TN":"TN","TX":"TX","UT":"UT","VT":"VT","VI":"VI","VA":"VA","WA":"WA","WV":"WV","WI":"WI","WY":"WY"};
        var total_traffic = [];
        var total_traffic_map = {};

        // Compute total traffic for the selected month
        list_of_states.forEach(function(currstate){
          var traffic_count = 0;
          data.forEach(function(element){
              if(element.state_names == currstate && month == "None"){
                traffic_count+= parseInt(element.sum_of_traffic_on_this_date);
              }

              if(element.state_names == currstate && element.month_name_of_data == month){
                traffic_count+= parseInt(element.sum_of_traffic_on_this_date);
              }
          });
          total_traffic.push(traffic_count);
        });

        // Adding total traffic for the months to overview table
        d3.select("#tot").text(d3.sum(total_traffic));

        // Creating a normalized color scale, this function returns a color based on the domain and range
        var color = d3.scaleQuantile()
                        .domain([d3.min(total_traffic), d3.max(total_traffic)])
                        .range(['#93DB70','#4AC948','#55AE3A','#629632','#458B00','#3B5323','#3D5229']);


        // Creating a map for fill colors
        // computing state with highest traffic
        var state = "";
        var max_val = 0;
        list_of_states.forEach(function(currstate, idx){

                  if(total_traffic[idx] > max_val){
                      max_val = total_traffic[idx];
                      state = currstate;
                  }
                  total_traffic_map[abbrv_obj[currstate]] = {
                    'fillColor':function(){
                    return color(total_traffic[idx]);
                  }
                };
          });

        // adding state with highest traffic for given month
        d3.select("#highest_state").text(state);

        //Adding State with maximum total traffic
        var month_name_map = {};
        var names = [];
        data.forEach(function(element,idx){
            if(month_name_map[element.month_name_of_data] == null){
              month_name_map[element.month_name_of_data] = 0;
              names.push(element.month_name_of_data);
            }
            month_name_map[element.month_name_of_data] += parseInt(element.sum_of_traffic_on_this_date);
        });

        // Computing month with highest traffic
        max_val = 0;
        var month_name = "";
        names.forEach(function(element){
          if(month_name_map[element] > max_val ){
            max_val = month_name_map[element];
            month_name = element;
          }
        });

        // Adding highest traffic month to overview table
        d3.select("#reason").text(month_name); //till this


        //Datamap object to create map of USA
        var map = new Datamap({
          element: document.getElementById('container1'),
          scope: 'usa',
          fills:{
            defaultFill: "gray"
          },
          data: total_traffic_map,

        //starting here
        geographyConfig:{

                    // display details on mouseover using a popup
                    popupTemplate:function (geo, data1) {
                      var total_traffic_pop=0;
                      var station_id=[];
                      var direction=[];


                    data.forEach(function(element) {

                        if (element.state_names_full == geo.properties.name && month == "None")
                        {
                          total_traffic_pop=total_traffic_pop+ parseInt(element.sum_of_traffic_on_this_date);
                          station_id.push(element.station_id);
                          direction.push(element.direction_of_travel_name);
                        }

                        if (element.state_names_full == geo.properties.name && element.month_name_of_data == month)
                        {
                          total_traffic_pop=total_traffic_pop+ parseInt(element.sum_of_traffic_on_this_date);
                          station_id.push(element.station_id);
                          direction.push(element.direction_of_travel_name);
                        }

                    });

                    var popup = ['<div class="hoverinfo"><strong>' + geo.properties.name+' ('+month+')<br></strong> Total volume of traffic :' +total_traffic_pop+
                    '<br>Stations Id : '+station_id+'<br>Directions of Travel : '+direction+'<hr><small><i>Click for more details if month is selected</i></small></div>'];
                    return popup;

                  },
                },

          done: function(datamap) {

                var states = datamap.svg.selectAll('.datamaps-subunit');
                states.attr('data-toggle','modal').attr('data-target','#myModal');
                d3.select('#myModal').on('shown.bs.modal', function () {
                  $('#myInput').focus();
                });

                // show detail view when state is clicked
                states.on('click', function(geography) {
                  openDetailView(month,geography.properties.name);
                });

                // Turn cursor to pointer when mouse over the svg
                datamap.svg.on('mouseover',function(d){
                  d3.select(this).style('cursor','pointer');
            });

        // Add legend to map
        var mysvg = d3.select("svg");
        mysvg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", "translate(3,20)");

        var legendLinear = d3legend.legendColor()
            .shapeWidth(7)
            .cells(10)
            .orient('vertical')
            .labelAlign("start")
            .scale(color)
            .title("Traffic Volume");

        mysvg.select(".legendLinear")
                .call(legendLinear);

                      },
      });

}


/*
// To open detail view when state in map is clicked
// creates modal, data object with relevant day/date and corresponding road traffic volume
// and calls barplot() to create a bar chart
var openDetailView = function(month,state_name){
        d3.select(".modal-title").html("");
        d3.select(".modal-body").html("");

        var counter = 0;
        var max_traffic = 0;
        var curr_detail_obj = [];
        var direction_of_travel = '';
        var station_id='';
        var functional_classification_name='';

        //Compute day-wise traffic to provide data to be fed to the barplot function
        data.forEach(function(element,idx){
            if(element.state_names_full === state_name && element.month_name_of_data === month){

              if(element.sum_of_traffic_on_this_date > max_traffic){
                  max_traffic = parseInt(element.sum_of_traffic_on_this_date);
                  direction_of_travel = element.direction_of_travel_name;
                  station_id= element.station_id;
                  functional_classification_name=element.functional_classification_name;
              }

             curr_detail_obj.push({'Day_Of_Month':element.day_of_data,'Traffic_Volume':parseInt(element.sum_of_traffic_on_this_date), 'Month_selected' : element.month_name_of_data, 'Day_of_Week' : element.day_name_of_week});

          }
        });

        d3.select(".modal-title").html("Day-wise Traffic Volume in " +state_name+" for "+month);

        //Show details when mouse is hovered on a particular state in the US country map
        d3.select(".modal-body").append("div").html("Direction of highest traffic : "+direction_of_travel+"<br> Station id of highest traffic : "+station_id+"<br> Functional classification of highest traffic : "+functional_classification_name+"<br> <hr>");
        barPlot(curr_detail_obj);

  };

// bar graph showing Detailed View of a Month Traffic for selected state
// in a given year
function barPlot(data){

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 50, left: 40},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


        // set the ranges for x and y
        var x = d3.scaleBand()
              .range([0, width])
              .padding(0.6);
        var y = d3.scaleLinear()
              .range([height, 0]);


        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select(".modal-body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.Day_Of_Month; }));
        y.domain([0, d3.max(data, function(d) { return d.Traffic_Volume; })]);


        // append the rectangles for the bar chart with tooltip
        var bars = svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Day_Of_Month); })
          .attr("width", 30)
          .attr("y", function(d) { return y(d.Traffic_Volume); })
          .attr("height", function(d) { return height - y(d.Traffic_Volume); })
          .on("mouseover", function(d){
            var html = " Traffic Volume was: "+ d.Traffic_Volume +" on Date: "+" "+d.Day_Of_Month+ '<br>' +d.Day_of_Week +'<br>'+"<small> <i> Click to view Hourly Traffic</i>";
            tooltip.html(html)
            tooltip.show()
          })
          .on("click", function(d) {
          d3.select("#lineImg").style("display", "inline")
        })
          .on("mouseout", function(){
          tooltip.html("");
          tooltip.hide();
          })


        // add the x Axis
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
          .attr("y", 0)
          .attr("x", 0)
          .attr("dy", "1.50em")
          .attr("transform", "rotate(0)")
          .style("text-anchor", "start");

        // add the y Axis
        svg.append("g")
          .call(d3.axisLeft(y))
          .selectAll("text")
          .attr("y", 0)
          .attr("x", -40)
          .attr("dy", "0.0em")
          .style("text-anchor", "start");

      //Hide the line graph image when clicked
        d3.select("#lineImg").on("click", function(){
              d3.select(this).style("display", "none")
        })


}

//Pie chart for rural urban
//

function createPie(){

      //set ordinal color scale for the pie chart
      var color1 = d3.scaleOrdinal(["#d0743c", "#ff8c00"]);

      var total_traffic_ru = [];
      var traffic_count_rural = 0;
      var traffic_count_urban = 0;

      //Calculate total rural and urban traffic
      //and create an array to be fed to the pie chart
      //
      data.forEach(function(d){
                if( d.functional_classification_name == "Rural" ){
                  traffic_count_rural = traffic_count_rural + parseInt(d.sum_of_traffic_on_this_date);
                }

                if( d.functional_classification_name == "Urban" ){
                traffic_count_urban = traffic_count_urban + parseInt(d.sum_of_traffic_on_this_date);
                }
      })

          total_traffic_ru.push(traffic_count_rural);
          total_traffic_ru.push(traffic_count_urban);




      //Create SVG and group to display the pie chart
          var svg1 = d3.select("#container2").append("svg")
                        .attr("width", 260)
                        .attr("height", 280)
                        .data([total_traffic_ru]);

          var width1 = parseInt(d3.select("#container2").style("width"));
          var height1 = parseInt(d3.select("#container2").style("height"));
          var radius = Math.max(width1, height1)/3;
          var g = svg1.append("g")
                      .style("width", 348).style("height", 388)
                      .attr("transform", "translate(" + width1  + "," + height1/3 + ")");

          var pie = d3.pie()
                      .value(function(d) {
                      return d;
                      });


          var path = d3.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(0)

          var arc = g.selectAll(".arc")
                      .data(pie)
                      .enter()
                      .append("g")
                      .attr("class", "arc");


          arc.append("path")
            .attr("d", path)
            .attr("fill", function(d, i) {
              return color1(i);
            })
            .append("title")
            .text(function(d){
              return ("Road Traffic Volume is: " +d.value) ;
            })

          //Add legend to pie chart
          var pieLegend = svg1.selectAll(".legend")
                              .data(pie)
                              .enter()
                              .append('g')
                              .attr("transform", function(d,i){
                                return "translate(" + (width1-130) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
                              })
                              .attr("class", "legend");

          pieLegend.append("rect") // make a matching color rect
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", function(d, i) {
            return color1(i);
          });

          pieLegend.append("text") // add the text
          .text(function(d){
            if(d.value == traffic_count_rural){
              return "Rural";
            }
            else{
              return "Urban";
            }
          })
          .style("font-size", 12)
          .attr("y", 10)
          .attr("x", 11);
}

/*var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/trafficUS';
MongoClient.connect(url, function(err, db){
  console.log("connected!");
  db.close();
})*/


//Create Bubble Chart for holidays
//to display on mouse hover the name of holidays, date, and trafiic details
//on the day before the holiday
//
/*
function createBubbleChart(bubbleData){

        //select the container to place the bubble chart within
        //and clear it to remove the current contents if any
        d3.select("#container2").remove();
        //Recreate the container to now draw bubble chart
        var div = document.createElement("div");
        div.id="container2";
        document.getElementById("overviewTable").appendChild(div);

        //Hardcoded width and height of the canvas
        var width = 1000;
        var height = 500;

        //Set up the canvas
        var canvas = d3.select("#container2").append("svg")
                                      .attr("width", width)
                                      .attr("height", height)
                                      .append("g")
                                          .attr("transform", "translate(50,100)");


        //Create a packing for the bubbles
        var pack = d3.pack()
                    .size(width, height-50)
                    .padding(10)

        //Select a root node
        var root = d3.hierarchy(bubbleData)
                      .sum(function(d) { return d.responseCount; });


        //Add the circles as the descendants of the root
        var node = canvas.selectAll(".node")
                          .data(pack(root).descendants())
                          .enter()
                          .append("g")
                              .attr("class", "node")

        node.append("circles");

        //Simulation is a collection of forces
        //about where we want our circles(bubbles) to go
        //and how we want our circles to interact
        var simulation = d3.forceSimulation()
                            .force("x",d3.forceX(width/2).strength(0.005))
                            .force("y", d3.forceY(height).strength(0.003))
                          .force("collide", d3.forceCollide(40))


        //Create the circles linking the data such that
        //the radius os each circle is a function of
        //the emission values for different countries
        var circles = canvas.selectAll(".holiday")
                              .data(bubbleData)
                              .enter()
                              .append("circle")
                                  .attr("class", "holiday")
                                  .attr("r", function(d){
                                    return parseInt((d.Traffic_Volume/2000));})
                                  .attr("opacity", "0.7")
                                  .attr("stroke", "maroon")
                                  .attr("stroke-width","2")
                                  .style("fill", function(d){
                                    if (d.Holiday_Name == "New Year's Day: Jan1"){return "green";}
                                    if (d.Holiday_Name == "Martin Luther King Jr. Day: Jan 19"){return "gold";}
                                    if (d.Holiday_Name == "Valentine's Day: Feb 14"){return "orangeRed";}
                                    if (d.Holiday_Name== "Memorial Day: May 25"){return "pink";}
                                    if (d.Holiday_Name == "Independence Day: July 4"){return "blue";}
                                    if (d.Holiday_Name == "Labor Day: Sep 7"){return "purple";}
                                    if (d.Holiday_Name == "Halloween: Oct 31"){return "aqua";}
                                    if (d.Holiday_Name == "Veterans Day: Nov 11"){return "lime";}
                                    if (d.Holiday_Name == "Thanksgiving Day: Nov 26"){return "red";}
                                    if (d.Holiday_Name == "Christmas Eve: Dec 24"){return "brown";}
                                  })

        //Display information on mouse over
        circles.append("title")
                        .text(function(d){
                          return ( d.Holiday_Name +  "\n Traffic volume on " +d.Traffic_Volume_on_day+ ": " + d.Traffic_Volume );
                        })

        simulation.nodes(bubbleData)
                  .on("tick", ticked)

        //Assign the bubbles centre coords on each tick
        function ticked(){
          circles
              .attr("cx", function(d){return d.x;})
              .attr("cy", function(d){return d.y;})

        }
}

*/
