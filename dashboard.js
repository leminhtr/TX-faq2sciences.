var dashboard = {
	graphs : [],	// graphs list

	// Constructeur de classe graph_data
    graph_data : function  (pQuery_body, pxLabel, pyLabel, pTitle, pDOM_id, pMean_label, pStdev_label, pData_path){
		this.query_body=pQuery_body;	// corps de la query
		this.xData=[];	// data x
		this.yData={};	// data y	: objet {attribut : data1, attribut2: data2, ...} => Different pour chaque graph
		this.data=[];	// à voir si utile
		this.xLabel=pxLabel;	// label x
		this.yLabel=pyLabel;	// label y
		this.title=pTitle;		// titre
		this.DOM_id=pDOM_id;	// DOM id
		this.from=0;			// debut
		this.query_size={};	// taille de la requête : objet {attribut : sizeof_data, attribut2: sizeof_data, ...} => Different pour chaque graph
        this.yMean=0;
		this.yMean_label= pMean_label;	// label yMean
        this.yStdev=0;
		this.yStdev_label= pStdev_label;	//label yStdev
		this.nb_tot= 0;	// à voir si utile
		this.data_path=pData_path;	// objet {attribut : path_to_data, attribut2: path_to_data, ...} => Different pour chaque graph
        this.tab_to_plot=[]; // liste des yData à afficher

        this.set_nb_tot=function(response_to_format){
            this.query_size=response_to_format.hits.total; //=array de [{doc_count:..., key:..., score_avg:{value:...}}, {}, ... ]
            return this.query_size;
        };
        //update_query_from= function(new_from){this.query.from=new_from};

		this.set_yData= function(data_response) {};	// construit l'objet yData different pour chaque graph_data

        this.data_frame=function(){};

        this.plotMe = function(graph_data){};


    },	//fin constructeur



	query_build_thibault : function(){
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
        },
        avg_user_bio:
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
                                "depot_path.raw": "/Partenaires/UL/UL-Bio"
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
                                    "i6nRY2FhjtlKF4kAuRVlLi",
                                    "j74GTDxCdUh1AhUJbxzOCg",
                                    "Ro8Bn94sH5fiObRDLGMDub",
                                    "AXGE9teKhMdo4j0BsK6x8f",
                                    "BdYLqQ15ObfDNWH4r8ES1d",
                                    "XSSBiN8sCL10gnc6XsIUi",
                                    "ImUQEzT8sjgXe0C5WIYD9g",
                                    "QWGy9VVCetknLGk0eUfkvc",
                                    "LWF7Tquh7XgWIQLImXgie",
                                    "XSSBiN8sCL10gnc6XsIUi"
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
                                "size": 300
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
        },
    avg_quest_phy:
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
                "questions": {
                    "terms": {
                        "field": "question_id.raw",
                        "size": 50
                    },
                    "aggs": {
                        "users": {
                            "terms": {
                                "field": "user.raw",
                                "size": 800
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
        },
        avg_quest_bio:
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
                                "depot_path.raw": "/Partenaires/UL/UL-Bio"
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
                                    "i6nRY2FhjtlKF4kAuRVlLi",
                                    "j74GTDxCdUh1AhUJbxzOCg",
                                    "Ro8Bn94sH5fiObRDLGMDub",
                                    "AXGE9teKhMdo4j0BsK6x8f",
                                    "BdYLqQ15ObfDNWH4r8ES1d",
                                    "XSSBiN8sCL10gnc6XsIUi",
                                    "ImUQEzT8sjgXe0C5WIYD9g",
                                    "QWGy9VVCetknLGk0eUfkvc",
                                    "LWF7Tquh7XgWIQLImXgie",
                                    "XSSBiN8sCL10gnc6XsIUi"
                                ]
                            }
                        }
                    ]
                }
            },
            "size": 0,
            "aggs": {
                "questions": {
                    "terms": {
                        "field": "question_id.raw",
                        "size": 300
                    },
                    "aggs": {
                        "users": {
                            "terms": {
                                "field": "user.raw",
                                "size": 800
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
        }
    },

	init_vAvg_user_phy : function() {	// mettre instance dans fonction
        var vAvg_user_phy = new dashboard.graph_data(dashboard.query_list.avg_user_phy,
            "étudiant",
            "Score moyen d'un étudiant",
            "Score moyen d'un étudiant au questionnaire de physique",
            "bar_avg_user_phy",
            "Score total moyen des étudiants",
            " l'écart type",
//yData :			//{users:[], questions:[], nb_change_tot:0, nb_change:[], max_time:[], min_time:[], score_scaled:[]},
            {
                users: "aggregations.users.buckets",// = tableau de .key (user_id)
                nb_change_tot: ".doc_count",
                questions: ".questions.buckets",	// = tableau de .key (question_id)
                nb_change_per_quest: ".doc_count",
                max_time: ".max_time.hits.hits",	// .max_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                max_time_val: ".fields.max_time",// temps où user à terminé une question
                min_time: ".min_time.hits.hits",	//.min_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                min_time_val: ".fields.timestamp",	// temps où user à commencé une question
                score_scaled: ".fields.score_scaled"
            }	//score de user à une question
        );

        vAvg_user_phy.plotMe = dashboard.plotBar;
        vAvg_user_phy.query_size = {nb_user: 800, nb_quest: 40};	// inutile si déjà dans query ?
        // variable à remettre dans constructeur ?

        vAvg_user_phy.yData = {	//nb changement, temps de réponse, score
            //users:[],	// liste des users
            questions: [],	// listes des questions répondue pour chaque user
            nb_change_tot: [],	// nombre de changement de réponses totales sur un questionnaire pour chaque user
            nb_change: [],	// nombre de changement de réponses pour chaque question répondue, pour chaque user
            avg_nb_change: [],	// moyenne de changement de réponse par user
            stdev_nb_change: [],	// écart type de changement de réponse apr user
            max_time: [],	// temps de la dernière réponse pour chaque question répondue, pour chaque user
            min_time: [],	//temps de la première réponse pour chaque question répondue, pour chaque user
            delta_time: [],	//temps de réponse pour chaque question répondue, pour chaque user
            avg_time: [],		//temps moyen de réponse pour chaque question répondue, pour chaque user
            stdev_time: [],	//écart type de changement de réponse par uset
            pre_score_scaled: [],	//score de chaque question répondue, pour chaque user
            avg_score_scaled: [],	//score moyen d'un questionnaire, pour chaque user
            stdev_score_scaled: []	//score moyen d'un questionnaire, pour chaque user
        };

        vAvg_user_phy.set_yData = function (data_response) {

            //DATA.aggregations.users.buckets[]
            var toFormat_data = dashboard.get_obj_path_value(data_response, vAvg_user_phy.data_path.users);

            for (var i = 0, nb_user = toFormat_data.length; i < nb_user; i++) {	// pour chaque user faire
                var data = toFormat_data[i];

                //DATA.aggregations.users.buckets[].key = user_id
                vAvg_user_phy.xData[i] = data.key;

                //DATA.aggregations.users.buckets[].question_id = nb tentatives totales de user
                vAvg_user_phy.yData.nb_change_tot[i] = data.doc_count;

                //DATA.aggregations.users.buckets[].length = nb questions répondu par user
                var nb_quest = data.questions.buckets.length;

                var temp_questions = [], temp_nb_change = [], temp_max_time = [], temp_min_time = [],
                    temp_delta_time = [], temp_pre_score_scaled = [];

                for (var j = 0; j < nb_quest; j++) {	// pour chaque question répondu par user faire
                    //DATA.aggregations.questions.buckets[].questions.buckets[].
                    var nested_data = data.questions.buckets[j];

                    //DATA.aggregations.questions.buckets[].questions.buckets[].doc_count = nb de changement de user pour une question
                    //vAvg_user_phy.yData.nb_change[i][j]=nested_data.doc_count;
                    temp_nb_change.push(nested_data.doc_count);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = temps de la dernière réponse à une question
                    //vAvg_user_phy.yData.max_time[i][j]=nested_data.max_time.hits.hits[0].fields.timestamp[0];
                    temp_max_time.push(nested_data.max_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].min_time.hits.hits[0].fields.timestamp[0] = temps de la première réponse à une question
                    //vAvg_user_phy.yData.min_time[i][j]=nested_data.min_time.hits.hits[0].fields.timestamp[0];
                    temp_min_time.push(nested_data.min_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = score de la dernière réponse à une question
                    //vAvg_user_phy.yData.pre_score_scaled[i][j]=nested_data.max_time.hits.hits[0].fields.score_scaled[0];
                    temp_pre_score_scaled.push(nested_data.max_time.hits.hits[0].fields.score_scaled[0]);

                }
                vAvg_user_phy.yData.questions.push(temp_questions);
                vAvg_user_phy.yData.nb_change.push(temp_nb_change);
                //console.log(temp_nb_change);
                vAvg_user_phy.yData.max_time.push(temp_max_time);
                vAvg_user_phy.yData.min_time.push(temp_min_time);

                //vAvg_user_phy.yData.delta_time.push(temp_delta_time);
                //console.log(temp_delta_time);
                vAvg_user_phy.yData.pre_score_scaled.push(temp_pre_score_scaled);
            }


            // temps de réponse d'un étudiant pour chaque question d'un questionnaire
            vAvg_user_phy.yData.delta_time = dashboard.calc_nested_delta_time(vAvg_user_phy.yData.max_time, vAvg_user_phy.yData.min_time); //delta_time= max_time-min_time
            //console.log(vAvg_user_phy.yData.delta_time);
            // moyenne du temps de réponse d'un étudiant sur tout un questionnaire
            vAvg_user_phy.yData.avg_time = dashboard.calc_avg_nested(vAvg_user_phy.yData.delta_time);
            // convert miliseconde to secondes
            vAvg_user_phy.yData.avg_time = dashboard.calc_milis_to_min(vAvg_user_phy.yData.avg_time);

            //vAvg_user_phy.yData.avg_time.reverse();
            //console.log(vAvg_user_phy.yData.avg_time);
            vAvg_user_phy.yData.stdev_time = dashboard.calc_unbiaised_stdev_nested(vAvg_user_phy.yData.delta_time);
            vAvg_user_phy.yData.stdev_time = dashboard.calc_milis_to_min(vAvg_user_phy.yData.avg_time);
            //vAvg_user_phy.yData.avg_time.sort();

            // nombre moyen de changement de réponse par étudiant sur tout un questionnaire
            vAvg_user_phy.yData.avg_nb_change = dashboard.calc_avg_nested(vAvg_user_phy.yData.nb_change);
            //vAvg_user_phy.yData.avg_nb_change.sort();
            //vAvg_user_phy.yData.avg_nb_change.reverse();
            //console.log(vAvg_user_phy.yData.avg_nb_change);
            vAvg_user_phy.yData.stdev_nb_change = dashboard.calc_unbiaised_stdev_nested(vAvg_user_phy.yData.nb_change);

            // score moyen d'un utilisateur sur tout un questionnaire
            vAvg_user_phy.yData.avg_score_scaled = dashboard.calc_avg_nested(vAvg_user_phy.yData.pre_score_scaled);
            //vAvg_user_phy.yData.avg_score_scaled.sort();
            //vAvg_user_phy.yData.avg_score_scaled.reverse();
            vAvg_user_phy.yData.stdev_score_scaled = dashboard.calc_unbiaised_stdev_nested(vAvg_user_phy.yData.pre_score_scaled);

            vAvg_user_phy.yMean = dashboard.calc_avg(vAvg_user_phy.yData.avg_score_scaled);
            vAvg_user_phy.yStdev = dashboard.calc_unbiaised_stdev(vAvg_user_phy.yData.avg_score_scaled);  //= écart-type de la moyenne des score par utilisateurs
            // != écart type des écarts type du score au questionnaire d'un user

            vAvg_user_phy.query_size.nb_user = vAvg_user_phy.xData.length;


        }; // function set yData phy

        vAvg_user_phy.tab_to_plot = [{
            DOM_id: "bar_avg_user_phy",
            yData: "avg_score_scaled",
            xlabel: "étudiant",
            ylabel: "Score moyen d'un étudiant au questionnaire",
            title: "Score moyen d'un étudiant au questionnaire de physique"
        },
            {
                DOM_id: "bar_avg_user_phy_nb_change",
                yData: "avg_nb_change",
                xlabel: "étudiant",
                ylabel: "Nombre moyen de changements de réponse au questionnaire",
                title: "Nombre moyen de changements de réponse par étudiant au questionnaire de physique"
            },
            {
                DOM_id: "bar_avg_user_phy_deltaT",
                yData: "avg_time",
                xlabel: "étudiant",
                ylabel: "Temps moyen de réponse par question au questionnaire (en seconde)",
                title: "Temps moyen de réponse au questionnaire de physique par étudiant (en seconde)"
            }
        ];

        dashboard.send_Xhr(dashboard.readData, vAvg_user_phy);

        dashboard.graphs.push(vAvg_user_phy);	// ajout du graph dans a liste de graphs

    },


    //***************************** USER BIO *********************************************

    init_vAvg_user_bio : function () {

         var vAvg_user_bio = new dashboard.graph_data(dashboard.query_list.avg_user_bio,
             "étudiant",
             "Score moyen d'un étudiant",
             "Score moyen d'un étudiant au questionnaire de biologie",
             "bar_avg_user_bio",
             "Score total moyen des étudiants",
             " l'écart type",
//yData :			//{users:[], questions:[], nb_change_tot:0, nb_change:[], max_time:[], min_time:[], score_scaled:[]},
             {
                 users: "aggregations.users.buckets",// = tableau de .key (user_id)
                 nb_change_tot: ".doc_count",
                 questions: ".questions.buckets",	// = tableau de .key (question_id)
                 nb_change_per_quest: ".doc_count",
                 max_time: ".max_time.hits.hits",	// .max_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                 max_time_val: ".fields.max_time",// temps où user à terminé une question
                 min_time: ".min_time.hits.hits",	//.min_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                 min_time_val: ".fields.timestamp",	// temps où user à commencé une question
                 score_scaled: ".fields.score_scaled"
             }	//score de user à une question
         );

         vAvg_user_bio.plotMe = dashboard.plotBar;
         vAvg_user_bio.query_size = {nb_user: 800, nb_quest: 300};	// inutile si déjà dans query ?
         // variable à remettre dans constructeur ?

         vAvg_user_bio.yData = {	//nb changement, temps de réponse, score
             //users:[],	// liste des users
             questions: [],	// listes des questions répondue pour chaque user
             nb_change_tot: [],	// nombre de changement de réponses totales sur un questionnaire pour chaque user
             nb_change: [],	// nombre de changement de réponses pour chaque question répondue, pour chaque user
             avg_nb_change: [],	// moyenne de changement de réponse par user
             stdev_nb_change: [],	// écart type de changement de réponse apr user
             max_time: [],	// temps de la dernière réponse pour chaque question répondue, pour chaque user
             min_time: [],	//temps de la première réponse pour chaque question répondue, pour chaque user
             delta_time: [],	//temps de réponse pour chaque question répondue, pour chaque user
             avg_time: [],		//temps moyen de réponse pour chaque question répondue, pour chaque user
             stdev_time: [],	//écart type de changement de réponse par uset
             pre_score_scaled: [],	//score de chaque question répondue, pour chaque user
             avg_score_scaled: [],	//score moyen d'un questionnaire, pour chaque user
             stdev_score_scaled: [],	//score moyen d'un questionnaire, pour chaque user
             data_frame_score:{avg_score:[], median_score:[], quartile1_score:[], quartile3_score:[]},
             data_frame_nb_change:{avg_change:[], median_change:[], quartile1_change:[], quartile3_change:[]},
             data_frame_time:{avg_time:[], median_time:[], quartile1_time:[], quartile3_time:[]}
         };

         vAvg_user_bio.set_yData = function (data_response) {

             //DATA.aggregations.users.buckets[]
             var toFormat_data = dashboard.get_obj_path_value(data_response, vAvg_user_bio.data_path.users);

             for (var i = 0, nb_user = toFormat_data.length; i < nb_user; i++) {	// pour chaque user faire
                 var data = toFormat_data[i];

                 //DATA.aggregations.users.buckets[].key = user_id
                 vAvg_user_bio.xData[i] = data.key;

                 //DATA.aggregations.users.buckets[].question_id = nb tentatives totales de user
                 vAvg_user_bio.yData.nb_change_tot[i] = data.doc_count;

                 //DATA.aggregations.users.buckets[].length = nb questions répondu par user
                 var nb_quest = data.questions.buckets.length;

                 var temp_questions = [], temp_nb_change = [], temp_max_time = [], temp_min_time = [],
                     temp_delta_time = [], temp_pre_score_scaled = [];

                 for (var j = 0; j < nb_quest; j++) {	// pour chaque question répondu par user faire
                     //DATA.aggregations.questions.buckets[].questions.buckets[].
                     var nested_data = data.questions.buckets[j];

                     //DATA.aggregations.questions.buckets[].questions.buckets[].doc_count = nb de changement de user pour une question
                     //vAvg_user_bio.yData.nb_change[i][j]=nested_data.doc_count;
                     temp_nb_change.push(nested_data.doc_count);

                     //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = temps de la dernière réponse à une question
                     //vAvg_user_bio.yData.max_time[i][j]=nested_data.max_time.hits.hits[0].fields.timestamp[0];
                     temp_max_time.push(nested_data.max_time.hits.hits[0].fields.timestamp[0]);

                     //DATA.aggregations.questions.buckets[].questions.buckets[].min_time.hits.hits[0].fields.timestamp[0] = temps de la première réponse à une question
                     //vAvg_user_bio.yData.min_time[i][j]=nested_data.min_time.hits.hits[0].fields.timestamp[0];
                     temp_min_time.push(nested_data.min_time.hits.hits[0].fields.timestamp[0]);

                     //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = score de la dernière réponse à une question
                     //vAvg_user_bio.yData.pre_score_scaled[i][j]=nested_data.max_time.hits.hits[0].fields.score_scaled[0];
                     temp_pre_score_scaled.push(nested_data.max_time.hits.hits[0].fields.score_scaled[0]);

                 }
                 vAvg_user_bio.yData.questions.push(temp_questions);
                 vAvg_user_bio.yData.nb_change.push(temp_nb_change);
                 vAvg_user_bio.yData.max_time.push(temp_max_time);
                 vAvg_user_bio.yData.min_time.push(temp_min_time);
                 vAvg_user_bio.yData.delta_time.push(temp_delta_time);
                 vAvg_user_bio.yData.pre_score_scaled.push(temp_pre_score_scaled);
             }

             vAvg_user_bio.yData.delta_time = dashboard.calc_nested_delta_time(vAvg_user_bio.yData.max_time, vAvg_user_bio.yData.min_time); //delta_time= max_time-min_time

             vAvg_user_bio.yData.avg_time = dashboard.calc_avg_nested(vAvg_user_bio.yData.delta_time);
             vAvg_user_bio.yData.avg_time = dashboard.calc_milis_to_min(vAvg_user_bio.yData.avg_time); // convert to second

             vAvg_user_bio.yData.stdev_time = dashboard.calc_unbiaised_stdev_nested(vAvg_user_bio.yData.delta_time);
             vAvg_user_bio.yData.stdev_time = dashboard.calc_milis_to_min(vAvg_user_bio.yData.avg_time);   // convert to sec

             vAvg_user_bio.yData.avg_nb_change = dashboard.calc_avg_nested(vAvg_user_bio.yData.nb_change);
             vAvg_user_bio.yData.stdev_nb_change = dashboard.calc_unbiaised_stdev_nested(vAvg_user_bio.yData.nb_change);

             // vAvg_user_bio.yData.pre_score_scaled.forEach(function(temp){alert(temp);});
             vAvg_user_bio.yData.avg_score_scaled = dashboard.calc_avg_nested(vAvg_user_bio.yData.pre_score_scaled);
             // vAvg_user_bio.yData.avg_score_scaled.sort();
             //vAvg_user_bio.yData.avg_score_scaled.reverse();
             vAvg_user_bio.yData.stdev_score_scaled = dashboard.calc_unbiaised_stdev_nested(vAvg_user_bio.yData.pre_score_scaled);

             vAvg_user_bio.yMean = dashboard.calc_avg(vAvg_user_bio.yData.avg_score_scaled);
             vAvg_user_bio.yStdev = dashboard.calc_unbiaised_stdev(vAvg_user_bio.yData.avg_score_scaled);  //= écart-type de la moyenne des score par utilisateurs
             // != écart type des écarts type du score au questionnaire d'un user

             vAvg_user_bio.query_size.nb_user = vAvg_user_bio.xData.length;


         }; // function bio

         dashboard.send_Xhr(dashboard.readData, vAvg_user_bio);

         dashboard.graphs.push(vAvg_user_bio);	// ajout du graph dans a liste de graphs

     },

// ******************** Questionnaire de physique ***********************

        init_vAvg_quest_phy :function () {

        var vAvg_quest_phy = new dashboard.graph_data(dashboard.query_list.avg_quest_phy,
            "Question",
            {
            	"score":{
            	    "yaxis" :"Score moyen d'une question de physique",
                    "xaxis":"Question"
            	},
            	"change":{"title":"Nombre changements de réponse par question au questionnaire de physique",
                    "yaxis":"Nombre changements de réponse à une question",
                    "xaxis":"Question",
                    "max":"Nombre de changements de réponse maximale d'une question au questionnaire",
                    "median":"Médiane du nombre de changements de réponse à une question au questionnaire",
                    "quart1":"1er quartile du nombre de changements de réponse à une question au questionnaire",
                    "quart3":"3ème quartile du nombre de changements de réponse à une question au questionnaire",
                    "mean_line":"Nombre moyen total de changements de réponse au questionnaire de physique"
            	},
                "deltaT":{
                    "title":"Temps moyen de réponse au questionnaire de physique",
                    "yaxis":"Temps moyen de réponse à une question",
                    "xaxis":"Question",
                    "max":"Temps de réponse maximale d'une question au questionnaire",
                    "median":"Médiane du temps de réponse à une question au questionnaire",
                    "quart1":"1er quartile du temps de réponse à une question au questionnaire",
                    "quart3":"3ème quartile du temps de réponse à une question au questionnaire",
                    "mean_line":"Temps moyen total de réponse au questionnaire de physique"

            		}


        	},
            "Score moyen au questionnaire de physique",
            {
                "score":"bar_avg_quest_phy",
                "change":"bar_avg_quest_phy_nb_change",
                "deltaT":"bar_avg_quest_phy_deltaT"
            },
            "Score total moyen du questionnaire de physique",
            " l'écart type",
//yData :			//{users:[], questions:[], nb_change_tot:0, nb_change:[], max_time:[], min_time:[], score_scaled:[]},
            {questions:"aggregations.questions.buckets",// = tableau de .key (user_id)
                nb_change_tot:".doc_count",
                users:".users.buckets",	// = tableau de .;key (question_id)
                nb_change_per_quest:".doc_count",
                max_time:".max_time.hits.hits",	// .max_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                max_time_val:".fields.max_time",// temps où user à terminé une question
                min_time:".min_time.hits.hits",	//.min_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                min_time_val:".fields.timestamp",	// temps où user à commencé une question
                score_scaled:".fields.score_scaled"}	//score de user à une question
        );

            vAvg_quest_phy.plotMe=dashboard.plot_quest;
        vAvg_quest_phy.query_size={nb_user:800, nb_quest:40};	// inutile si déjà dans query ?
        // variable à remettre dans constructeur ?

        vAvg_quest_phy.yData ={	//nb changement, temps de réponse, score
            //users:[],	// liste des users
            users:[],	// listes des questions répondue pour chaque user
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
            stdev_score_scaled:[],	//score moyen d'un questionnaire, pour chaque user
            data_frame_score:{avg_score:[], median_score:[], quartile1_score:[], quartile3_score:[], max_score:[]},
            data_frame_nb_change:{avg_change:[], median_change:[], quartile1_change:[], quartile3_change:[],max_change:[]},
            data_frame_time:{avg_time:[], median_time:[], quartile1_time:[], quartile3_time:[],max_time:[]}
        };

        vAvg_quest_phy.set_yData= function(data_response) {

            //DATA.aggregations.questions.buckets[]
            var toFormat_data=dashboard.get_obj_path_value(data_response,vAvg_quest_phy.data_path.questions);

            for(var i=0, nb_quest=toFormat_data.length; i<nb_quest;i++){	// pour chaque questions faire
                var data= toFormat_data[i];

                //DATA.aggregations.questions.buckets[].key = question_id
                vAvg_quest_phy.xData[i]=data.key;

                //DATA.aggregations.questions.buckets[].doc_count = nb tentatives totales pour 1 question
                vAvg_quest_phy.yData.nb_change_tot[i]=data.doc_count;

                //DATA.aggregations.users.buckets[].length = nb users ayant répondu à 1 quest
                var nb_user= data.users.buckets.length;

                var temp_users=[], temp_nb_change=[], temp_max_time=[], temp_min_time=[], temp_delta_time=[], temp_pre_score_scaled=[];

                for(var j=0; j<nb_user;j++){	// pour chaque question répondu par user faire
                    //DATA.aggregations.questions.buckets[].users.buckets[].
                    var nested_data=data.users.buckets[j];

                    //DATA.aggregations.questions.buckets[].users.buckets[].doc_count = nb de changement de user[j] pour une question[i]
                    //vAvg_quest_phy.yData.nb_change[i][j]=nested_data.doc_count;
                    temp_nb_change.push(nested_data.doc_count);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = temps de la dernière réponse à une question
                    //vAvg_quest_phy.yData.max_time[i][j]=nested_data.max_time.hits.hits[0].fields.timestamp[0];
                    temp_max_time.push(nested_data.max_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].users.buckets[].min_time.hits.hits[0].fields.timestamp[0] = temps de la première réponse à une question
                    //vAvg_quest_phy.yData.min_time[i][j]=nested_data.min_time.hits.hits[0].fields.timestamp[0];
                    temp_min_time.push(nested_data.min_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].users.buckets[].max_time.hits.hits[0].fields.timestamp[0] = score de la dernière réponse à une question
                    //vAvg_quest_phy.yData.pre_score_scaled[i][j]=nested_data.max_time.hits.hits[0].fields.score_scaled[0];
                    temp_pre_score_scaled.push(nested_data.max_time.hits.hits[0].fields.score_scaled[0]);

                }
                vAvg_quest_phy.yData.users.push(temp_users);
                vAvg_quest_phy.yData.nb_change.push(temp_nb_change);
                // Data frame nb change
                vAvg_quest_phy.yData.data_frame_nb_change.median_change.push(dashboard.quantile(temp_nb_change,50));//median de la question
                vAvg_quest_phy.yData.data_frame_nb_change.quartile1_change.push(dashboard.quantile(temp_nb_change,25)) ;// 1er quartile de la question
                vAvg_quest_phy.yData.data_frame_nb_change.quartile3_change.push(dashboard.quantile(temp_nb_change,75)) ;  //3ème quartile de la question
                vAvg_quest_phy.yData.data_frame_nb_change.max_change.push(dashboard.quantile(temp_nb_change,100));  //3ème quartile de la question

                vAvg_quest_phy.yData.max_time.push(temp_max_time);
                vAvg_quest_phy.yData.min_time.push(temp_min_time);

                temp_delta_time=dashboard.calc_delta_time(temp_max_time,temp_min_time);
                temp_delta_time=dashboard.calc_milis_to_min(temp_delta_time); // convert to sec

                // Data frame delta time
                vAvg_quest_phy.yData.data_frame_time.median_time.push(dashboard.quantile(temp_delta_time,50));//median de la question
                vAvg_quest_phy.yData.data_frame_time.quartile1_time.push(dashboard.quantile(temp_delta_time,25)) ;// 1er quartile de la question
                vAvg_quest_phy.yData.data_frame_time.quartile3_time.push(dashboard.quantile(temp_delta_time,75)) ;  //3ème quartile de la question
                vAvg_quest_phy.yData.data_frame_time.max_time.push(dashboard.quantile(temp_delta_time,100));  //3ème quartile de la question


                //vAvg_quest_phy.yData.delta_time.push(temp_delta_time);
                //console.log(temp_delta_time);
                vAvg_quest_phy.yData.pre_score_scaled.push(temp_pre_score_scaled);

                // Data frame score
                vAvg_quest_phy.yData.data_frame_score.median_score.push(dashboard.quantile(temp_pre_score_scaled,50));//median de la question
                vAvg_quest_phy.yData.data_frame_score.quartile3_score.push(dashboard.quantile(temp_pre_score_scaled,25)) ;// 1er quartile de la question
                vAvg_quest_phy.yData.data_frame_score.quartile3_score.push(dashboard.quantile(temp_pre_score_scaled,75)) ;  //3ème quartile de la question
                vAvg_quest_phy.yData.data_frame_score.max_score.push(dashboard.quantile(temp_pre_score_scaled,100));  //3ème quartile de la question
            }


            // temps de réponse d'un étudiant pour chaque question d'un questionnaire
            vAvg_quest_phy.yData.delta_time=dashboard.calc_nested_delta_time(vAvg_quest_phy.yData.max_time,vAvg_quest_phy.yData.min_time); //delta_time= max_time-min_time
            //console.log(vAvg_quest_phy.yData.delta_time);
            // moyenne du temps de réponse d'un étudiant sur tout un questionnaire
            vAvg_quest_phy.yData.avg_time=dashboard.calc_avg_nested(vAvg_quest_phy.yData.delta_time);
            vAvg_quest_phy.yData.avg_time=dashboard.calc_milis_to_min(vAvg_quest_phy.yData.avg_time); // convert to sec

            //vAvg_quest_phy.yData.avg_time.sort();
            //vAvg_quest_phy.yData.avg_time.reverse();
            //console.log(vAvg_quest_phy.yData.avg_time);
            vAvg_quest_phy.yData.stdev_time=dashboard.calc_unbiaised_stdev_nested(vAvg_quest_phy.yData.delta_time);
            vAvg_quest_phy.yData.stdev_time=dashboard.calc_milis_to_min(vAvg_quest_phy.yData.stdev_time);


            // nombre moyen de changement de réponse par étudiant sur tout un questionnaire
            vAvg_quest_phy.yData.avg_nb_change=dashboard.calc_avg_nested(vAvg_quest_phy.yData.nb_change);
            // vAvg_quest_phy.yData.avg_nb_change.sort();
            // vAvg_quest_phy.yData.avg_nb_change.reverse();
            //console.log(vAvg_quest_phy.yData.avg_nb_change);
            vAvg_quest_phy.yData.stdev_nb_change=dashboard.calc_unbiaised_stdev_nested(vAvg_quest_phy.yData.nb_change);

            // score moyen d'un utilisateur sur tout un questionnaire
            vAvg_quest_phy.yData.avg_score_scaled=dashboard.calc_avg_nested(vAvg_quest_phy.yData.pre_score_scaled);
            // vAvg_quest_phy.yData.avg_score_scaled.sort();
            //vAvg_quest_phy.yData.avg_score_scaled.reverse();
            vAvg_quest_phy.yData.stdev_score_scaled=dashboard.calc_unbiaised_stdev_nested(vAvg_quest_phy.yData.pre_score_scaled);

            vAvg_quest_phy.yMean=dashboard.calc_avg(vAvg_quest_phy.yData.avg_score_scaled);
            vAvg_quest_phy.yStdev=dashboard.calc_unbiaised_stdev(vAvg_quest_phy.yData.avg_score_scaled);  //= écart-type de la moyenne des score par utilisateurs
            // != écart type des écarts type du score au questionnaire d'un user

            vAvg_quest_phy.query_size.nb_user=vAvg_quest_phy.xData.length;


            // Construct data frame

            // Data frame
            vAvg_quest_phy.yData.data_frame_score.avg_score=vAvg_quest_phy.yData.avg_score_scaled;
            vAvg_quest_phy.yData.data_frame_nb_change.avg_change=vAvg_quest_phy.yData.avg_nb_change;
            vAvg_quest_phy.yData.data_frame_time.avg_time=vAvg_quest_phy.yData.avg_time;


        }; // function set yData phy


        dashboard.send_Xhr(dashboard.readData, vAvg_quest_phy);

        dashboard.graphs.push(vAvg_quest_phy);	// ajout du graph dans a liste de graphs

		},//fin init()



    // ******************** Questionnaire de biologie ***********************

    init_vAvg_quest_bio :function () {

        var vAvg_quest_bio = new dashboard.graph_data(dashboard.query_list.avg_quest_bio,
            "Question",
            {
                "score":{
                    "yaxis" :"Score moyen d'une question de biologie",
                    "xaxis":"Question"
                },
                "change":{"title":"Nombre changements de réponse par question au questionnaire de biologie",
                    "yaxis":"Nombre changements de réponse à une question",
                    "xaxis":"Question",
                    "max":"Nombre de changements de réponse maximale d'une question au questionnaire",
                    "median":"Médiane du nombre de changements de réponse à une question au questionnaire",
                    "quart1":"1er quartile du nombre de changements de réponse à une question au questionnaire",
                    "quart3":"3ème quartile du nombre de changements de réponse à une question au questionnaire",
                    "mean_line":"Nombre moyen total de changements de réponse au questionnaire de biologie"
                },
                "deltaT":{
                    "title":"Temps moyen de réponse par question au questionnaire de biologie",
                    "yaxis":"Temps moyen de réponse à une question",
                    "xaxis":"Question",
                    "max":"Temps de réponse maximale d'une question au questionnaire",
                    "median":"Médiane du temps de réponse à une question au questionnaire",
                    "quart1":"1er quartile du temps de réponse à une question au questionnaire",
                    "quart3":"3ème quartile du temps de réponse à une question au questionnaire",
                    "mean_line":"Temps moyen total de réponse au questionnaire de biologie"

                }
            },
            "Score moyen au questionnaire de biologie",
            {
                "score":"bar_avg_quest_bio",
                "change":"bar_avg_quest_bio_nb_change",
                "deltaT":"bar_avg_quest_bio_deltaT"
            },
            "Score total moyen du questionnaire de biologie",
            " l'écart type",
//yData :			//{users:[], questions:[], nb_change_tot:0, nb_change:[], max_time:[], min_time:[], score_scaled:[]},
            {questions:"aggregations.questions.buckets",// = tableau de .key (user_id)
                nb_change_tot:".doc_count",
                users:".users.buckets",	// = tableau de .key (question_id)
                nb_change_per_quest:".doc_count",
                max_time:".max_time.hits.hits",	// .max_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                max_time_val:".fields.max_time",// temps où user à terminé une question
                min_time:".min_time.hits.hits",	//.min_time.hits.hits[0].fields : prendre 1ère  valeur du tableau hits.hits[]
                min_time_val:".fields.timestamp",	// temps où user à commencé une question
                score_scaled:".fields.score_scaled"}	//score de user à une question
        );

        vAvg_quest_bio.plotMe=dashboard.plot_quest;
        vAvg_quest_bio.query_size={nb_user:800, nb_quest:300};	// inutile si déjà dans query ?
        // variable à remettre dans constructeur ?

        vAvg_quest_bio.yData ={	//nb changement, temps de réponse, score
            //users:[],	// liste des users
            users:[],	// listes des questions répondue pour chaque user
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
            stdev_score_scaled:[],	//score moyen d'un questionnaire, pour chaque user
            data_frame_score:{avg_score:[], median_score:[], quartile1_score:[], quartile3_score:[], max_score:[]},
            data_frame_nb_change:{avg_change:[], median_change:[], quartile1_change:[], quartile3_change:[],max_change:[]},
            data_frame_time:{avg_time:[], median_time:[], quartile1_time:[], quartile3_time:[],max_time:[]}
        };

        vAvg_quest_bio.set_yData= function(data_response) {

            //DATA.aggregations.questions.buckets[]
            var toFormat_data=dashboard.get_obj_path_value(data_response,vAvg_quest_bio.data_path.questions);

            for(var i=0, nb_quest=toFormat_data.length; i<nb_quest;i++){	// pour chaque questions faire
                var data= toFormat_data[i];

                //DATA.aggregations.questions.buckets[].key = question_id
                vAvg_quest_bio.xData[i]=data.key;

                //DATA.aggregations.questions.buckets[].doc_count = nb tentatives totales pour 1 question
                vAvg_quest_bio.yData.nb_change_tot[i]=data.doc_count;

                //DATA.aggregations.users.buckets[].length = nb users ayant répondu à 1 quest
                var nb_user= data.users.buckets.length;

                var temp_users=[], temp_nb_change=[], temp_max_time=[], temp_min_time=[], temp_delta_time=[], temp_pre_score_scaled=[];

                for(var j=0; j<nb_user;j++){	// pour chaque question répondu par user faire
                    //DATA.aggregations.questions.buckets[].users.buckets[].
                    var nested_data=data.users.buckets[j];

                    //DATA.aggregations.questions.buckets[].users.buckets[].doc_count = nb de changement de user[j] pour une question[i]
                    //vAvg_quest_bio.yData.nb_change[i][j]=nested_data.doc_count;
                    temp_nb_change.push(nested_data.doc_count);

                    //DATA.aggregations.questions.buckets[].questions.buckets[].max_time.hits.hits[0].fields.timestamp[0] = temps de la dernière réponse à une question
                    //vAvg_quest_bio.yData.max_time[i][j]=nested_data.max_time.hits.hits[0].fields.timestamp[0];
                    temp_max_time.push(nested_data.max_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].users.buckets[].min_time.hits.hits[0].fields.timestamp[0] = temps de la première réponse à une question
                    //vAvg_quest_bio.yData.min_time[i][j]=nested_data.min_time.hits.hits[0].fields.timestamp[0];
                    temp_min_time.push(nested_data.min_time.hits.hits[0].fields.timestamp[0]);

                    //DATA.aggregations.questions.buckets[].users.buckets[].max_time.hits.hits[0].fields.timestamp[0] = score de la dernière réponse à une question
                    //vAvg_quest_bio.yData.pre_score_scaled[i][j]=nested_data.max_time.hits.hits[0].fields.score_scaled[0];
                    temp_pre_score_scaled.push(nested_data.max_time.hits.hits[0].fields.score_scaled[0]);

                }
                vAvg_quest_bio.yData.users.push(temp_users);
                vAvg_quest_bio.yData.nb_change.push(temp_nb_change);
                // Data frame nb change
                vAvg_quest_bio.yData.data_frame_nb_change.median_change.push(dashboard.quantile(temp_nb_change,50));//median de la question
                vAvg_quest_bio.yData.data_frame_nb_change.quartile1_change.push(dashboard.quantile(temp_nb_change,25)) ;// 1er quartile de la question
                vAvg_quest_bio.yData.data_frame_nb_change.quartile3_change.push(dashboard.quantile(temp_nb_change,75)) ;  //3ème quartile de la question
                vAvg_quest_bio.yData.data_frame_nb_change.max_change.push(dashboard.quantile(temp_nb_change,100));  //3ème quartile de la question

                vAvg_quest_bio.yData.max_time.push(temp_max_time);
                vAvg_quest_bio.yData.min_time.push(temp_min_time);

                temp_delta_time=dashboard.calc_delta_time(temp_max_time,temp_min_time);
                temp_delta_time=dashboard.calc_milis_to_min(temp_delta_time); // convert to sec

                // Data frame delta time
                vAvg_quest_bio.yData.data_frame_time.median_time.push(dashboard.quantile(temp_delta_time,50));//median de la question
                vAvg_quest_bio.yData.data_frame_time.quartile1_time.push(dashboard.quantile(temp_delta_time,25)) ;// 1er quartile de la question
                vAvg_quest_bio.yData.data_frame_time.quartile3_time.push(dashboard.quantile(temp_delta_time,75)) ;  //3ème quartile de la question
                vAvg_quest_bio.yData.data_frame_time.max_time.push(dashboard.quantile(temp_delta_time,100));  //3ème quartile de la question


                //vAvg_quest_bio.yData.delta_time.push(temp_delta_time);
                //console.log(temp_delta_time);
                vAvg_quest_bio.yData.pre_score_scaled.push(temp_pre_score_scaled);

                // Data frame score
                vAvg_quest_bio.yData.data_frame_score.median_score.push(dashboard.quantile(temp_pre_score_scaled,50));//median de la question
                vAvg_quest_bio.yData.data_frame_score.quartile3_score.push(dashboard.quantile(temp_pre_score_scaled,25)) ;// 1er quartile de la question
                vAvg_quest_bio.yData.data_frame_score.quartile3_score.push(dashboard.quantile(temp_pre_score_scaled,75)) ;  //3ème quartile de la question
                vAvg_quest_bio.yData.data_frame_score.max_score.push(dashboard.quantile(temp_pre_score_scaled,100));  //3ème quartile de la question
            }


            // temps de réponse d'un étudiant pour chaque question d'un questionnaire
            vAvg_quest_bio.yData.delta_time=dashboard.calc_nested_delta_time(vAvg_quest_bio.yData.max_time,vAvg_quest_bio.yData.min_time); //delta_time= max_time-min_time
            //console.log(vAvg_quest_bio.yData.delta_time);
            // moyenne du temps de réponse d'un étudiant sur tout un questionnaire
            vAvg_quest_bio.yData.avg_time=dashboard.calc_avg_nested(vAvg_quest_bio.yData.delta_time);
            vAvg_quest_bio.yData.avg_time=dashboard.calc_milis_to_min(vAvg_quest_bio.yData.avg_time); // convert to sec

            //vAvg_quest_bio.yData.avg_time.sort();
            //vAvg_quest_bio.yData.avg_time.reverse();
            //console.log(vAvg_quest_bio.yData.avg_time);
            vAvg_quest_bio.yData.stdev_time=dashboard.calc_unbiaised_stdev_nested(vAvg_quest_bio.yData.delta_time);
            vAvg_quest_bio.yData.stdev_time=dashboard.calc_milis_to_min(vAvg_quest_bio.yData.stdev_time);


            // nombre moyen de changement de réponse par étudiant sur tout un questionnaire
            vAvg_quest_bio.yData.avg_nb_change=dashboard.calc_avg_nested(vAvg_quest_bio.yData.nb_change);
            // vAvg_quest_bio.yData.avg_nb_change.sort();
            // vAvg_quest_bio.yData.avg_nb_change.reverse();
            //console.log(vAvg_quest_bio.yData.avg_nb_change);
            vAvg_quest_bio.yData.stdev_nb_change=dashboard.calc_unbiaised_stdev_nested(vAvg_quest_bio.yData.nb_change);

            // score moyen d'un utilisateur sur tout un questionnaire
            vAvg_quest_bio.yData.avg_score_scaled=dashboard.calc_avg_nested(vAvg_quest_bio.yData.pre_score_scaled);
            // vAvg_quest_bio.yData.avg_score_scaled.sort();
            //vAvg_quest_bio.yData.avg_score_scaled.reverse();
            vAvg_quest_bio.yData.stdev_score_scaled=dashboard.calc_unbiaised_stdev_nested(vAvg_quest_bio.yData.pre_score_scaled);

            vAvg_quest_bio.yMean=dashboard.calc_avg(vAvg_quest_bio.yData.avg_score_scaled);
            vAvg_quest_bio.yStdev=dashboard.calc_unbiaised_stdev(vAvg_quest_bio.yData.avg_score_scaled);  //= écart-type de la moyenne des score par utilisateurs
            // != écart type des écarts type du score au questionnaire d'un user

            vAvg_quest_bio.query_size.nb_user=vAvg_quest_bio.xData.length;


            // Construct data frame

            // Data frame
            vAvg_quest_bio.yData.data_frame_score.avg_score=vAvg_quest_bio.yData.avg_score_scaled;
            vAvg_quest_bio.yData.data_frame_nb_change.avg_change=vAvg_quest_bio.yData.avg_nb_change;
            vAvg_quest_bio.yData.data_frame_time.avg_time=vAvg_quest_bio.yData.avg_time;


        }; // function set yData


        dashboard.send_Xhr(dashboard.readData, vAvg_quest_bio);

        dashboard.graphs.push(vAvg_quest_bio);	// ajout du graph dans a liste de graphs

    }//fin init()


	}; // fin namespace
//
// dashboard.Data = function(data){	//déclaration d'un constructeur d'objet : new_object= new dashboard.Data(data)
// 	this.graph = data;
// };
// dashboard.Data.prototype.buildGraph = function(){	// méthode de classe
// 	//
// };
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
            console.log("not ready yet");
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
    }
    return obj;
};

dashboard.readData= function (response_to_format, graph_data){ // traite la réponse Xhr

    graph_data.nb_tot=graph_data.set_nb_tot(response_to_format);

    graph_data.set_yData(response_to_format);

    graph_data.query_size=graph_data.yData.length;	// update size of data

    graph_data.plotMe(graph_data);
};


dashboard.plotBar= function(graph_data, tab_to_plot){
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





    // var data = [
    //     {
    //         //x: graph_data.xData,  // Données axe x
    //         y: graph_data.yData.avg_score_scaled,   // Données axe y
    //         name : graph_data.yLabel,
    //         type: 'bar'
    //     }
    //
    // ];

    // var mean_line={
    //     name:graph_data.yMean_label,
    //     type:'lines',
    //     x:[0,graph_data.yData.avg_score_scaled.length],
    //     y:[graph_data.yMean,graph_data.yMean],	// moyenne - écart type corrigée
    //     marker: {         // marker is an object, valid marker keys: #scatter-marker
    //         color: 'rgb(255,140,0)'
    //     }
    // };
    // data.push(mean_line);	// add to plotly
    //
    // var stdev_upper_line={
    //     name:graph_data.yMean_label + ' +' + graph_data.yStdev_label,
    //     type:'lines',
    //     x:[0,graph_data.yData.avg_score_scaled.length],
    //     y:[graph_data.yMean+graph_data.yStdev,graph_data.yMean+graph_data.yStdev],	// moyenne - écart type corrigée
    //     marker: {         // marker is an object, valid marker keys: #scatter-marker
    //         color: 'rgb(51,255,51)'
    //     }
    // };
    // data.push(stdev_upper_line);	//add to plotly
    //
    // var stdev_lower_line={
    //     name:graph_data.yMean_label + ' -' + graph_data.yStdev_label,
    //     type:'lines',
    //     x:[0,graph_data.yData.avg_score_scaled.length],
    //     y:[graph_data.yMean-graph_data.yStdev,graph_data.yMean-graph_data.yStdev],	// moyenne - écart type corrigée
    //     marker: {         // marker is an object, valid marker keys: #scatter-marker
    //         color: 'rgb(255,51,51)'
    //     }
    // }
    // data.push(stdev_lower_line);
//
//  var avgObj={
//   name: 'average organization',
//   type: 'scatter',
//   x: [60],
//   y: [""],
//   orientation: 'v',
//   type: 'bar'
// }
//     var layout = {
//         title: graph_data.title,
//         showlegend: true,
//         yaxis: {range: [0,1],
//             title:graph_data.yLabel},	// setting manual range of axes
//         xaxis: {title:graph_data.xLabel}	// setting manual range of axes
//         //    shapes: [
//         //   //Line Horizontal
//         //   {
//         //     type: 'line',
//         // xref: 'paper',
//         // x0: 0,
//         // y0: graph_data.mean,
//         // x1: 1,
//         // y1: graph_data.mean,
//         //     line: {
//         //       color: 'rgb(50, 171, 96)',
//         //       width: 3      }
//         //   }
//         // ]
//     };

    var data=[];
    for(var i=0; i<graph_data.tab_to_plot.length;++i){
        var temp_data = graph_data.tab_to_plot[i].yData;

        //console.log(graph_data.yData[temp_data]);

        data.push({y:graph_data.yData[temp_data],
            name:graph_data.tab_to_plot[i].ylabel,
            type:'bar'});

        var layout = {
            title: graph_data.tab_to_plot[i].title,
            showlegend: true,
            yaxis: {//range: [0,1],
                title:graph_data.tab_to_plot[i].ylabel},	// setting manual range of axes
            xaxis: {title:graph_data.tab_to_plot[i].xlabel}	// setting manual range of axes
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

        //console.log(data);
        Plotly.newPlot(graph_data.tab_to_plot[i].DOM_id, [data[i]], layout, {displaylogo: false}, {showLink: false});
    }


};//end function plotBar



dashboard.plot_quest= function(graph_data){

    // var index=[];
    // for (var i = 0; i <= graph_data.xData.length-1; i++) {
    //     index.push(i);
    // }
    
    // ***************** Plot score avg **************************
    var data_score_avg=[];

    var temp_data_to_plot={
        
        y:graph_data.yData.data_frame_score.avg_score,
        name:graph_data.yLabel.score.yaxis,
        type:'bar'
    };


    // var temp_data_median={
    //     
    //     y:graph_data.yData.data_frame_score.median_score,
    //     name:"Médiane du score d'une question au questionnaire",
    //     type:'bar'
    // };


    // var temp_data_quart1={
    //     
    //     y:graph_data.yData.data_frame_score.median_score,
    //     name:"1er quartile du score d'une question au questionnaire",
    //     type:'bar'
    // };


    // var temp_data_quart3={
    //     
    //     y:graph_data.yData.data_frame_score.median_score,
    //     name:"3ème quartile du score d'une question au questionnaire",
    //     type:'bar'
    // };

    // data_score_avg.push(temp_data_quart1);
    // data_score_avg.push(temp_data_median);
    // data_score_avg.push(temp_data_quart3);

    data_score_avg.push(temp_data_to_plot);


    var mean_line={
            name:graph_data.yMean_label,
            type:'lines',
            x:[0,graph_data.yData.avg_score_scaled.length-1],
            y:[graph_data.yMean,graph_data.yMean],	// moyenne - écart type corrigée
            marker: {         // marker is an object, valid marker keys: #scatter-marker
                color: 'rgb(255,140,0)'
            }
        };
        data_score_avg.push(mean_line);	// add to plotly

        var stdev_upper_line={
            name:graph_data.yMean_label + ' +' + graph_data.yStdev_label,
            type:'lines',
            x:[0,graph_data.yData.avg_score_scaled.length-1],
            y:[graph_data.yMean+graph_data.yStdev,graph_data.yMean+graph_data.yStdev],	// moyenne - écart type corrigée
            marker: {         // marker is an object, valid marker keys: #scatter-marker
                color: 'rgb(51,255,51)'
            }
        };
        data_score_avg.push(stdev_upper_line);	//add to plotly

        var stdev_lower_line={
            name:graph_data.yMean_label + ' -' + graph_data.yStdev_label,
            type:'lines',
            x:[0,graph_data.yData.avg_score_scaled.length-1],
            y:[graph_data.yMean-graph_data.yStdev,graph_data.yMean-graph_data.yStdev],	// moyenne - écart type corrigée
            marker: {         // marker is an object, valid marker keys: #scatter-marker
                color: 'rgb(255,51,51)'
            }
        }
        data_score_avg.push(stdev_lower_line);

    // Layout
    var layout = {
        title: graph_data.title,
        showlegend: true,
        yaxis: {range: [0,1],
            title:graph_data.yLabel.score.yaxis},	// setting manual range of axes
        xaxis: {title:graph_data.xLabel}	// setting manual range of axes


    };

    Plotly.newPlot(graph_data.DOM_id.score, data_score_avg, layout, {displaylogo: false}, {showLink: false});



//****************** PLOT nb changement *********************

    var data_nb_change_avg=[];
    temp_data=graph_data.yData.avg_nb_change;

    temp_data_to_plot={
        y:graph_data.yData.data_frame_nb_change.max_change,
        name:graph_data.yLabel.change.max,
        type:'bar'
    };


    temp_data_median={
        
        y:graph_data.yData.data_frame_nb_change.median_change,
        name:graph_data.yLabel.change.median,
        type:'bar'
    };


    temp_data_quart1={
        
        y:graph_data.yData.data_frame_nb_change.quartile1_change,
        name:graph_data.yLabel.change.quart1,
        type:'bar'
    };


    temp_data_quart3={
        
        y:graph_data.yData.data_frame_nb_change.quartile3_change,
        name:graph_data.yLabel.change.quart3,
        type:'bar'
    };

    data_nb_change_avg.push(temp_data_quart1);
	data_nb_change_avg.push(temp_data_median);
    data_nb_change_avg.push(temp_data_quart3);
    data_nb_change_avg.push(temp_data_to_plot);

    var mean_label =graph_data.yLabel.change.mean_line;
    var mean_value=dashboard.calc_avg(graph_data.yData.avg_nb_change);
    var std_value=dashboard.calc_unbiaised_stdev(graph_data.yData.avg_nb_change);


    mean_line={
        name:mean_label,
        type:'lines',
        x:[0,graph_data.yData.avg_nb_change.length-1],
        y:[mean_value,mean_value],	// moyenne
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(255,140,0)'
        }
    };
    data_nb_change_avg.push(mean_line);	// add to plotly

    stdev_upper_line={
        name:mean_label + ' +' + graph_data.yStdev_label,
        type:'lines',
        x:[0,graph_data.yData.avg_nb_change.length-1],
        y:[mean_value+std_value, mean_value+std_value ],	// moyenne - écart type corrigée
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(51,255,51)'
        }
    };
    data_nb_change_avg.push(stdev_upper_line);	//add to plotly

    stdev_lower_line={
        name: mean_label + ' -' + graph_data.yStdev_label,
        type:'lines',
        x:[0,graph_data.yData.avg_nb_change.length-1],
        y:[mean_value-std_value, mean_value-std_value ],	// moyenne - écart type corrigée
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(255,51,51)'
        }
    }
    data_nb_change_avg.push(stdev_lower_line);

    // Layout
    layout = {
        barmode:'group',
        title: graph_data.yLabel.change.title,
        showlegend: true,
        yaxis: {title:graph_data.yLabel.change.yaxis},
        xaxis: {title:graph_data.yLabel.change.xaxis}
    };

    Plotly.newPlot(graph_data.DOM_id.change, data_nb_change_avg, layout, {displaylogo: false}, {showLink: false});



    //****************** Plot temps réponse *********************

    var data_deltaT_avg=[];
    temp_data=graph_data.yData.avg_time;

    temp_data_to_plot={
        
        y:graph_data.yData.data_frame_time.max_time,
        name:graph_data.yLabel.deltaT.max,
        type:'bar'
    };


    temp_data_median={
        
        y:graph_data.yData.data_frame_time.median_time,
        name:graph_data.yLabel.deltaT.median,
        type:'bar'
    };


    temp_data_quart1={
        
        y:graph_data.yData.data_frame_time.quartile1_time,
        name:graph_data.yLabel.deltaT.quart1,
        type:'bar'
    };


    temp_data_quart3={
        
        y:graph_data.yData.data_frame_time.quartile3_time,
        name:graph_data.yLabel.deltaT.quart3,
        type:'bar'
    };


    data_deltaT_avg.push(temp_data_quart1);
    data_deltaT_avg.push(temp_data_median);
    data_deltaT_avg.push(temp_data_quart3);
    data_deltaT_avg.push(temp_data_to_plot);


    mean_label =graph_data.yLabel.deltaT.mean_line;
    mean_value=dashboard.calc_avg(temp_data);
    std_value=dashboard.calc_unbiaised_stdev(temp_data);

    mean_line={
        name:mean_label,
        type:'lines',
        x:[0,temp_data.length-1],
        y:[mean_value,mean_value],	// moyenne
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(255,140,0)'
        }
    };
    data_deltaT_avg.push(mean_line);	// add to plotly

    stdev_upper_line={
        name:mean_label + ' +' + graph_data.yStdev_label,
        type:'lines',
        x:[0,graph_data.yData.avg_nb_change.length-1],
        y:[mean_value+std_value, mean_value+std_value ],	// moyenne - écart type corrigée
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(51,255,51)'
        }
    };
    data_deltaT_avg.push(stdev_upper_line);	//add to plotly

    stdev_lower_line={
        name:mean_label + ' -' + graph_data.yStdev_label,
        type:'lines',
        x:[0,graph_data.yData.avg_nb_change.length-1],
        y:[mean_value-std_value, mean_value-std_value ],	// moyenne - écart type corrigée
        marker: {         // marker is an object, valid marker keys: #scatter-marker
            color: 'rgb(255,51,51)'
        }
    };
    data_deltaT_avg.push(stdev_lower_line);

    // Layout
    layout = {
        barmode:'group',
        title: graph_data.yLabel.deltaT.title,
        showlegend: true,
        yaxis: {title:graph_data.yLabel.deltaT.yaxis},	// setting manual range of axes
        xaxis: {title:graph_data.yLabel.deltaT.xaxis}	// setting manual range of axes

    };

    Plotly.newPlot(graph_data.DOM_id.deltaT, data_deltaT_avg, layout, {displaylogo: false}, {showLink: false});





};//end function plot

