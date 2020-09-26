
//a function to construct the plots
function buildPlot(id) {
    // create a variable to select the ID within the sample section of the json
    // the variable will be the passed ID number subtracted from a calculated value so that 
    // every ID is congruent in a list from 0 - 152
    // that way every call to a different ID is guaranteed to return data for the plots
    var i;
    if (id == 940 || id == 941) {
        i = id - 940;
    }
    else if (id >= 943 && id <= 950) {
        i = id - 941;
    }
    else if (id >= 952 && id <= 956) {
        i = id - 942;
    }
    else if (id >= 958 && id <= 964) {
        i = id - 943;
    }
    else if (id >= 966 && id <= 975) {
        i = id - 944;
    }
    else if (id == 978) {
        i = id - 946;
    }
    else if (id >= 1233 && id <= 1238) {
        i = id - 1200;
    }
    else if (id == 1242 || id == 1243) {
        i = id - 1203;
    }
    else if (id == 1246) {
        i = id - 1205;
    }
    else if (id == 1253 || id == 1254) {
        i = id - 1211;
    }
    else if (id >= 1258 && id <= 1260) {
        i = id - 1214;
    }
    else if (id == 1264 || id == 1265) {
        i = id - 1217;
    }
    else if (id == 1273) {
        i = id - 1224;
    }
    else if (id >= 1275 && id <= 1298) {
        i = id - 1225;
    }
    else if (id >= 1308 && id <= 1310) {
        i = id - 1234;
    }
    else if (id == 1374) {
        i = id - 1297;
    }
    else if (id == 1415) {
        i = id - 1337;
    }
    else if (id == 1439) {
        i = id - 1360;
    }
    else if (id == 1441) {
        i = id - 1361;
    }
    else if (id == 1443) {
        i = id - 1362;
    }
    else if (id == 1486 || id == 1487) {
        i = id - 1404;
    }
    else if (id >= 1489 && id <= 1491) {
        i = id - 1405;
    }
    else if (id == 1494 || id == 1495) {
        i = id - 1407;
    }
    else if (id == 1497) {
        i = id - 1408;
    }
    else if (id >= 1499 && id <= 1508) {
        i = id - 1409;
    }
    else if (id >= 1510 && id <= 1519) {
        i = id - 1410;
    }
    else if (id == 1521) {
        i = id - 1411;
    }
    else if (id == 1524) {
        i = id - 1413;
    }   
    else if (id == 1526 || id == 1527) {
        i = id - 1414;
    }
    else if (id >= 1530 && id <= 1537) {
        i = id - 1416;
    }
    else if (id >= 1539 && id <= 1558) {
        i = id - 1417;
    }
    else if (id >= 1561 && id <= 1564) {
        i = id - 1419;
    }
    else if (id >= 1572 && id <= 1574) {
        i = id - 1426;
    }
    else if (id == 1576 || id == 1577) {
        i = id - 1427;
    }
    else if (id == 1581) {
        i = id - 1430;
    }
    else if (id == 1601) {
        i = id - 1449;
    }
    // read the json data (sample values, ids, and labels) and save it to the console log
    d3.json("samples.json").then (d =>{
            console.log(d);
            var ids = d.samples[i].otu_ids;
            console.log(ids);
            // slice up to the first 10 results from the bacterial samples, and put them in reverse order
            var sampleValues1 =  d.samples[i].sample_values.slice(0,10).reverse();
            console.log(sampleValues1);
            var labels =  d.samples[i].otu_labels.slice(0,10);
            console.log (labels);

            // map the otu_ids to the sample values 
            var top10 = d.samples[i].otu_ids.slice(0,10).reverse();
            var otuID = top10.map(d => "OTU " + d);
            console.log(`OTU IDS: ${otuID}`);
            var labels =  d.samples[i].otu_labels.slice(0,10);
            console.log(`OTU Labels: ${labels}`);
            // create the trace for the bar chart, including horizontal axis and a blue color
            var Trace1 = {
                x: sampleValues1,
                y: otuID,
                text: labels,
                marker: {
                color: "#1F77B4"},
                type:"bar",
                orientation: "h",
            };
            var data1 = [Trace1];
    
            var layout1 = {
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
            
            // call plotly to construct the bar chart 
            Plotly.newPlot("bar", data1, layout1);

            var sampleValues2 = d.samples[i].sample_values;
            // create the second trace for the bubble chart
            var Trace2 = {
                x: ids,
                y: sampleValues2,
                mode: "markers",
                marker: {
                    size: d.samples[i].sample_values,
                    color: d.samples[i].otu_ids
                },
                text:  d.samples[i].otu_labels
    
            };
            
            var layout2 = {
            height: 600,
            width: 1000
            };
    
            var data2 = [Trace2];
            
            // call plotly to construct the bubble chart
            Plotly.newPlot("bubble", data2, layout2); 
        
        });
    }  

    // function to collect the metadata for each ID
    function newData(id) {
        
        // read the json file to obtain the metadata 
        d3.json("samples.json").then((d)=> {
            
            // store the metadata in a variable and save it to the console
            var metadata = d.metadata;
            console.log(metadata);
            
           // filter the metadata by the selected ID (converting it to a string)
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           // select the html code where the panel is located
           var demographics = d3.select("#sample-metadata");
           // write demographics into html 
           demographics.html("");
           // use Object.entries to get an enumerable list of key strings for the object 
           // use foreEach to iterate through the object and use the key to collect each attribute
           Object.entries(result).forEach((k) => {
                // fill in the actual metadata on the panel by writing it as a header    
                demographics.append("h5").text(k[0].toUpperCase() + ": " + k[1] + "\n");    
            });
        });
    }
    // function for change event (matching the change event in the html file)
    function optionChanged(id) {
        buildPlot(id);
        newData(id);
    }
    
    // function to initialize the webpage (using ID 940 as a default)
    function init() {
        // a variable to select the dropdown menu 
        var dropdown = d3.select("#selDataset");
    
        // read the json and save it to the console
        d3.json("samples.json").then((d)=> {
            console.log(d);
    
            // iterate through the names in the json file and append their values to the html 
            d.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // call the functions to build the plots and to update the metadata
            buildPlot(d.names[0]);
            newData(d.names[0]);
        });
    }
    // the only actual main() of the code, simply calling the initializing function, which will call the other
    init();