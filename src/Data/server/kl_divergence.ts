import {ComnpleteValues, SentenceComparisons, SentenceValues, VerbValues} from "../types";

const KEYS = ["simple", "compound", "complex", "compound-complex"];

const kl_divergence = (leftProb: number[], rightProb: number[]) => {
    let value = 0.0;
    if (leftProb && rightProb) {
        for(let index=0; index<leftProb.length; index++) {
            let p = leftProb[index];
            let q = rightProb[index];
            if (p>0 && q>0) {
                value += p * Math.log(p/q);
            }
        }
    }
    return value;
}

export const calculateProbabilitiesHeatMap = (probabilities: SentenceValues | VerbValues | ComnpleteValues , keys: string[] = KEYS) => {
    const matrix: number[][] = [];
    for (let rowKey of keys) {
        const row: number[] = [];
        for (let colKey of keys) {
            // @ts-ignore
            row.push(kl_divergence(probabilities[rowKey], probabilities[colKey]))
        }
        matrix.push(row);
    }
    return matrix;
}

const emptySentenceComparisonMap = (keys: string[] = KEYS) => {
    const innerMap = Object.fromEntries( keys.map( key => [key, 0.0]));
    return Object.fromEntries(keys.map(key => [key, structuredClone(innerMap)]));
}

const transformComparisonRowToMap = (values: SentenceComparisons[], keys: string[]) => {
    const finalMap = emptySentenceComparisonMap(keys);

    for (let row of values) {
        if (keys.includes(row.left_sentence) && keys.includes(row.right_sentence)) {
            finalMap[row.left_sentence][row.right_sentence] = row.value;
        }
    }

    return finalMap;

}

export const calculateComparisonHeatMap = (values: SentenceComparisons[], keys: string[] = KEYS) => {
    const sentenceComparisonMap = transformComparisonRowToMap(values, keys);

    const matrix: number[][] = [];
    for (let rowKey of keys) {
        const row: number[] = [];
        for (let colKey of keys) {
            // @ts-ignore
            row.push(sentenceComparisonMap[rowKey][colKey])
        }
        matrix.push(row);
    }
    return matrix;

}