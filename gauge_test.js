// Object definition : Conception à revoir si besoin pour modularité. Peut-être intégrer méthodes à l'objet ?
var CLASS_DATA = {
  query:"",
  xData: "",
  yData: "",
  data: "",
  xLabel: "",
  yLabel:"",
  title: "",
  DOM_id: "",
  from:0,
  size:0,
  mean:"",
  mean_label:"",
  stdev:"",
  stdev_upper_label:"",
  stdev_lower_label:"",
  format_result: function(response_to_format){},
  nb_tot:"",
  set_nb_tot:function(response_to_format){
      var nb;
      nb=response_to_format.hits.total; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]         
    return nb;
  },
  update_query_from:function(new_from){this.query.from=new_from}
};

function query(callback, class_data){ // appel du callback et send query après le listener

    var vXhr = new XMLHttpRequest(); // créer l'objet XHR;

    vXhr.onreadystatechange = function () {

            if (vXhr.readyState == 4 && (vXhr.status == 200 || vXhr.status==0)) 
            {// Si pas d'erreur -> traitement

                console.log("ready");
                callback(JSON.parse(vXhr.responseText), class_data);
                return vXhr.responseText;    

            }
            else {
                console.log("not ready yet")
            }
    };

        vXhr.open("POST", "https://kibana4.kelis.fr/~~es/_search");
        vXhr.setRequestHeader("Authorization", "Basic " + btoa("kelis:Otm8MSeYkWKL"));
        vXhr.withCredentials = true; 

        vXhr.send(JSON.stringify(class_data.query));

};


function readData(response_to_format, class_data){ // traite la réponse Xhr
    var xtab=[], ytab=[];
  var data_frame= [];

    var agreg_avg=class_data.format_result(response_to_format);
    // si query est sur avg_user
    //agreg_avg=response_to_format.aggregations.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]     
  
    class_data.nb_tot=class_data.set_nb_tot(response_to_format);
    // Extrait avg_score et user_id de result
    for(var i in agreg_avg)
    {
        xtab.push(agreg_avg[i].key);
        ytab.push(agreg_avg[i].score_avg.value);
        data_frame.push({"x_data" : agreg_avg[i].key,
             "y_data" : agreg_avg[i].score_avg.value});
    }

   
    class_data.xData=xtab;
    class_data.yData=ytab;
    class_data.data=data_frame;
    class_data.size=class_data.yData.length;  // update size of data

    class_data.mean=jStat.mean(class_data.yData);
    class_data.stdev=jStat.stdev(class_data.yData, true); // true : stddev non biaisé
    //plotBar(user_id,avg_score,class_data.xLabel,class_data.yLabel,class_data.DOM_id,class_data.title);
    plotBar(class_data);
};

// Sort by price high to low
// homes.sort(sort_by('price', true, parseInt));

// Sort by city, case-insensitive, A-Z
// homes.sort(sort_by('city', false, function(a){return a.toUpperCase()}));
// var sort_by = function(field, reverse, primer){
//    var key = function (x) {return primer ? primer(x[field]) : x[field]};

//    return function (a,b) {
//    var A = key(a), B = key(b);
//    return ( (A < B) ? -1 : ((A > B) ? 1 : 0) ) * [-1,1][+!!reverse];                  
//    }
// }
// function sortJSON(data, key, way) {
//     return data.sort(function(a, b) {
//         var x = a[key]; var y = b[key];
//         if (way === '123' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
//         if (way === '321') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
//     });
// }
// function sortJSON(data, key) {
//     return data.sort(function (a, b) {
//         var x = a[key];
//         var y = b[key];
//         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//     });
// }

