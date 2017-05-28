var dashboard = {
	graphs : [],	// graphs list

	// Constructeur de classe graph_data
    graph_data : function  (pQuery_body, pxLabel, pyLabel, pTitle, pDOM_id, pQuery_size, pMean_label, pStdev_label, pData_path){
		this.query_body=pQuery_body;	// corps de la query
		this.xData=[];	// data x
		this.yData={};	// data y	: objet {attribut : data1, attribut2: data2, ...} => Different pour chaque graph
		this.data=[];	// à voir si utile
		this.xLabel=pxLabel;	// label x
		this.yLabel=pyLabel;	// label y
		this.title=pTitle;		// titre
		this.DOM_id=pDOM_id;	// DOM id
		this.from=0;			// debut
		this.query_size=pQuery_size;	// taille de la requête : objet {attribut : sizeof_data, attribut2: sizeof_data, ...} => Different pour chaque graph
		this.yMean_label= pMean_label;	// label yMean
		this.yStdev_label= pStdev_label;	//label yStdev
		this.nb_tot= 0;	// à voir si utile
		this.data_path=pData_path,	// objet {attribut : path_to_data, attribut2: path_to_data, ...} => Different pour chaque graph

        this.set_nb_tot=function(response_to_format){
            this.query_size=response_to_format.hits.total; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]
            return this.query_size;
        },
        //update_query_from= function(new_from){this.query.from=new_from};

		this.set_yData= function(data_response) {},	// construit l'objet yData different pour chaque graph_data

        this.format_result = function(response_to_format, graph_data){
        	return dashboard.get_obj_path_value(response_to_format, graph_data.data_path);
		};	// get format_result


        this.plotMe = function(graph_data){};

    },	//fin constructeur



	query_thibault : function(){
		var aggQId =  {"question_id":{"terms" : {"field" : "question_id.raw","size":50}}};
		var aggUser =  {"user":{"terms" : {"field" : "user.raw","size":800}}};
		vQUery = {};
		vQUery.aggs = aggUser;
		aggUser.aggs = aggQId;

		//...
	},

	common_path:{aggs: "aggregations",
				quest:"questions",
				users:"users",
				buckets:"buckets.key",
				nb_doc:"doc_count",
				first_hit:"hits.hits[0]"},

	query_list:{avg_user_phy:
        {
            "query": {
                "bool": {
                    "must": [
                        {
                            "terms": {
                                "_index": [
                                    "faq2sciencesdistrib-2016.09.13",
                                    "faq2sciencesdistrib-2016.09.14",
                                    "faq2sciencesdistrib-2016.09.15",
                                    "faq2sciencesdistrib-2016.09.16",
                                    "faq2sciencesdistrib-2016.09.19",
                                    "faq2sciencesdistrib-2016.09.20",
                                    "faq2sciencesdistrib-2016.09.21",
                                    "faq2sciencesdistrib-2016.09.22",
                                    "faq2sciencesdistrib-2016.09.24",
                                    "faq2sciencesdistrib-2016.09.26"
                                ]
                            }
                        },
                        {
                            "term": {
                                "depot_path.raw": "/Partenaires/UL/UL-Phy01"
                            }
                        },
                        {
                            "term": {
                                "verb.raw": "scored"
                            }
                        }
                    ],
                    "must_not": [
                        {
                            "terms": {
                                "question_id.raw": [
                                    "qgMx9nWg3feUknCfwecgli",
                                    "pky45GVJlvk0YYYe0wiTxe",
                                    "KDiQi0UNikeZBzySvmA2k",
                                    "Dvj5AqVq4RiIbIFWaJuSud",
                                    "qVTVybVQlxckqCv1EI54h",
                                    "udFJDEATISe7oQfqnd9Kki"
                                ]
                            }
                        }
                    ]
                }
            },
            "size": 0,
            "aggs": {
                "users": {
                    "terms": {
                        "field": "user.raw",
                        "size": 800
                    },
                    "aggs": {
                        "questions": {
                            "terms": {
                                "field": "question_id.raw",
                                "size": 50
                            },
                            "aggs": {
                                "max_time": {
                                    "top_hits": {
                                        "size": 1,
                                        "fields": [
                                            "timestamp",
                                            "score_scaled"
                                        ],
                                        "sort": [
                                            {
                                                "timestamp": {
                                                    "order": "desc"
                                                }
                                            }
                                        ]
                                    }
                                },
                                "min_time": {
                                    "top_hits": {
                                        "size": 1,
                                        "fields": [
                                            "timestamp"
                                        ],
                                        "sort": [
                                            {
                                                "timestamp": {
                                                    "order": "asc"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }},

	init : function(){	// mettre instance dans fonction
		var vAvg_user_phy = new dashboard.graph_data(dashboard.query_list.avg_user_phy,
			"étudiant",
			"Score moyen d'un étudiant",
			"Score moyen d'un étudiant au test de physique",
			"bar_avg_user_phy",
			{nb_user:800, nb_quest:40},	// inutile si déjà dans query ?
			"Score total moyen des étudiants",
			" l'écart type",
//yData :			//{users:[], questions:[], nb_change_tot:0, nb_change:[], max_time:[], min_time:[], score_scaled:[]},
			{users:"aggregations.users.buckets",// = tableau de .key (user_id)
            nb_change_tot:".doc_count",
            questions:".questions.buckets",	// = tableau de .key (question_id)
			nb_change_per_quest:".doc_count",
			max_time:".max_time.hits.hits",	// .max_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
            max_time_val:".fields.max_time",// temps où user à terminé une question
            min_time:".min_time.hits.hits",	//.min_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
            min_time_val:".fields.timestamp",	// temps où user à commencé une question
			score_scaled:".fields.score_scaled"}	//score de user à une question
			);

		vAvg_user_phy.plotMe=dashboard.plotBar;

		vAvg_user_phy.set_yData= function(data_response) {
			vAvg_user_phy.yData ={	//nb changement, temps de réponse, score
				//users:[],	// liste des users
				questions:[],	// listes des questions répondue pour chaque user
				nb_change_tot:[],	// nombre de changement de réponses totales sur un questionnaire pour chaque user
				nb_change:[],	// nombre de changement de réponses pour chaque question répondue, pour chaque user
				avg_nb_change:[],	// moyenne de changement de réponse par user
				stdev_nb_change:[],	// écart type de changement de réponse apr user
				max_time:[],	// temps de la dernière réponse pour chaque question répondue, pour chaque user
				min_time:[],	//temps de la première réponse pour chaque question répondue, pour chaque user
				delta_time:[],	//temps de réponse pour chaque question répondue, pour chaque user
				avg_time:[],		//temps moyen de réponse pour chaque question répondue, pour chaque user
				stdev_time:[],	//écart type de changement de réponse par uset
				pre_score_scaled:[],	//score de chaque question répondue, pour chaque user
				avg_score_scaled:[],	//score moyen d'un questionnaire, pour chaque user
				stdev_score_scaled:[]	//score moyen d'un questionnaire, pour chaque user
			};

			//DATA.aggregations.users.buckets[]
            var toFormat_data=dashboard.get_obj_path_value(data_response,vAvg_user_phy.data_path.users);

            for(var i=0, nb_user=toFormat_data.length; i<nb_user;i++){	// pour chaque user faire
                var data= toFormat_data[i];

                //DATA.aggregations.users.buckets[].key = user_id
                vAvg_user_phy.xData[i]=data.key;

                //DATA.aggregations.users.buckets[].question_id = nb tentatives totales de user
                vAvg_user_phy.yData.nb_change_tot[i]=data.doc_count;

                //DATA.aggregations.users.buckets[].length = nb questions répondu par user
                var nb_quest= data.questions.buckets.length;

                var temp_questions=[], temp_nb_change=[], temp_max_time=[], temp_min_time=[], temp_delta_time=[], temp_pre_score_scaled=[];

            	for(var j=0; j<nb_quest;j++){	// pour chaque question répondu par user faire
					//DATA.aggregations.questions.buckets[].questions.buckets[].
            		var nested_data=data.questions.buckets[j];

                    //DATA.aggregations.questions.buckets[].questions.buckets[].doc_count = nb de changement de user pour une question
                    //vAvg_user_phy.yData.nb_change[i][j]=nested_data.doc_count;
					temp_nb_change.push(nested_data.doc_count);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = temps de la dernière réponse à une question
                    //vAvg_user_phy.yData.max_time[i][j]=nested_data.max_time.hits.hits[0].fields.timestamp[0];
                    temp_max_time.push(nested_data.max_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].min_time.hits.hits[0].fields.timestamp[0] = temps de la première réponse à une question
            		//vAvg_user_phy.yData.min_time[i][j]=nested_data.min_time.hits.hits[0].fields.timestamp[0];
            		temp_min_time=nested_data.min_time.hits.hits[0].fields.timestamp[0];

                    //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = score de la dernière réponse à une question
            		//vAvg_user_phy.yData.pre_score_scaled[i][j]=nested_data.max_time.hits.hits[0].fields.score_scaled[0];
            		temp_pre_score_scaled.push(nested_data.max_time.hits.hits[0].fields.score_scaled[0]);

				}
				vAvg_user_phy.yData.questions.push(temp_questions);
				vAvg_user_phy.yData.nb_change.push(temp_nb_change);
				vAvg_user_phy.yData.max_time.push(temp_max_time);
				vAvg_user_phy.yData.min_time.push(temp_min_time);
				vAvg_user_phy.yData.delta_time.push(temp_delta_time);
				vAvg_user_phy.yData.pre_score_scaled.push(temp_pre_score_scaled);
			}

			vAvg_user_phy.yData.delta_time=dashboard.calc_delta_time(vAvg_user_phy.yData.max_time,vAvg_user_phy.yData.min_time); //delta_time= max_time-min_time
			vAvg_user_phy.yData.avg_time=dashboard.calc_avg_nested(vAvg_user_phy.yData.delta_time);
			vAvg_user_phy.yData.stdev_time=dashboard.calc_unbiaised_stdev_nested(vAvg_user_phy.yData.delta_time);

            vAvg_user_phy.yData.avg_nb_change=dashboard.calc_avg_nested(vAvg_user_phy.yData.nb_change);
            vAvg_user_phy.yData.stdev_nb_change=dashboard.calc_unbiaised_stdev_nested(vAvg_user_phy.yData.nb_change);

            vAvg_user_phy.yData.avg_score_scaled=dashboard.calc_avg_nested(vAvg_user_phy.yData.pre_score_scaled);
            vAvg_user_phy.yData.stdev_score_scaled=dashboard.calc_unbiaised_stdev_nested(vAvg_user_phy.yData.pre_score_scaled);

        };

		dashboard.send_Xhr(dashboard.readData, vAvg_user_phy);


        var vDatas2 = {value:2};

        dashboard.graphs.push(new dashboard.Data(vDatas));	// ajout du graph dans a liste de graphs

        dashboard.graphs.push(new dashboard.Data(vDatas2));

		}


	};

// fin namespace

dashboard.Data = function(data){	//déclaration d'un constructeur d'objet : new_object= new dashboard.Data(data)
	this.graph = data;
};
dashboard.Data.prototype.buildGraph = function(){	// méthode de classe
	//
};
//window.onload = dashboard.init;

dashboard.send_Xhr= function(callback, graph_data){ // appel du callback et send query après le listener

    var vXhr = new XMLHttpRequest(); // créer l'objet XHR;

    vXhr.onreadystatechange = function () {

        if (vXhr.readyState == 4 && (vXhr.status == 200 || vXhr.status==0))
        {// Si pas d'erreur -> traitement

            console.log("ready");
            callback(JSON.parse(vXhr.responseText), graph_data);
            return vXhr.responseText;

        }
        else {
            console.log("not ready yet")
        }
    };

    vXhr.open("POST", "https://kibana4.kelis.fr/~~es/_search");
    vXhr.setRequestHeader("Authorization", "Basic " + btoa("kelis:Otm8MSeYkWKL"));
    vXhr.withCredentials = true;

    vXhr.send(JSON.stringify(graph_data.query_body));

};

dashboard.get_obj_path_value = function(obj, path){	//get value of object path
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

dashboard.readData= function (response_to_format, graph_data){ // traite la réponse Xhr
    var xtab=[], ytab=[];
	var data_frame= [];

    var result=graph_data.format_result(response_to_format, graph_data);
    // si query est sur avg_user
    //agreg_avg=response_to_format.aggregations.avg_user.buckets; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]

    graph_data.nb_tot=graph_data.set_nb_tot(response_to_format);
    // Extrait avg_score et user_id de result
    for(var i in result)
    {
        xtab.push(result[i].key);
        ytab.push(result[i].score_avg.value);
        data_frame.push({"x_data" : result[i].key,
            "y_data" : result[i].score_avg.value});
    }

    graph_data.set_yData();

    // graph_data.xData=xtab;
    // graph_data.yData=ytab;
    // graph_data.data=data_frame;
    graph_data.query_size=graph_data.yData.length;	// update size of data

    graph_data.mean=jStat.mean(graph_data.yData);
    graph_data.stdev=jStat.stdev(graph_data.yData, true);	// true : stddev non biaisé
    //plotBar(user_id,avg_score,graph_data.xLabel,graph_data.yLabel,graph_data.DOM_id,graph_data.title);
	graph_data.plotMe();
};


dashboard.plotBar= function(graph_data){
    var xtab=[], ytab=[];
    //graph_data.xData.sort();
    //graph_data.yData.sort();
    //graph_data.yData.reverse();

    //graph_data.data.sort(sort_by('y_data', true, parseInt));
    // graph_data.data=sortJSON(graph_data.data,'y');
// 	graph_data.data.sort(function(a, b) {
//     return parseInt(a.y_data) - parseFloat(b.y_data);
// });

    // for (var i = 0; i in graph_data.data; i++) {
    //    	xtab.push(graph_data.data[i].x_data);
    //    	ytab.push(graph_data.data[i].y_data);
    //    }

    //    graph_data.xData=xtab;
    //    graph_data.yData=ytab;

    // var xmin = jStat.min( graph_data.xData);
    // var xmax= jStat.max( graph_data.xData);

    var data = [
        {
            //x: graph_data.xData,  // Données axe x
            y: graph_data.yData,   // Données axe y
            name : graph_data.yLabel,
            type: 'bar'
        }

    ];

    var mean_line={
        name:graph_data.mean_label,
        type:'lines',
        x:[0,graph_data.query_size],
        y:[graph_data.mean,graph_data.mean],
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(255,140,0)'
        }
    }
    data.push(mean_line);	// add to plotly

    var stdev_upper_line={
        name:graph_data.stdev_upper_label,
        type:'lines',
        x:[0,graph_data.query_size],
        y:[graph_data.mean+graph_data.stdev,graph_data.mean+graph_data.stdev],	// moyenne + écart type corrigée
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(51,255,51)'
        }
    }
    data.push(stdev_upper_line);	//add to plotly

    var stdev_lower_line={
        name:graph_data.stdev_lower_label,
        type:'lines',
        x:[0,graph_data.query_size],
        y:[graph_data.mean-graph_data.stdev,graph_data.mean-graph_data.stdev],	// moyenne - écart type corrigée
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
        title: graph_data.title,
        showlegend: true,
        yaxis: {range: [0,1]}	// setting manual range of axes
        //    shapes: [
        //   //Line Horizontal
        //   {
        //     type: 'line',
        // xref: 'paper',
        // x0: 0,
        // y0: graph_data.mean,
        // x1: 1,
        // y1: graph_data.mean,
        //     line: {
        //       color: 'rgb(50, 171, 96)',
        //       width: 3      }
        //   }
        // ]
    };

    Plotly.newPlot(graph_data.DOM_id, data, layout, {displaylogo: false}, {showLink: false});

}//end function plotBar


dashboard.calc_delta_time= function(tab1, tab2){
	var delta_time=[];

	for(var i=0; i<tab1.length;i++) {
		var temp=[];

        for (var j = 0; j < tab1[i].length; j++) {
            temp.push(Math.abs(tab1[i][j] - tab2[i][j]));
        }
        delta_time.push(temp);
    }
	return delta_time;
};

dashboard.calc_avg_nested= function(tab){
    var avg_nested=[];

    for(var i=0; i<tab.length;i++) {
    	var sum=0;
		var temp=tab[i];

		temp.forEach(function(temp){
			sum+=temp;
		});

		var n=temp.length;
		avg_nested.push((sum/n));

    }
    return avg_nested;
};

dashboard.calc_unbiaised_stdev_nested= function(tab){	//= sqrt( (1/n-1)  * (sum(x_i^2) - n* avg^2))
    var avg=dashboard.calc_avg_nested(tab);
	var stdev=[];

    for(var i=0; i<tab.length;i++) {
        var sum_squared=0;
        var temp=tab[i];

        temp.forEach(function(temp){
            sum_squared+=Math.pow(temp,2);
        });

        var n=temp.length;
        var unbiaised_Var=(sum_squared-n*Math.pow(avg[i],2))/(n-1);

        stdev.push(Math.sqrt(unbiaised_Var));

    }
    return stdev;
};



////
window.addEventListener("load", dashboard.query);
window.addEventListener("load", dashboard.init);


