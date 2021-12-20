/** 
 * @function
 * Function for Expand button 1 (used in 'Videos' section)
 * This function is used in conjunction with <span> within the paragraph which expands when clicked to reveal more of the paragraph.
 */
 function readmore_1() {

    /**
     * Initialise variables for the break,text and button text using the IDs given in the html
     */
    var breaks = document.getElementById("breaks-1");
    var moreText = document.getElementById("more-1");
    var btnText = document.getElementById("myBtn-1");

    /**
     * An if statement which is responsible for the reveal of the remaining text within the paragraph 
     * Also includes the update of the button text from 'Expand' to 'Collapse' when clicked on.
     */
    if (breaks.style.display === "none") {
      breaks.style.display = "inline";
      btnText.innerHTML = "Expand";
      moreText.style.display = "none";
    } else {
      breaks.style.display = "none";
      btnText.innerHTML = "Collapse";
      moreText.style.display = "inline";
    }
  }

/**
 * @function
 * Function for Expand button 2 (used in 'Videos' section)
 * This function is similar to the one previously, except the IDs used for the variables.
 * i.e. "break-2", "more-2","myBtn-2"
 */
  function readmore_2() {
    var breaks = document.getElementById("breaks-2");
    var moreText = document.getElementById("more-2");
    var btnText = document.getElementById("myBtn-2");
  
    if (breaks.style.display === "none") {
      breaks.style.display = "inline";
      btnText.innerHTML = "Expand";
      moreText.style.display = "none";
    } else {
      breaks.style.display = "none";
      btnText.innerHTML = "Collapse";
      moreText.style.display = "inline";
    }
  }

/** ------------------------------ Graphs ------------------------------ */

/**
 * Code from https://www.d3-graph-gallery.com/graph/barplot_button_data_csv.html
 * @function
 * The function responsible for the graph visualisation with the interactive buttons
 */
 
/** 
 * @variable
 * This variable is used to set the dimensions and margins of the graph
 */
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

/** 
 * @variable
 * This variable is responsible for appending the svg object to the body of the page
 */
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

/**
 * Initialise the variable for the x-axis
 */
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

/**
 * Initialise the variable for the y-axis
 */
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")


/**
 * The function which updates the graph of the selected variable variable from the interactive buttons
 */
function update(selectedVar) {

  /**
   * Reads the data of the specified csv
   */
  d3.csv("Carbon Dioxide Data.csv", function(data) {

    /**
     * Calls the variable for the x-axis from the specified csv
     */
    x.domain(data.map(function(d) { return d.Year; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    /**
     * Adds and calls the variable for the y-axis from the specified csv
     */
    y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    /**
     * Initialise the variable u, which is used to map the datas called to the bars on the graph
     */
    var u = svg.selectAll("rect")
      .data(data)

    /**
     * Responsible for the 'update' feature of the graph's buttons
     */
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.Year); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .attr("fill", "lightyellow")
  })

}

/**
 * Starts the initialising process for the graph
 */
update('Mean')
