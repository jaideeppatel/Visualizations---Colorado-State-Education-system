var weekStrings = ["Pre-Course", "Week1", "Week2", "Week3", "Week4", "Midterm Exam", "Week5", "Week6", "Week7", "Week8", "Week9", "Final Exam", "Current Score"];
var weekStrings2 = ["Pre-Course", "Week1", "Week2", "Week3", "Week4", "Week5", "Week6", "Week7", "Week8", "Week9"];
var sectionStrings = ["IVMOOC", "SP15-BL-ILS-Z637-29374", "SP15-BL-ILS-Z637-32593", "SP15-BL-ILS-Z637-33781"];
var typeStrings = ["Discussions", "PageViews", "Quizzes", "Engagement"];
var typeStrings2 = ["Midterm", "FinalExam", "CurrentScore", "AvgEngagementFactor"];
var measurement = "engagement"



events.heatMap01 = function(ntwrk) {
    var engagementColorScale = d3.scale.linear()
        .domain([0, .5, 1])
        .range(["#b473af", "#bfddff", "#0097d7"])

    var scoresColorScale = d3.scale.linear()
        .domain([0, .5, .73, .8, 1])
        .range(["#9b524d", "#cda97b", "#ffffa8", "#c3d18b", "#87a26d"])


    colorCells();

    ntwrk.SVG.selectAll("text").text(function(d, i) {
        var text = d3.select(this);
        var newText = text.text().replaceAll("_", "");
        var prettyText = configs.heatMap01.prettyMap[newText] || newText;
        return prettyText;
    })

    function formatText(t) {
        return d3.format("0,000")(t)
    }

    ntwrk.SVG.switchText = function(display) {
        ntwrk.SVG.selectAll(".cell")
            .select("text")
            .text(function(d, i) {
                // if (i == 0) console.log(d.values.children[0].value / d.values.children[0].count);
                return formatText(Math.round(d.values.children[0].value / d.values.children[0].count * 10000) / 100) + "%";
            })
    }

    ntwrk.SVG.switchText("count");


    function colorCells() {
        for (var i = 0; i < ntwrk.filteredData.records.data.length; i++) {

            var extent = d3.extent(ntwrk.SVG.selectAll(".col-" + i).selectAll("rect").data(), function(d1, i1) {
                return d1.values.children[0].value
            })
            var week = ntwrk.SVG.select(".col-" + i).selectAll("rect").data()[0].values.children[0].week

            var scale = engagementColorScale;
            if (week == "Midterm Exam" || week == "Final Exam" || week == "Current Score") {
                scale = scoresColorScale;
            }

            ntwrk.SVG.selectAll(".col-" + i).selectAll("rect")
                .style("fill", function(d1, i1) {
                    return scale(d1.values.children[0].value / d1.values.children[0].count)
                })
        }

    }

    ntwrk.SVG.selectAll(".cell-0-0").selectAll("rect")
        .attr("stroke-width", 2)
        .attr("stroke", "#525252")
    ntwrk.SVG.selectAll(".cell").on("click", function(d, i) {
        ntwrk.SVG.selectAll(".cell").selectAll("rect")
            .attr("stroke-width", 0)
        d3.select(this).selectAll("rect")
            .attr("stroke", "#525252")
            .attr("stroke-width", 2)
        configs.heatMap02.LA.section = d.key
        configs.heatMap02.LA.week = d.values.children[0].week
        $("#sectiontitle1").html(configs.heatMap01.prettyMap[d.key] || d.key)
        $("#sectiontitle2").html(configs.heatMap01.prettyMap[d.key] || d.key)
        $("#weektitle").html(configs.heatMap01.prettyMap[d.values.children[0].week] || d.values.children[0].week)
        var a = 0;
        ntwrk.AngularArgs.data.get("records").data.filter(function(d1, i1) {
            if (d1.Section.indexOf(d.key) > -1) {
                a++
            }
        })
        if (["Midterm Exam", "Final Exam", "Current Score"].indexOf(d.values.children[0].week) > -1) {
            measurement = "scores"
            sortByIndex = ["Midterm Exam", "Final Exam", "Current Score"].indexOf(d.values.children[0].week)
        } else {
            measurement = "engagement"
        }

        visualizations.heatMap02.SVG.attr("height", a * 45)
        visualizations.heatMap02.SVG.style("height", a * 45)
        visualizations.heatMap02.AngularArgs.element.height(a * 45)
        visualizations.heatMap02.config.dims.fixedHeight = a * 45
        $(visualizations.heatMap02.SVG.node().parentNode).height(a * 45)
        visualizations.heatMap02.ResetVis();
    })

}