function plotBar(class_data){
   var xtab=[], ytab=[];
  //class_data.xData.sort();
  //class_data.yData.sort();
  //class_data.yData.reverse();

  //class_data.data.sort(sort_by('y_data', true, parseInt));
  // class_data.data=sortJSON(class_data.data,'y');
//  class_data.data.sort(function(a, b) {
//     return parseInt(a.y_data) - parseFloat(b.y_data);
// });

 // for (var i = 0; i in class_data.data; i++) {
 //     xtab.push(class_data.data[i].x_data);
 //     ytab.push(class_data.data[i].y_data);
 //    }

 //    class_data.xData=xtab;
 //    class_data.yData=ytab;

  // var xmin = jStat.min( class_data.xData);
  // var xmax= jStat.max( class_data.xData);

 var data = [
     {
        //x: class_data.xData,  // Données axe x
        x: class_data.yData,   // Données axe y
        name : class_data.yLabel,
        //autobinx:false,
        histnorm:"count",
        histfunc:"avg",
        // xbins: {
        //   end: 2.8, 
        //   size: 0.06, 
        //   start: .5
        // },
        type: 'histogram'
     }

 ];

// var mean_line={
//    name:class_data.mean_label,       
//    type:'lines',
//    x:[0,class_data.size],
//    y:[class_data.mean,class_data.mean],
//    marker: {         // marker is an object, valid marker keys: #scatter-marker
//         color: 'rgb(255,140,0)'
//     }
// }
// data.push(mean_line);  // add to plotly

// var stdev_upper_line={
//    name:class_data.stdev_upper_label,      
//    type:'lines',
//    x:[0,class_data.size],
//  y:[class_data.mean+class_data.stdev,class_data.mean+class_data.stdev],  // moyenne + écart type corrigée
//    marker: {         // marker is an object, valid marker keys: #scatter-marker
//         color: 'rgb(51,255,51)'
//     }
// }
// data.push(stdev_upper_line); //add to plotly

// var stdev_lower_line={
//    name:class_data.stdev_lower_label,      
//    type:'lines',
//    x:[0,class_data.size],
//  y:[class_data.mean-class_data.stdev,class_data.mean-class_data.stdev],  // moyenne - écart type corrigée
//    marker: {         // marker is an object, valid marker keys: #scatter-marker
//         color: 'rgb(255,51,51)'
//     }
// }
// data.push(stdev_lower_line);

var layout = {
    title: class_data.title,    
    showlegend: false,
    sort:true,

    //yaxis: {range: [0,1]} // setting manual range of axes
  //    shapes: [
  //   //Line Horizontal
  //   {
  //     type: 'line',
        // xref: 'paper',
        // x0: 0,
        // y0: class_data.mean,
        // x1: 1,
        // y1: class_data.mean,
  //     line: {
  //       color: 'rgb(50, 171, 96)',
  //       width: 3      }
  //   }
  // ]
};

Plotly.newPlot(class_data.DOM_id, data, layout, {displaylogo: false}, {showLink: false});

} //end function plotBar

// --------------------------------------------------------------------------------------------------
var divs = document.getElementsByTagName('div');

//---------------------- AVERAGE SCORE PER USER ID ---------------------------------------------------

var bar_avg_user_phy= Object.create(CLASS_DATA);
bar_avg_user_phy.from=0;
bar_avg_user_phy.size=800;

bar_avg_user_phy.query={
  "aggs": {
    "result": {
      "filter": {
        "bool": {
          "must": [
            {
              "match": {
                "type": "XContentApi"
              }
            },
            {
              "match": {
                "depot_path": "UL-Phy01"
              }
            },
                        {
              "match": {
                "depot_path": "UL"
              }
            },
                        {
              "match": {
                "depot_path": "Partenaires"
              }
            },

            {
              "exists": {
                "field": "score_scaled"
              }
            }
            
          ],
          "must_not":
                [
                  {"match": {"question_id":"qgMx9nWg3feUknCfwecgli"}},
                  {"match": {"question_id":"pky45GVJlvk0YYYe0wiTxe"}},
                  {"match": {"question_id":"KDiQi0UNikeZBzySvmA2k"}},
                  {"match": {"question_id":"Dvj5AqVq4RiIbIFWaJuSud"}},
                  {"match": {"question_id":"qVTVybVQlxckqCv1EI54h"}},
                  {"match": {"question_id":"udFJDEATISe7oQfqnd9Kki"}},
                    {"match": {"depot_path":"Bio"}}
                ]
        }
      },
      "aggs": {
        "avg_user": {
          "terms": {
            "field": "user.raw",
            "size": bar_avg_user_phy.size,
            "order":{"score_avg" : "desc"}
          },
          "aggs": {
            "score_avg": {
              "avg": {
                "field": "score_scaled"
              }
            }
          }
        }
      }
    }
  }
}

bar_avg_user_phy.xLabel="étudiant";
bar_avg_user_phy.yLabel="Score moyen d'un étudiant";
bar_avg_user_phy.title="Score moyen d'un étudiant au test de physique";
bar_avg_user_phy.mean_label="Score total moyen des étudiants";
bar_avg_user_phy.stdev_lower_label="Score total moyen des étudiants - l'écart type";
bar_avg_user_phy.stdev_upper_label="Score total moyen des étudiants + l'écart type";
bar_avg_user_phy.DOM_id="bar_avg_user_phy";
bar_avg_user_phy.format_result= function avg_user_format(response_to_format){
    var agreg_avg=[];
    agreg_avg=response_to_format.aggregations.result.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]          

    return agreg_avg;
}

query(readData,bar_avg_user_phy); //appel serveur + plot



var bar_avg_user_bio= Object.create(CLASS_DATA);
bar_avg_user_bio.from=0;
bar_avg_user_bio.size=800;  // size inconnu avant requête

