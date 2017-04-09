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
var query_UL_phy_avg={
    "from":0, "size":1000,
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