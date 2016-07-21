configs.sankey = {
    "type": "org.cishell.json.vis.metadata",
    //This is "nodes" instead of "records" because the parent is a network.
    "nodes": {
        "styleEncoding": {
            "size": {
                "attr": "count",
                "value": 25
            },        },
        "identifier": {
            "attr": "id"
        }
    },
    "labels": {
        "styleEncoding": {
            "attr": "label",
            "displayTolerance": 0
        },
        "identifier": {
            "attr": "id"
        },
        "prettyMap": {
            "ed": "Education", 
            "gender": "Gender"
        }
    },
    "other": {
        "categories": [
            "InitialGrade", 
            "InitialPlan", 
            "FinalGrade", 
            "FinalPlan",
        ]
    }
}

configs.sankey01 = configs.sankey;
configs.sankey02 = configs.sankey;

events.sankey = function(ntwrk) {}

dataprep.sankey = function(ntwrk) {
    ntwrk.filteredData.records.data.forEach(function(d, i) {
        // if (configs.sankey.other.categories.indexOf("ed") > -1) {
        //     if (i == 0) configs.sankey.other.categories[configs.sankey.other.categories.indexOf("ed")] = "Education"
        //         console.log(configs.sankey.other.categories)
        //     d.renameProperty("ed", "Education")
        // }
        // if (d.gender == "male") d.gender = "Male";
        // if (d.gender == "female") d.gender = "Female";
    })
}

dataprep.sankey01 = dataprep.sankey;
dataprep.sankey02 = dataprep.sankey;



Object.defineProperty(
    Object.prototype, 
    'renameProperty',
    {
        writable : false, // Cannot alter this property
        enumerable : false, // Will not show up in a for-in loop.
        configurable : false, // Cannot be deleted via the delete operator
        value : function (oldName, newName) {
            // Do nothing if the names are the same
            if (oldName == newName) {
                return this;
            }
            // Check for the old property name to 
            // avoid a ReferenceError in strict mode.
            if (this.hasOwnProperty(oldName)) {
                this[newName] = this[oldName];
                delete this[oldName];
            }
            return this;
        }
    }
);







    // // ntwrk.filteredData.records.data = ntwrk.filteredData.records.data.splice(4400)
    // console.log(ntwrk.filteredData.records.data)
    // function has(object, key) {
    //     return object ? hasOwnProperty.call(object, key) : false;
    // }

    // ntwrk.filteredData.records.data.map(function(d, i) {
    //     var pre = "";
    //     configs.sankey.other.categories.forEach(function(d1, i1) {
    //         d[d1] = pre + d[d1].replaceAll(" ", "&")
    //         pre += "#"
    //     })


    //     // d.sci10 = "-" + d.sci10.replaceAll(" ", "")
    //     // d.sci11 = "--" + d.sci11.replaceAll(" ", "")
    //     // d.sci12 = "---" + d.sci12.replaceAll(" ", "")
    //     // d.planmaj = "-" + d.planmaj.replaceAll(" ", "")
    //     // d.compmaj = d.compmaj.replaceAll(" ", "")
    //     // d.gender = d.gender.replaceAll(" ", "")

    // })

    // var stepOne = {};
    // ntwrk.filteredData.records.data.forEach(function(d, i) {
    //     var str = ""
    //     configs.sankey.other.categories.forEach(function(d1, i1) {
    //         str += d[d1] + "@"
    //     })
    //     str = str.substring(0, str.length - 1);
    //     if (has(stepOne, str)) {
    //         stepOne[str].children.push(d)
    //     } else {
    //         stepOne[str] = { children: [], uid: str }
    //     }
    // })
    // console.log(stepOne);
    // var stepTwo = [];
    // Object.keys(stepOne).forEach(function(d, i) {
    //     var outObj = new Object();
    //     configs.sankey.other.categories.forEach(function(d1, i1) {
    //         if (stepOne[d].children.length > 0) outObj[d1] = stepOne[d].children[0][d1]
    //     })
    //     outObj.count = stepOne[d].children.length
    //     outObj.uid = stepOne[d].uid
    //     stepTwo.push(outObj)
    // });

    // ntwrk.filteredData.records.data = stepTwo;













// configs.sankey = {
//     "type": "org.cishell.json.vis.metadata",
//     //This is "nodes" instead of "records" because the parent is a network.
//     "nodes": {
//         "styleEncoding": {
//             "size": {
//                 "attr": "count",
//                 "value": 100
//             },
//             "color": {
//                 "attr": "inRP",
//                 "range": ["#8DC63F", "#F6DFA4"]
//             }
//         },
//         "identifier": {
//             "attr": "id"
//         }
//     },
//     "labels": {
//         "styleEncoding": {
//             "attr": "label",
//             "displayTolerance": 0
//         },
//         "identifier": {
//             "attr": "id"
//         }
//     },
//     "other": {
//         "categories": [
//             "gender", "pared"
//         ]
//     }
// }

// events.sankey = function(ntwrk) {}

// dataprep.sankey = function(ntwrk) {

//  ntwrk.filteredData.records.data = ntwrk.filteredData.records.data.splice(0,100)


//  ntwrk.filteredData.records.data.forEach(function(d, i) {
//      d.count = 1;
//      // Object.keys(d).forEach(function(d1, i1) {
//      //  if (Object.keys(mappings).indexOf(d1) > -1) {
//      //      d[d1] = mappings[d1][d[d1]]
//      //  }
//      // })
//  })
// }
