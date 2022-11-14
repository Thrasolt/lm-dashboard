export type AggregateDataRow  = {
    id: number;
    model: string;
    measure: string;
    data: string;
    sentence: string;
    filterName: string | null;
    value: number;
}

export type AggregateRow  = {
    id: number;
    model: string;
    measure: string;
    data: DataSourceType;
    sentence: SentenceTyp;
    filterName: string | null;
    value: number;
}

export type ScoreRow = {
    id: number;
    model: string;
    sentence: string;
    relation: string
    subject: string;
    object: string;
    score: number;
}

export type ModelSentenceTypeRow = {
    model: string;
    simple: number;
    compound: number;
    complex: number;
    "compound-complex": number;
    active: string;
    passive: string;
    nominalized: string;
}

export type MetricSentenceTypeRow = {
    metric: MetricType;
    simple: number;
    compound: number;
    complex: number;
    "compound-complex": number;
    active: string;
    passive: string;
    nominalized: string;
}

export type RelationSentenceTypeRow = {
    relation: string;
    simple: number;
    compound: number;
    complex: number;
    "compound-complex": number;
    active: string;
    passive: string;
    nominalized: string;

}

export type SentenceValues = {
    simple: number[],
    compound: number[],
    complex: number[],
    "compound-complex": number[]
}

export type SentenceComparisons = {
    left_sentence: string,
    right_sentence: string,
    value: number
}

export type SentenceTyp = "simple" | "compound" | "complex" | "compound-complex"

export type boradFilterNameType = "1:1" | "N:1" | "N:M" | null;

export type DataSourceType = "complete" | "abstract" | "nominalized" | "hard" | "easy" | "known" | "hard and known";

export type MetricType = "k@1 accuracy" | "k@10 accuracy" | "k@100 accuracy" | "correct token probability"
    | "correct token probability top_k:500"

export type Model = "bert-base-cased" | "bert-base-multilingual-uncased" | "bert-base-multilingual-cased"
    | "bert-base-uncased" | "bert-large-uncased" | "bert-large-cased"