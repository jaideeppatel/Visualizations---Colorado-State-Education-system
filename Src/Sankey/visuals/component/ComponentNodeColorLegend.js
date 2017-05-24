configs.componentNodeColorLegend01 = {
    "title": "",
}
configs.componentNodeColorLegend02 = {
    "title": "",
}
dataprep.componentNodeColorLegend01 = function(ntwrk) {
    ntwrk.filteredData = d3.scale.linear()
        .domain([0, .25, .5, .75, 1])
        .range(["#b473af", "#bfddff", "#007fb4"])
    ntwrk.valueFormat = function(v) {
        return Math.round(v * 10000) / 100 + "%"
    }
    ntwrk.topText = ["Inactive", "", "Active", "", "Very Active"]
}
dataprep.componentNodeColorLegend02 = function(ntwrk) {
    ntwrk.filteredData = d3.scale.linear()
        .domain([0, .60, .70, .8, 1])
        .range(["#9b524d", "#ffffa8", "#87a26d"])
    ntwrk.valueFormat = function(v) {
        return Math.round(v * 10000) / 100 + "%"
    }
    ntwrk.topText = ["F", "D", "C", "B", "A"]
}

visualizationFunctions.ComponentNodeColorLegend = function(element, data, opts) {
    var network = visualizations[opts.ngIdentifier];
    network.config = network.CreateBaseConfig();
    network.parentVis = visualizations[opts.ngComponentFor];
    network.SVG = d3.select(element[0])
        .append("svg")
        .attr("width", network.config.dims.width + network.config.margins.left - network.config.margins.right)
        .attr("height", network.config.dims.height + network.config.margins.top - network.config.margins.bottom)
        .style("background", "none")
        .append("g")
        .attr("class", "canvas " + opts.ngIdentifier)
    network.VisFunc = function() {
        var scale = network.filteredData
        var legendData = scale.range();
        var w = network.config.dims.width * .75;
        var stopPercentScale = d3.scale.linear()
            .domain([0, legendData.length - 1])
            .range([0, 100])
        network.SVG.gradient = network.SVG.append("svg:defs")
            .append("svg:linearGradient")
            .attr("id", "colorGradient-" + network.AngularArgs.opts.ngIdentifier)
            .attr("x1", "05%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%")
            .attr("spreadMethod", "pad");
        for (var i = 0; i < legendData.length; i++) {
            network.SVG.gradient.append("svg:stop")
                .attr("offset", stopPercentScale(i) + "%")
                .attr("stop-color", legendData[i])
                .attr("stop-opacity", 1);
        }

   //      var topTextScale = d3.scale.linear()
   //      	.domain([1, network.topText.length - 1])
   //      	.range([10, 90])

   //      network.SVG.append("g")
   //      	.attr("class", "topText")
   //      	.data(network.topText)
   //      	.enter()
   //      	.append("text")
			// .attr("class", "l2")
   //          .attr("x", function(d, i) {
   //          	console.log(i);
   //          	console.log(topTextScale(i) + "%");
   //          	return topTextScale(i) + "%"
   //          })
   //          .attr("y", network.config.dims.fixedHeight / 6)
   //          .attr("text-anchor", "start")
   //          .text(function(d, i) {
   //          	console.log(d);
   //          	return d
   //          });


        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "10%")
            .attr("y", network.config.dims.fixedHeight / 6)
            .attr("text-anchor", "start")
            .text(network.topText[0])

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "30%")
            .attr("y", network.config.dims.fixedHeight / 6)
            .attr("text-anchor", "middle")
            .text(network.topText[1])

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "50%")
            .attr("y", network.config.dims.fixedHeight / 6)
            .attr("text-anchor", "middle")
            .text(network.topText[2])

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "70%")
            .attr("y", network.config.dims.fixedHeight / 6)
            .attr("text-anchor", "middle")
            .text(network.topText[3])

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "90%")
            .attr("y", network.config.dims.fixedHeight / 6)
            .attr("text-anchor", "end")
            .text(network.topText[4])                                    



        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "10%")
            .attr("y", network.config.dims.fixedHeight / 3 * 2)
            .attr("text-anchor", "start")
            .text(network.valueFormat(scale.domain()[0]))

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "30%")
            .attr("y", network.config.dims.fixedHeight / 3 * 2)
            .attr("text-anchor", "middle")
            .text(network.valueFormat(scale.domain()[Math.round((scale.domain().length - 1) / 4)]))

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "50%")
            .attr("y", network.config.dims.fixedHeight / 3 * 2)
            .attr("text-anchor", "middle")
            .text(network.valueFormat(scale.domain()[Math.round((scale.domain().length - 1) / 2)]))

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "70%")
            .attr("y", network.config.dims.fixedHeight / 3 * 2)
            .attr("text-anchor", "middle")
            .text(network.valueFormat(scale.domain()[Math.round((scale.domain().length - 1) / 4 * 3)]))

        network.SVG.append("text")
            .attr("class", "l2")
            .attr("x", "90%")
            .attr("y", network.config.dims.fixedHeight / 3 * 2)
            .attr("text-anchor", "end")
            .text(network.valueFormat(scale.domain()[scale.domain().length - 1]))
        network.SVG.append("svg:rect")
            .attr("class", "b")
            .attr("width", w)
            .attr("height", "25%")
            .attr("x", "12.5%")
            .attr("y", "22.5%")
            .style("fill", "url(#colorGradient-" + network.AngularArgs.opts.ngIdentifier + ")")
            // network.SVG.append("text")
            // 	.attr("class", "l2")
            // 	.attr("x", "10%")
            // 	.attr("y", "80%")
            // 	.attr("text-anchor", "start")
        $(network.AngularArgs.element).find("span").html(network.config.meta.title)
            // .call(wrap, network.config.dims.fixedWidth - 10, network.parentVis.config.meta.nodes.prettyMap[network.parentVis.config.meta.nodes.styleEncoding.color.attr] || network.parentVis.config.meta.nodes.styleEncoding.color.attr)
    }
    return network;
}
