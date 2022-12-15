import {ScoreRow, SentenceValues, SentenceTyp, ComnpleteValues, VerbValues} from "./types";
import {CARDINALITIES, KEYS, NOMINALIZED_RELATIONS} from "./Constants";
import {relationToCardinality} from "./cardinalities";
import {KeySetting} from "../Container/Container";

type Probfunction = {
    simple: (score: number) => number;
    compound: (score: number) => number;
    complex: (score: number) => number;
    "compound-complex": (score: number) => number;
    active: (score: number) => number;
    passive: (score: number) => number;
    nominalized: (score: number) => number;
}


function filterForCardinalities(cardinality: string, newScoreData: ScoreRow[]) {
    if (CARDINALITIES.includes(cardinality)) {
        newScoreData = newScoreData.filter((row) => relationToCardinality(row.relation) === cardinality);
    }
    return newScoreData;
}

function filterForKeySettings(keySetting: "typology" | "verbs" | "complete", newScoreData: ScoreRow[]) {
    if (keySetting !== "typology") {
        newScoreData = newScoreData.filter((row) => NOMINALIZED_RELATIONS.includes(row.relation));
    }
    return newScoreData;
}

export const getProbabilities = (scoreData: ScoreRow[], cardinality: string,
                                 numberOfPockets: number, numberOfPoints: number,
                                 keySetting: KeySetting) => {

    const newScoreData = filterForKeySettings(keySetting, filterForCardinalities(cardinality, scoreData));

    return getProbGraph(newScoreData, numberOfPockets, numberOfPoints, keySetting);
}

const getSentenceScores = (data: ScoreRow[], keySetting: KeySetting = "typology") => {
    let sentenceScores: SentenceValues | ComnpleteValues | VerbValues = getEmptySentenceScores()

    if (keySetting !== "complete") {
        sentenceScores = {
            ...sentenceScores,
            active:[],
            passive: [],
            nominalized:  []
        } as ComnpleteValues;
    } else {
        sentenceScores = {
            active:[],
            passive: [],
            nominalized:  []
        } as VerbValues;
    }





    for (let row of data) {
        if (Object.keys(sentenceScores).includes(row.sentence)) {
            // @ts-ignore
            sentenceScores[row.sentence].push(row.score);
        }

    };
    return sentenceScores;
}

const getScoreProbabilityFunction = (numberOfPockets: number, scores: number[]) => {
    // @ts-ignore
    const pockets = [...Array(numberOfPockets).keys()].map(() => 0)
    for (let score of scores) {
        let pocketIndex = placeScore(numberOfPockets, score);
        pockets[pocketIndex] += 1;
    }

    const probability =  pockets.map((count) => count/scores.length);
    return (score: number) => probability[placeScore(numberOfPockets, score)];

};

const placeScore = (numberOfPockets: number, score: number ) => {
    for (let pocketIndex = 0; pocketIndex < numberOfPockets; pocketIndex++) {
        const lowerBoundary: number = pocketIndex/numberOfPockets;
        const upperBoundary: number = (pocketIndex+1)/numberOfPockets;
        if (score >= lowerBoundary && score < upperBoundary) {
            return pocketIndex;
        }
    }
    return numberOfPockets-1;
};

export const getEmptySentenceScores = () => {
    return {
        simple: [],
        compound: [],
        complex: [],
        "compound-complex": []
    };
}

const lineSpace = (start: number, end: number, numberOfPoints: number) => {
    const points: number[] = [];
    const distance: number =  (end - start)/(numberOfPoints+1);
    for(let point=0; point<numberOfPoints; point++) {
        points.push(start+point*distance)
    }
    return points;
}

export const getProbGraph = (scoreData: ScoreRow[],
                             numberOfPockets: number,
                             numberOfPoints: number,
                             keySetting: KeySetting) => {

    let sentenceScores = getSentenceScores(scoreData) as ComnpleteValues;

    // @ts-ignore
    let probFunctions = {
        simple: getScoreProbabilityFunction(numberOfPockets, sentenceScores.simple),
        compound: getScoreProbabilityFunction(numberOfPockets, sentenceScores.compound),
        complex: getScoreProbabilityFunction(numberOfPockets, sentenceScores.complex),
        "compound-complex": getScoreProbabilityFunction(numberOfPockets, sentenceScores["compound-complex"]),
    };

    const scores = lineSpace(0, 1, numberOfPoints);

    let probabilities = {
        simple: scores.map((score) => probFunctions.simple(score)),
        compound: scores.map((score) => probFunctions.compound(score)),
        complex: scores.map((score) => probFunctions.complex(score)),
        "compound-complex": scores.map((score) => probFunctions["compound-complex"](score))
    } as ComnpleteValues;

    if (keySetting !== "typology") {

        probFunctions = {
            ...probFunctions,
            active: getScoreProbabilityFunction(numberOfPockets, sentenceScores.active),
            passive: getScoreProbabilityFunction(numberOfPockets, sentenceScores.passive),
            nominalized: getScoreProbabilityFunction(numberOfPockets, sentenceScores.nominalized),
        } as Probfunction;

        probabilities = {
            ...probabilities,
            // @ts-ignore
            active: scores.map((score) => probFunctions.active(score)),
            // @ts-ignore
            passive: scores.map((score) => probFunctions.passive(score)),
            // @ts-ignore
            nominalized: scores.map((score) => probFunctions.nominalized(score)),
        } as ComnpleteValues;
    }

    // @ts-ignore
    //const probabilities = keys.map(key => scores.map((score) => probFunctions[key](score)));


    return {
        scores,
        probabilities
    }

}