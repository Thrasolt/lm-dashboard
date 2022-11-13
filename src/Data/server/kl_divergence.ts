import {SentenceComparisons, SentenceValues} from "../types";

const KEYS = ["simple", "compound", "complex", "compound-complex"];

const kl_divergence = (leftProb: number[], rightProb: number[]) => {
    let value = 0.0;
    for(let index=0; index<leftProb.length; index++) {
        let p = leftProb[index];
        let q = rightProb[index];
        if (p>0 && q>0) {
            value += p * Math.log(p/q);
        }
    }
    return value;
}

export const calculateProbabilitiesHeatMap = (probabilities: SentenceValues) => {
    const matrix: number[][] = [];
    for (let rowKey of KEYS) {
        const row: number[] = [];
        for (let colKey of KEYS) {
            // @ts-ignore
            row.push(kl_divergence(probabilities[rowKey], probabilities[colKey]))
        }
        matrix.push(row);
    }
    return matrix;
}

const emptySentenceComparisonMap = () => {
    const innerMap = Object.fromEntries( KEYS.map( key => [key, 0.0]));
    return Object.fromEntries(KEYS.map(key => [key, structuredClone(innerMap)]));
}

const  transformComparisonRowToMap = (values: SentenceComparisons[]) => {
    const finalMap = emptySentenceComparisonMap();

    for (let row of values) {
        finalMap[row.left_sentence][row.right_sentence] = row.value;
    }

    return finalMap;

}

export const calculateComparisonHeatMap = (values: SentenceComparisons[]) => {
    const sentenceComparisonMap = transformComparisonRowToMap(values);

    const matrix: number[][] = [];
    for (let rowKey of KEYS) {
        const row: number[] = [];
        for (let colKey of KEYS) {
            // @ts-ignore
            row.push(sentenceComparisonMap[rowKey][colKey])
        }
        matrix.push(row);
    }
    return matrix;

}