events.heatMap02 = function(ntwrk) {
    var engagementColorScale = d3.scale.linear()
        .domain([0, .5, 1])
        .range(["#b473af", "#bfddff", "#0097d7"])

    var scoresColorScale = d3.scale.linear()
        .domain([0, .5, .73, .8, 1])
        .range(["#9b524d", "#cda97b", "#ffffa8", "#c3d18b", "#87a26d"])
    colorCells();

    ntwrk.SVG.selectAll("text").text(function(d, i) {
        var text = d3.select(this);
        var newText = text.text().replaceAll("_", "");
        var prettyText = configs.heatMap01.prettyMap[newText] || newText;
        return prettyText;
    })

    function formatText(t) {
        return d3.format("0,000")(t)
    }

    ntwrk.SVG.switchText = function(display) {
        ntwrk.SVG.selectAll(".cell")
            .select("text")
            .text(function(d, i) {
                if (isNaN(d.values.children[0].value)) {
                    return "-";
                }
                return formatText(Math.round(d.values.children[0].value * 10000) / 100) + "%";
            })
    }

    ntwrk.SVG.switchText("count");
    visualizations.heatMap02.SVG.selectAll(".l").filter(".xaxis").each(function(d, i) {
        d3.select(this).on("click", function(d1, i1) {
            sortByIndex = i;
            visualizations.heatMap02.ResetVis();
        })
    })

    function colorCells() {
        for (var i = 0; i < ntwrk.filteredData.records.data.length; i++) {
            var useScale = engagementColorScale

            var extent = d3.extent(ntwrk.SVG.selectAll(".col-" + i).selectAll("rect").data(), function(d1, i1) {
                return d1.values.children[0].value
            })
            if (measurement == "scores") {
                useScale = scoresColorScale
            }

            ntwrk.SVG.selectAll(".col-" + i).selectAll("rect")
                .style("fill", function(d1, i1) {

                    if (isNaN(d1.values.children[0].value)) {
                        return "#f1f1f1";
                    }
                    if (d1.values.children[0].metric == "AvgEngagementFactor") {
                        return engagementColorScale(d1.values.children[0].value)
                    }
                    return useScale(d1.values.children[0].value)
                })
        }

    }
}


configs.heatMap01 = {
    "type": "org.cishell.json.vis.metadata",
    "records": {
        "rowAggregator": "section",
        "colAggregator": "week"
    },
    "styleEncoding": {
        "offset": [120, -30]
    },
    "labels": {
        "xAxis": "",
        "yAxis": "",
        "display": true
    },
    "aggregateBars": {
        "display": false
    },
    "prettyMap": {
        "Pre-Course": "Pre-Course",
        "Week1": "Week 1",
        "Week2": "Week 2",
        "Week3": "Week 3",
        "Week4": "Week 4",
        "Week5": "Week 5",
        "Week6": "Week 6",
        "Week7": "Week 7",
        "Week8": "Week 8",
        "Week9": "Week 9",
        "Midterm Exam": "Midterm",
        "Final Exam": "Final", 
        "FinalExam": "Final", 
        "Current Score": "Curr. Score",
        "CurrentScore": "Curr. Score",
        "PageViews": "Page Views",
        "Quizzes": "Quizzes",
        "Engagement": "Engagement",
        "AvgEngagementFactor": "Overall Engagement",
        "SP15-BL-ILS-Z637-29374": "Z637-29374",
        "SP15-BL-ILS-Z637-32593": "Z637-32593",
        "SP15-BL-ILS-Z637-33781": "Z637-33781"
    }
}