dashboard.calc_delta_time= function(tab1, tab2){
	var delta_time=[];


        for (var j = 0; j < tab1.length; j++) {
            delta_time.push(Math.abs(tab1[j] - tab2[j]));
        }

	return delta_time;
};

dashboard.calc_nested_delta_time= function(tab1, tab2){
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

dashboard.calc_milis_to_sec= function(tab){
    var to_sec=[];

    for(var i=0; i<tab.length;i++) {
        to_sec.push(tab[i]/1000);
    }
    return to_sec;
};

dashboard.calc_milis_to_min= function(tab){
    var to_min=[];

    for(var i=0; i<tab.length;i++) {
        to_min.push((tab[i]/3600));
    }
    return to_min;
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

dashboard.calc_avg= function(tab){
    var sum=0;
    temp=tab;
    temp.forEach(function(temp){
        sum+=temp;
    });

    var n=temp.length;
    return sum/n;
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

dashboard.calc_unbiaised_stdev= function(tab){	//= sqrt( (1/n-1)  * (sum(x_i^2) - n* avg^2))
    var avg=dashboard.calc_avg(tab);
    var sum_squared=0;

    tab.forEach(function(tab){
        sum_squared+=Math.pow(tab,2);
    });

    var n=tab.length;
    var unbiaised_Var=(sum_squared-n*Math.pow(avg,2))/(n-1);

    return Math.sqrt((unbiaised_Var));
};

dashboard.sort_by_key = function(graph_data, key){// construit le data frame pour effectuer des tris par clé


};

dashboard.getMedian=function(arrOfNums) {
    var result =0;
    var sortedArr = arrOfNums.sort(function(num1, num2) {
        return num1 - num2;
    });

    var medianIndex = Math.floor(sortedArr.length / 2);
    if (arrOfNums.length % 2 === 0) {
        result=(sortedArr[medianIndex-1] + sortedArr[medianIndex]) / 2;
        return result;
    } else {
        result=(sortedArr[medianIndex]);
        return result;
    }
};

dashboard.sortNumber=function(a,b) {
    return a - b;
}

dashboard.quantile=function(array, percentile) {
    array.sort(dashboard.sortNumber);
    index = percentile/100. * (array.length-1);
    if (Math.floor(index) == index) {
        result = array[index];
    } else {
        i = Math.floor(index)
        fraction = index - i;
        result = array[i] + (array[i+1] - array[i]) * fraction;
    }
    return result;
}





