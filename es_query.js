var avg_user_phy=
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
                            "faq2sciencesdistrib-2016.09.24"                        ]
                    }
                },
                {
                    "term": {
                        "depot_path.raw": "/Partenaires/UL/UL-Phy01"
                    }
                },
                {
                    "exists" : { "field" : "response" }
                },                
                {
                    "term": {
                        "verb.raw": "scored"
                    }
                },
                {
                "range": {
                    "user":{
                        "gt": 4912                                               
                        }
                            
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
};


var avg_user_bio=
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
                                    "faq2sciencesdistrib-2016.09.24"                                ]
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
                        },
                        {
                            "exists" : { "field" : "response" }
                        },
                        {
                        "range": {
                            "user":{
                                "gt": 4912                                               
                                }
                                    
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
}





var avg_quest_phy =
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
                            "faq2sciencesdistrib-2016.09.24"                        ]
                    }
                },
                {
                    "term": {
                        "depot_path.raw": "/Partenaires/UL/UL-Phy01"
                    }
                },
                {
                    "exists" : { "field" : "response" }
                },                
                {
                    "term": {
                        "verb.raw": "scored"
                    }
                },
                {
                "range": {
                    "user":{
                        "gt": 4912                                               
                        }
                            
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
}

var avg_quest_bio =
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
                            "faq2sciencesdistrib-2016.09.24"                        ]
                    }
                },
                {
                    "exists" : { "field" : "response" }
                },
                {
                    "term": {
                        "depot_path.raw": "/Partenaires/UL/UL-Bio"
                    }
                },
                {
                    "term": {
                        "verb.raw": "scored"
                    },
                {
                "range": {
                    "user":{
                        "gt": 4912                                               
                        }
                            
                    }
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
}








