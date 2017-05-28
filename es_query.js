// ------------------------ /!\ NOT UPDATED -----------------------------


// Query all document
//    var query_all={
//        "query": {
//            "match_all": {
//
//            }
//        }
//    };


// Query XContentApi && Partenaires/UL
var query_UL = {
    "from" :0, size:"100",
    "query": {
        "bool": {
            "must": [
                { "match": { "type":   "XContentApi"        }},
                { "match": { "depot_path": "/Partenaires/UL" }}
            ]
        }
    }
};

// Query XContentApi && Phy01 (toutes questions)
var query_UL_phy={
    "from":0, size:"100",
    "query": {
        "filtered": {
            "query": {
                "match_all": {}
            },
            "filter": {
                "bool": {
                    "must":[
                        {"match":{ "type":"XContentApi"}},
                        {"match":{"depot_path":"/Partenaires/UL/UL-Phy-01"}},
                        {
                            "exists": {
                                "field": "score_scaled"
                            }
                        }]
                }
            }
        }
    }
};

// Query XContentApi && Phy01 && Sans groupe question_id (avec filter)
// Pb.? Encore des UL-Bio?..
var query_UL_phy_excl={
    "from":0, "size":100,
    "query": {
        "filtered": {
            "query": {
                "match_all": {}
            },
            "filter": {
                "bool": {
                    "must":[// type XContent && Phy0-01 questionnaire
                        {"match":{ "type":"XContentApi"}},
                        {"match":{"depot_path":"/Partenaires/UL/UL-Phy-01"}},
                        {
                            "exists": {//only if field score_scaled exists
                                "field": "score_scaled"
                            }
                        }],
                    "must_not"://exclude group question
                        [
                            {"match": {"question_id":"qgMx9nWg3feUknCfwecgli"}},
                            {"match": {"question_id":"pky45GVJlvk0YYYe0wiTxe"}},
                            {"match": {"question_id":"KDiQi0UNikeZBzySvmA2k"}},
                            {"match": {"question_id":"Dvj5AqVq4RiIbIFWaJuSud"}},
                            {"match": {"question_id":"qVTVybVQlxckqCv1EI54h"}},
                            {"match": {"question_id":"udFJDEATISe7oQfqnd9Kki"}}
                        ]
                }
            }
        }
    }
};

// Query avg_score : XContentApi && Phy01 && Sans groupe question_id (sans filter)
// Pb.? Pas meme valeur avg trouvé avec Kibana.. => à priori pas de UL-Bio mais autant de "hits" qu'avec query_UL_phy_excl?
var query_UL_phy_avg_user_id={
    "from":0, "size":100,
    "query": {
        "bool": {
            "must":
                [
                    {"match":{ "type":"XContentApi"}},
                    {"match":{"depot_path": "/Partenaires/UL/UL-Phy01"}},
                    {"exists": {"field": "score_scaled"}}
                ],

            "must_not":
                [
                    {"match": {"question_id":"qgMx9nWg3feUknCfwecgli"}},
                    {"match": {"question_id":"pky45GVJlvk0YYYe0wiTxe"}},
                    {"match": {"question_id":"KDiQi0UNikeZBzySvmA2k"}},
                    {"match": {"question_id":"Dvj5AqVq4RiIbIFWaJuSud"}},
                    {"match": {"question_id":"qVTVybVQlxckqCv1EI54h"}},
                    {"match": {"question_id":"udFJDEATISe7oQfqnd9Kki"}}
                ]
        }
    },
    "aggregations": {
        "avg_user": {
            "terms": {
                "field": "user.raw",
                "size":100
            },
            "aggregations": {
                "score_avg": {
                    "avg": {
                        "field": "score_scaled"
                    }
                }
            }
        }
    }
};


var query_UL_phy_avg_quest_id={
    "from":0, "size":100,
    "query": {
        "bool": {
            "must":
                [
                    {"match":{ "type":"XContentApi"}},
                    {"match":{"depot_path": "/Partenaires/UL/UL-Phy01"}},
                    {"exists": {"field": "score_scaled"}}
                ],

            "must_not":
                [
                    {"match": {"question_id":"qgMx9nWg3feUknCfwecgli"}},
                    {"match": {"question_id":"pky45GVJlvk0YYYe0wiTxe"}},
                    {"match": {"question_id":"KDiQi0UNikeZBzySvmA2k"}},
                    {"match": {"question_id":"Dvj5AqVq4RiIbIFWaJuSud"}},
                    {"match": {"question_id":"qVTVybVQlxckqCv1EI54h"}},
                    {"match": {"question_id":"udFJDEATISe7oQfqnd9Kki"}}
                ]
        }
    },
    "aggregations": {
        "avg_quest": {
            "terms": {
                "field": "question_id.raw",
                "size":100
            },
            "aggregations": {
                "score_avg": {
                    "avg": {
                        "field": "score_scaled"
                    }
                }
            }
        }
    }
};