bar_avg_user_bio.query={
  "aggs": {
    "result": {
      "filter": {
        "bool": {
          "must": [
            {
              "match": {
                "type": "XContentApi"
              }
            },
            {
              "match": {
                "depot_path": "UL-Bio"
              }
            },
                        {
              "match": {
                "depot_path": "UL"
              }
            },
                        {
              "match": {
                "depot_path": "Partenaires"
              }
            },

            {
              "exists": {
                "field": "score_scaled"
              }
            }
            
          ],
          "must_not":
                [
          {"match" : {"question_id":"j74GTDxCdUh1AhUJbxzOCg"} },
          {"match" : {"question_id":"i6nRY2FhjtlKF4kAuRVlLi"} },
          {"match" : {"question_id":"Ro8Bn94sH5fiObRDLGMDub"} },
          {"match" : {"question_id":"AXGE9teKhMdo4j0BsK6x8f"} },
          {"match" : {"question_id":"BdYLqQ15ObfDNWH4r8ES1d"} },
          {"match" : {"question_id":"XSSBiN8sCL10gnc6XsIUi"} },
          {"match" : {"question_id":"ImUQEzT8sjgXe0C5WIYD9g"} },
          {"match" : {"question_id":"QWGy9VVCetknLGk0eUfkvc"} },
          {"match" : {"question_id":"LWF7Tquh7XgWIQLImXgie"} },
          {"match" : {"question_id":"XSSBiN8sCL10gnc6XsIUi"} },                 
          {"match": {"depot_path":"Phy01"}}
                ]
        }
      },
      "aggs": {
        "avg_user": {
          "terms": {
            "field": "user.raw",
            "size": bar_avg_user_bio.size,
            "order":{"score_avg" : "desc"}
          },
          "aggs": {
            "score_avg": {
              "avg": {
                "field": "score_scaled"
              }
            }
          }
        }
      }
    }
  }
}
bar_avg_user_bio.xLabel="étudiant";
bar_avg_user_bio.yLabel="Score moyen d'un étudiant";
bar_avg_user_bio.title="Score moyen d'un étudiant au test de biologie";
bar_avg_user_bio.mean_label="Score total moyen des étudiants";
bar_avg_user_bio.stdev_lower_label="Score total moyen des étudiants - l'écart type";
bar_avg_user_bio.stdev_upper_label="Score total moyen des étudiants + l'écart type";
bar_avg_user_bio.DOM_id="bar_avg_user_bio";
bar_avg_user_bio.format_result= function avg_user_format(response_to_format){
    var agreg_avg=[];
    agreg_avg=response_to_format.aggregations.result.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]          

    return agreg_avg;
}

query(readData,bar_avg_user_bio);


//*****************************************************************************

function plotGauge(class_data){

// data1
var data1 = {
  x:class_data.yData[0] ,
  //y: y1,
  type: "histogram",
  name:class_data.xLabel[0],
  opacity:0.5,
  marker: {
    color: 'orange',
  },
};

// data2
var data2 = {
  x: class_data.yData[1],
  //y: y2,
  type: "histogram",
  opacity:0.5,
  name:class_data.xLabel[1],
  marker: {
    color: 'green',
  },
};

var data = [data1, data2];
var layout = {barmode: "overlay",
        title: class_data.title,
        xaxis:{title:class_data.xLabel[2]},
        yaxis:{title:class_data.yLabel},
        showlegend: true};

Plotly.newPlot(class_data.DOM_id, data, layout, {displaylogo: false}, {showLink: false});

} //end function plot


// var level=100;

// var gauge_avg_user= Object.create(CLASS_DATA);
// gauge_avg_user.yLabel="Nombre d'étudiants ayant obtenu ce score";
// gauge_avg_user.xLabel=[bar_avg_user_phy.title,bar_avg_user_bio.title];
// gauge_avg_user.xLabel.push("Score moyen des étudiants");

// //gauge_avg_user.yLabel=[bar_avg_user_phy.yLabel,bar_avg_user_bio.yLabel];

// gauge_avg_user.title="Histogramme : Score moyen des étudiants aux tests de physique et de biologie";
// gauge_avg_user.DOM_id="gauge_avg_user";

// setTimeout(function()
//   {gauge_avg_user.xData=[bar_avg_user_phy.xData,bar_avg_user_bio.xData];
//   gauge_avg_user.yData=[bar_avg_user_phy.yData,bar_avg_user_bio.yData];
//   plotGauge(gauge_avg_user);
//   },
//   6000);
// Enter a speed between 0 and 180
var level = 175;

// Trig to calc meter point
var degrees = 180 - level,
   radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
   pathX = String(x),
   space = ' ',
   pathY = String(y),
   pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
  marker: {size: 28, color:'850000'},
  showlegend: false,
  name: 'speed',
  text: level,
  hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
      'Slow', 'Super Slow', ''],
  textinfo: 'text',
  textposition:'inside',    
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
             'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
             'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
             'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Gauge</b> <br> Speed 0-100',
  height: 1000,
  width: 1000,
  xaxis: {zeroline:false, showticklabels:false,
       showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
       showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('myDiv', data, layout);