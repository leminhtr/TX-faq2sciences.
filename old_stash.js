function query(callback, query_to_send){ // appel du callback et send query après le listener

    var vXhr = new XMLHttpRequest(); // créer l'objet XHR;

    vXhr.onreadystatechange = function () {

            if (vXhr.readyState == 4 && (vXhr.status == 200 || vXhr.status==0)) 
            {// Si pas d'erreur -> traitement

                console.log("ready");
                callback(JSON.parse(vXhr.responseText));
                return vXhr.responseText;    

            }
            else {
                console.log("not ready yet")
            }
    };

        vXhr.open("POST", "https://kibana4.kelis.fr/~~es/_search");
        vXhr.setRequestHeader("Authorization", "Basic " + btoa("kelis:Otm8MSeYkWKL"));
        vXhr.withCredentials = true; 

        vXhr.send(JSON.stringify(query_to_send));

};


function readData(response_to_format/*,xlabel,ylabel,div_id : argument de plotMe()*/){ // traite la réponse XHR

    var tmp=[];
    var src;
    //var result,data;
    //var agreg_avg_user, 
    var user_id=[], avg_score=[];

    //var result = JSON.parse(vXhr.responseText);    // response
    // console.log(res);

    var data= response_to_format.hits.hits;   //res.hits

    var agreg_avg_user=response_to_format.aggregations.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]

    //document.getElementById("paragraph").textContent =JSON.stringify(data);   //affiche <p></p> tableau : data=[{index:"", _type:"",...}]

    // Extrait score_scaled de result
    for (var i in data) // Un élément du tableau : data[i]={index:..., _type:...,...,_source: object}
    {
        
        src = data[i]._source; //src= object : {type:..., score_scaled:,... user:...}
        
        tmp.push(src.score_scaled);
    }

    // Extrait avg_score et user_id de result
    for(var i in agreg_avg_user)
    {
        //console.log(agreg_avg_user)
        user_id.push(agreg_avg_user[i].key);
        avg_score.push(agreg_avg_user[i].score_avg.value);
    }

    plotBar(user_id,avg_score,'User_ID','Average score','bar_avg_user_phy', 'Average score per user');
    //return {x : user_id,    y : avg_score};

};
    
function plotBar(x,y,xlabel, ylabel, div_id, title){

//bar chart : avg_score per user
// x.unshift(xlabel); // enfile le label
// y.unshift(ylabel); // enfile le label


// //var bar_avg_user = 
// c3.generate({
//     bindto: '#'+ div_id,
//     data: {
        

//         columns: [           
//             //x, 
//             y            
//         ],
//         type: 'bar'
//     },

//     bar: {
//         width: {
//             width:1 // this makes bar width 50% of length between ticks
//         }
//         // or
//         //width: 100 // this makes bar width 100px
//     }

// });


 var data = [
     {
        //x: x,  // Label axe x
        y: y,   // Données axe y
        name : 'Average score',
        type: 'bar'
     }
 ];
var layout = {
    title: 'Average score per user',    
    showlegend: true
};
Plotly.newPlot('bar_avg_user_bio', data, layout, {displaylogo: false});


}


    query(readData,query_UL_phy_avg);
    //query(readData,query_UL_phy_avg);