export const MODELS = ["bert-base-cased" ,"bert-base-multilingual-uncased" ,"bert-base-multilingual-cased" ,
    "bert-base-uncased" ,"bert-large-uncased" , "bert-large-cased"];


export const DATA_SOURCE_CHOICES = ["complete", "abstract", "hard and known", "nominalized"];

export const NO_FILTER_NAME = "No Filter Name";

export const METRIC_CHOICES = ["k@1 accuracy", "k@10 accuracy", "k@100 accuracy"];

export const CARDINALITIES = ["1:1", "N:1", "N:M"];

export const KEYS = {
    typology: ["simple", "compound", "complex", "compound-complex"],
    verbs: ["active", "passive", "nominalized"],
    complete: ["simple", "compound", "complex", "compound-complex", "active", "passive", "nominalized"]
}

export const NOMINALIZED_RELATIONS = ["P127", "P136", "P176", "P178", "P413", "P1303"];