dataprep.heatMap01 = function(ntwrk) {
    var dataskel = {};
    weekStrings.forEach(function(d, i) {
        var obj = new Object();
        sectionStrings.forEach(function(d1, i1) {
            obj[d1] = {};
            obj[d1].vals = [];
        })
        dataskel[d] = obj;
    })
    ntwrk.filteredData.records.data.forEach(function(d, i) {
        d.Midterm = d.Midterm + ";";
        d.FinalExam = d.FinalExam + ";";
        d.CurrentScore = d.CurrentScore + ";";
        d.AvgEngagementFactor = d.AvgEngagementFactor + ";";

        weekStrings.forEach(function(d1, i1) {
            d[d1 + " Engagement"] = d[d1 + " Engagement"] + ";"
        });
    })

    ntwrk.filteredData.records.data.forEach(function(d, i) {
        weekStrings2.forEach(function(d1, i1) {
            dataskel[d1][d.Section].vals.push(splittyDo(d, d1 + " Engagement"))
        });
        dataskel["Midterm Exam"][d.Section].vals.push(splittyDo(d, "Midterm"))
        dataskel["Final Exam"][d.Section].vals.push(splittyDo(d, "FinalExam"))
        dataskel["Current Score"][d.Section].vals.push(splittyDo(d, "CurrentScore"))
    })
    var newData = [];
    Object.keys(dataskel).forEach(function(d, i) {
        Object.keys(dataskel[d]).forEach(function(d1, i1) {
            var obj = new Object();
            obj.week = d;
            obj.section = d1;
            obj.value = d3.sum(dataskel[d][d1].vals, function(d2, i2) {
                return d2.vals[0];
            })
            obj.count = dataskel[d][d1].vals.length
            newData.push(obj)
        })
    })
    ntwrk.filteredData.records.data = newData;
}


configs.heatMap02 = {
    "type": "org.cishell.json.vis.metadata",
    "records": {
        "rowAggregator": "name",
        "colAggregator": "metric"
    },
    "styleEncoding": {
        "offset": [120, -30]
    },
    "labels": {
        "xAxis": "",
        "yAxis": "",
        "display": true
    },
    "aggregateBars": {
        "display": false
    },
    "sort": false,
    "LA": {
        "section": "IVMOOC",
        "week": "Pre-Course"
    },
    "prettyMap": configs.heatMap01.prettyMap
}

var sortByIndex = 0;

dataprep.heatMap02 = function(ntwrk) {
    var smallerData = [];
    var currTypeStrings = typeStrings;

    ntwrk.filteredData.records.data.forEach(function(d, i) {
        if (d.Section == configs.heatMap02.LA.section) {
            smallerData.push(d);
        }
        weekStrings.forEach(function(d1, i1) {
            d[d1 + " Engagement"] = d[d1 + " Engagement"] + ";"
        })
    })
    var biggerData = [];
    if (measurement == "scores") {
        smallerData.forEach(function(d, i) {
            typeStrings2.forEach(function(d1, i1) {
                var obj = new Object();
                obj.name = d.Name;
                obj.metric = d1;
                // d[d1] = d[d1] + ";"
                obj.valueObj = d[d1]
                obj.value = d[d1]
                biggerData.push(obj);
            })
        })
    }
    if (measurement == "engagement") {
        smallerData.forEach(function(d, i) {
            typeStrings.forEach(function(d1, i1) {
                var obj = new Object();
                obj.name = d.Name;
                obj.metric = d1;
                obj.valueObj = splittyDo(d, configs.heatMap02.LA.week + " " + d1)
                obj.value = obj.valueObj.vals[0]
                biggerData.push(obj);
            })
        })

    }



    ntwrk.filteredData.records.data = biggerData

    ntwrk.cellSortFunc = function(data) {
        data[sortByIndex].name.sort(function(a, b) {
            return b.values.children[0].value - a.values.children[0].value
        })

        var order = [];
        data[sortByIndex].name.forEach(function(d, i) {
            order.push(d.key)
        })

        for (var i = 0; i < data.length; i++) {
            data[i].name.sort(function(a, b) {
                return order.indexOf(a.key) - order.indexOf(b.key)
            })
        }

        // data[0].values.children = data[0].values.children.sort(function())
        // data.forEach(function(d, i) {
            

        //     d[configs.heatMap02.records.rowAggregator] = d[configs.heatMap02.records.rowAggregator].sort(function(d1, i1) {
        //         return -d1.values.children[0].value
        //     })
        //     // d.values.children = d.values.children.sort(function(d1, i1) {
        //     //     return -d1.value
        //     // })

        // })
    }
}

function splittyDo(data, key) {
    var d = data;
    var split = [];
    try {
        split = d[key].split(";").map(function(d1) {
            return parseFloat(d1);
        });
    } catch (e) {}



    var obj = {
        "raw": d[key],
        "vals": split
    };

    obj.sum = d3.sum(obj.vals) || 0
    obj.mean = d3.mean(obj.vals) || 0


    return obj;
}