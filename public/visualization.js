// visualization.js

let mostDeaths, leastDeaths; // Declare variables outside the callback functions

// Load your CSV data using D3.js
d3.csv("most_vehicle_type.csv", function (mostDeathsData) {
  mostDeaths = mostDeathsData[0]; // Assign the value here

  d3.csv("least_vehicle_type.csv", function (leastDeathsData) {
    leastDeaths = leastDeathsData[0]; // Assign the value here

    // Continue with the rest of your code
    if (mostDeaths && leastDeaths) {
      // Specify the width and height of the SVG container
      // Specify the width and height of the SVG container
// Specify the width and height of the SVG container
const width = 500;
const height = 200;

// Create an SVG container
const svg = d3.select("#visualization")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a container for the circles
const circleContainer = svg.append("g")
    .attr("transform", "translate(10, 10)"); // Adjust the translation as needed

// Create a rectangle as the container with a border
circleContainer.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width - 20) // Adjust the width as needed
    .attr("height", height - 20) // Adjust the height as needed
    .style("fill", "lightgray")
    .style("stroke", "black") // Add a black border
    .style("stroke-width", "2px"); // Adjust the border width as needed

// Add a heading to the rectangle
circleContainer.append("text")
    .attr("x", (width - 20) / 2) // Position in the center of the rectangle
    .attr("y", 20) // Adjust the y-coordinate as needed
    .attr("text-anchor", "middle") // Center the text
    .style("font-size", "16px") // Adjust the font size as needed
    .text("Visualization of Impact by Vehicle");
    circleContainer.append("text")
    .attr("x", (width - 20) / 2) // Position in the center of the rectangle
    .attr("y", 170) // Adjust the y-coordinate as needed
    .attr("text-anchor", "middle") // Center the text
    .style("font-size", "16px") // Adjust the font size as needed
    .text("(Hover on Each Circle)  ");





      // Create a linear scale for radius
      const radiusScale = d3.scaleLinear()
        .domain([0, Math.max(mostDeaths.CollisionCount, leastDeaths.CollisionCount)])
        .range([10, 50]); // Adjust the range as needed

      // Create a circle for the vehicle with most deaths
      const mostCircle = circleContainer.append("circle")
        .attr("cx", 50) // Adjust the cx position as needed
        .attr("cy", height / 2)
        .attr("r", radiusScale(mostDeaths.CollisionCount))
        .style("fill", "red")
        .on("mouseover", function () {
          // Show tooltip on mouseover
          tooltip.text(`Most Deaths: ${mostDeaths.VEHICLE_TYPE} - ${mostDeaths.CollisionCount} collisions`)
            .style("visibility", "visible");
        })
        .on("mousemove", function () {
          // Move tooltip above the mouse
          // tooltip.style("top", (d3.event.clientY + 10) + "px")
          //   .style("left", (d3.event.clientX + 10) + "px");
          tooltip.style("top", (d3.event.pageY - tooltip.node().clientHeight - 5) + "px")
            .style("left", (d3.event.clientX + 5) + "px");
        })
        .on("mouseout", function () {
          // Hide tooltip on mouseout
          tooltip.style("visibility", "hidden");
        });

      // Create a circle for the vehicle with least deaths
      const leastCircle = circleContainer.append("circle")
        .attr("cx", 250) // Adjust the cx position as needed
        .attr("cy", height / 2)
        .attr("r", radiusScale(leastDeaths.CollisionCount))
        .style("fill", "green")
        .on("mouseover", function () {
          // Show tooltip on mouseover
          tooltip.text(`Least Deaths: ${leastDeaths.VEHICLE_TYPE} - ${leastDeaths.CollisionCount} collisions`)
            .style("visibility", "visible");
        })
        .on("mousemove", function () {
          // Move tooltip above the mouse
          // tooltip.style("top", (d3.event.clientY + 10) + "px")
          //   .style("left", (d3.event.clientX + 10) + "px");
          tooltip.style("top", (d3.event.pageY - tooltip.node().clientHeight - 5) + "px")
            .style("left", (d3.event.clientX + 5) + "px");
        })
        .on("mouseout", function () {
          // Hide tooltip on mouseout
          tooltip.style("visibility", "hidden");
        });

      // Tooltip element
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.8)")
        .style("color", "#fff")
        .style("padding", "5px")
        .style("border-radius", "5px");

    } else {
      console.error("Error: Data is empty or undefined.");
    }


  });
  
});

