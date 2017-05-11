function loadScript(url, callback)
{
    // Prépare l'ajoute du script au head
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
 
    // Lance une callback à la fin de la tâche
    script.onreadystatechange = callback;
    script.onload = callback;
 
    // Ajoute le script
    head.appendChild(script);
}

loadScript("es_query.js", function(){
    console.log("Script charge!");
});

// Object definition : Conception à revoir si besoin pour modularité. Peut-être intégrer méthodes à l'objet ?
var CLASS_DATA = {
	query:"",
	xData: "",
	yData: "",
	xLabel: "",
	yLabel:"",
	title: "",
	DOM_id: "",
	nb_current:0,
	mean:"",
	mean_label:"",
	stdev:"",
	stdev_upper_label:"",
	stdev_lower_label:"",
	format_result: function(response_to_format){}

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
    var agreg_avg=class_data.format_result(response_to_format);
    
    // si query est sur avg_user
    //agreg_avg=response_to_format.aggregations.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]    	
  

    // Extrait avg_score et user_id de result
    for(var i in agreg_avg)
    {
        //console.log(agreg_avg_user)
        xtab.push(agreg_avg[i].key);
        ytab.push(agreg_avg[i].score_avg.value);
    }

    class_data.xData=xtab;
    class_data.yData=ytab;

    class_data.mean=jStat.mean(ytab);
    class_data.stdev=jStat.stdev(ytab, true);	// true : stddev non biaisé
    //plotBar(user_id,avg_score,class_data.xLabel,class_data.yLabel,class_data.DOM_id,class_data.title);
    plotBar(class_data);
};
    
function plotBar(class_data){

 var data = [
     {
        //x: class_data.xData,  // Données axe x
        y: class_data.yData,   // Données axe y
        name : class_data.yLabel,
        type: 'bar'
     }

 ];

var mean_line={
 	name:class_data.mean_label,     	
 	type:'lines',
 	x:[0,100],
 	y:[class_data.mean,class_data.mean],
 	marker: {         // marker is an object, valid marker keys: #scatter-marker
        color: 'rgb(255,140,0)'
    }
}
data.push(mean_line);	// add to plotly

var stdev_upper_line={
 	name:class_data.stdev_upper_label,     	
 	type:'lines',
 	x:[0,100],
	y:[class_data.mean+class_data.stdev,class_data.mean+class_data.stdev],	// moyenne + écart type corrigée
 	marker: {         // marker is an object, valid marker keys: #scatter-marker
        color: 'rgb(51,255,51)'
    }
}
data.push(stdev_upper_line);	//add to plotly

var stdev_lower_line={
 	name:class_data.stdev_lower_label,     	
 	type:'lines',
 	x:[0,100],
	y:[class_data.mean-class_data.stdev,class_data.mean-class_data.stdev],	// moyenne - écart type corrigée
 	marker: {         // marker is an object, valid marker keys: #scatter-marker
        color: 'rgb(255,51,51)'
    }
}
data.push(stdev_lower_line);

//  var avgObj={
//   name: 'average organization',
//   type: 'scatter',
//   x: [60],
//   y: [""],
//   orientation: 'v',
//   type: 'bar'
// }
var layout = {
    title: class_data.title,    
    showlegend: true
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

Plotly.newPlot(class_data.DOM_id, data, layout, {displaylogo: false});

}

// --------------------------------------------------------------------------------------------------
var divs = document.getElementsByTagName('div');

//---------------------- AVERAGE SCORE PER USER ID ---------------------------------------------------
// Bar chart : Average score per user (physique)
var bar_avg_user_phy= Object.create(CLASS_DATA);
bar_avg_user_phy.query=query_UL_phy_avg_user_id;
bar_avg_user_phy.xLabel="User ID";
bar_avg_user_phy.yLabel="Average Score of user";
bar_avg_user_phy.title="Average Score (Physique) per User ID";
bar_avg_user_phy.mean_label="Average score of test";
bar_avg_user_phy.stdev_lower_label="Average score - standard deviation";
bar_avg_user_phy.stdev_upper_label="Average score + standard deviation";
bar_avg_user_phy.DOM_id="bar_avg_user_phy";
bar_avg_user_phy.format_result= function avg_user_format(response_to_format){
    var agreg_avg=[];
    agreg_avg=response_to_format.aggregations.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]    	    

    return agreg_avg;
}

query(readData,bar_avg_user_phy);


//Bar chart : Average score per user (biologie)
var bar_avg_user_bio= Object.create(CLASS_DATA);
bar_avg_user_bio.query=query_UL_Bio_avg_user_id;
bar_avg_user_bio.xLabel="User ID";
bar_avg_user_bio.yLabel="Average Score of user";
bar_avg_user_bio.title="Average Score (Biologie) per User ID";
bar_avg_user_bio.mean_label="Average score of test";
bar_avg_user_bio.stdev_lower_label="Average score - standard deviation";
bar_avg_user_bio.stdev_upper_label="Average score + standard deviation";
bar_avg_user_bio.DOM_id="bar_avg_user_bio";
bar_avg_user_bio.format_result= function avg_user_format(response_to_format){
    var agreg_avg=[];
    agreg_avg=response_to_format.aggregations.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]    	    

    return agreg_avg;
}

query(readData,bar_avg_user_bio);



//---------------------- AVERAGE SCORE PER QUESTION ID ---------------------------------------------------
// Bar chart : Average score per question (physique)
var bar_avg_quest_phy= Object.create(CLASS_DATA);
bar_avg_quest_phy.query=query_UL_phy_avg_quest_id;
bar_avg_quest_phy.xLabel="Question ID";
bar_avg_quest_phy.yLabel="Average Score of Question";
bar_avg_quest_phy.title="Average Score (Physique) per Question ID";
bar_avg_quest_phy.mean_label="Average score of test";
bar_avg_quest_phy.stdev_lower_label="Average score - standard deviation";
bar_avg_quest_phy.stdev_upper_label="Average score + standard deviation";
bar_avg_quest_phy.DOM_id="bar_avg_quest_phy";
bar_avg_quest_phy.format_result= function avg_quest_format(response_to_format){
    var agreg_avg=[];
    agreg_avg=response_to_format.aggregations.avg_quest.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]    	    

    return agreg_avg;
}

query(readData,bar_avg_quest_phy);


//Bar chart : Average score per question (biologie)
var bar_avg_quest_bio= Object.create(CLASS_DATA);
bar_avg_quest_bio.query=query_UL_Bio_avg_quest_id;
bar_avg_quest_bio.xLabel="User ID";
bar_avg_quest_bio.yLabel="Average Score of Question";
bar_avg_quest_bio.title="Average Score (Biologie) per Question ID";
bar_avg_quest_bio.mean_label="Average score of test";
bar_avg_quest_bio.stdev_lower_label="Average score - standard deviation";
bar_avg_quest_bio.stdev_upper_label="Average score + standard deviation";
bar_avg_quest_bio.DOM_id="bar_avg_quest_bio";
bar_avg_quest_bio.format_result= function avg_quest_format(response_to_format){
    var agreg_avg=[];
    agreg_avg=response_to_format.aggregations.avg_quest.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]    	    

    return agreg_avg;
}

query(readData,bar_avg_quest_bio);


