// ******************************* UL-BIO ************************************************


var query_UL_Bio_avg_user_id={
    "from":0, "size":100,
    "query": {
        "bool": {
            "must":
                [
                    {"match":{ "type":"XContentApi"}},
                    {"match":{"depot_path": "/Partenaires/UL/UL-Bio"}},
                    {"exists": {"field": "score_scaled"}}
                ],

            "must_not":
                [
                    {"match": {"question_id":"i6nRY2FhjtlKF4kAuRVlLi"}},
                    {"match": {"question_id":"j74GTDxCdUh1AhUJbxzOCg"}},
                    {"match": {"question_id":"Ro8Bn94sH5fiObRDLGMDub"}},
                    {"match": {"question_id":"AXGE9teKhMdo4j0BsK6x8f"}},
                    {"match": {"question_id":"AXGE9teKhMdo4j0BsK6x8f"}},
                    {"match": {"question_id":"XSSBiN8sCL10gnc6XsIUi"}},
                    {"match": {"question_id":"ImUQEzT8sjgXe0C5WIYD9g"}},
                    {"match": {"question_id":"QWGy9VVCetknLGk0eUfkvc"}}
                ]
        }
    },
    "aggregations": {
        "avg_user": {
            "terms": {
                "field": "user.raw",
                "size":100
            },
            "aggregations": {
                "score_avg": {
                    "avg": {
                        "field": "score_scaled"
                    }
                }
            }
        }
    }
};


var query_UL_Bio_avg_quest_id={
    "from":0, "size":100,
    "query": {
        "bool": {
            "must":
                [
                    {"match":{ "type":"XContentApi"}},
                    {"match":{"depot_path": "/Partenaires/UL/UL-Bio"}},
                    {"exists": {"field": "score_scaled"}}
                ],

            "must_not":
                [
                    {"match": {"question_id":"i6nRY2FhjtlKF4kAuRVlLi"}},
                    {"match": {"question_id":"j74GTDxCdUh1AhUJbxzOCg"}},
                    {"match": {"question_id":"Ro8Bn94sH5fiObRDLGMDub"}},
                    {"match": {"question_id":"AXGE9teKhMdo4j0BsK6x8f"}},
                    {"match": {"question_id":"BdYLqQ15ObfDNWH4r8ES1d"}},
                    {"match": {"question_id":"XSSBiN8sCL10gnc6XsIUi"}},
                    {"match": {"question_id":"ImUQEzT8sjgXe0C5WIYD9g"}},
                    {"match": {"question_id":"QWGy9VVCetknLGk0eUfkvc"}},
                    {"match": {"question_id":"LWF7Tquh7XgWIQLImXgie"}},
                    {"match": {"question_id":"XSSBiN8sCL10gnc6XsIUi"}},

                    

                ]
        }
    },
    "aggregations": {
        "avg_quest": {
            "terms": {
                "field": "question_id.raw",
                "size":100
            },
            "aggregations": {
                "score_avg": {
                    "avg": {
                        "field": "score_scaled"
                    }
                }
            }
        }
    }
};

//Questionnaire Phy01
var query_verb_search={
    
  "query": {
   
      
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
            },
             {
              "match": {
                "verb.raw": "attempted"
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
      
    } 
}


// Questionnaire Phy01
var query_verb_cardinality = {
    "size":0,
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
"aggs" : {
        "distinct_verb" : {
            "cardinality" : {
              "field" : "verb.raw"
            }
        }
    }
    }
  }
}

var query_verb_terms_agg ={
    "size":0,
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
 "aggs" : {
        "genres" : {
            "terms" : { "field" : "verb.raw" }
        }
    }
    }
  }
}



// Réu 26.05.17 avec Thibault :
/* Query avec sous aggregations :
[
    user1[{q1.max_time, q1.min_time},{q2.max_time, q2.min_time}, ...],
    user2[{q1.max_time, q1.min_time},{q1.max_time, q1.min_time}, ...],
]
*/
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
                "question_id": {
                    "terms": {
                        "field": "question_id.raw",
                        "size": 50
                    },
                    "aggs": {
                        "max_time": {
                            "top_hits": {
                                "size": 1,
                                "fields": [
                                    "question_id",
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
                                    "question_id",
                                    "timestamp",
                                    "score_scaled"
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
                "field": "question.raw",
                "size": 50
            },
            "aggs": {
                "users": {
                    "terms": {
                        "field": "user_id.raw",
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
                                {
                        "min_time": {
                            "top_hits": {
                                "size": 1,
                                "fields": [
                                    "timestamp",
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
}

/* Query avec sous aggregations :
[
    question1[{user.max_time, q1.min_time},{q2.max_time, q2.min_time}, ...],
    user2[{q1.max_time, q1.min_time},{q1.max_time, q1.min_time}, ...],
]
*/