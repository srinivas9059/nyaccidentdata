// Step 3: Load and Process CSV data
d3.csv("factors.csv").then(function(data) {
    // Step 3.1: Check the structure of your data
    console.log(data);

    // Step 3.2: Convert "FactorCount" values to numbers
    data.forEach(function(d) {
        d.FactorCount = +d.FactorCount;
    });

    // Step 3.3: Display the processed data
    console.log(data);

    // Set the minimum and maximum font sizes
    var minFontSize = 2;
    var maxFontSize = 40;

    // Find the maximum and minimum FactorCount values
    var maxFactorCount = d3.max(data, function(d) { return d.FactorCount; });
    var minFactorCount = d3.min(data, function(d) { return d.FactorCount; });

    // Step 4: Create the Word Cloud layout
    var layout = d3.layout.cloud()
        .size([1200, 500]) // Set the dimensions of the word cloud container
        .words(data.map(function(d) {
            return {
                text: d.CONTRIBUTING_FACTOR,
                size: minFontSize + (maxFontSize - minFontSize) * (d.FactorCount - minFactorCount) / (maxFactorCount - minFactorCount),
                factorCount: d.FactorCount  // Add FactorCount to the word data
            };
        }))
        .padding(9) // Increase padding
        .rotate(function() { return 0; }) // Rotate all words horizontally
        .fontSize(function(d) { return Math.sqrt(d.size) * 10; })  // Adjust the scaling factor
        .on("end", draw);

    layout.start();

    // Step 5: Draw the Word Cloud
    function draw(words) {
        var svg = d3.select("#word-cloud-container").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")");

        // Append text elements with tooltips
        var texts = svg.selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("fill", "steelblue") // Customize the text color
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; })
            .on("mouseover", function(d) {
                // Show tooltip on hover
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.text + "<br/>" + "Factor Count: " + d.factorCount)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                // Hide tooltip on mouseout
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }

    // Add a tooltip container
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

});
