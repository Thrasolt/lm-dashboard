import {ScoreRow, SentenceValues, SentenceTyp} from "./types";
import {CARDINALITIES} from "./Constants";
import {relationToCardinality} from "./cardinalities";

export const getProbabilities = (scoreData: ScoreRow[], cardinality: string,
                                 numberOfPockets: number, numberOfPoints: number) => {
    if (CARDINALITIES.includes(cardinality)) {
        return getProbGraph(
            scoreData.filter((row) => relationToCardinality(row.relation)===cardinality),
            numberOfPockets, numberOfPoints);
    }
    return getProbGraph(scoreData, numberOfPockets, numberOfPoints);
    
}

const getSentenceScores = (data: ScoreRow[]) => {
    const sentenceScores: SentenceValues = getEmptySentenceScores()
    for (let row of data) {
        sentenceScores[row.sentence as SentenceTyp].push(row.score);
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

export const getProbGraph = (scoreData: ScoreRow[], numberOfPockets: number, numberOfPoints: number) => {
    const sentenceScores = getSentenceScores(scoreData);
    const probFunctions = {
        simple: getScoreProbabilityFunction(numberOfPockets, sentenceScores.simple),
        compound: getScoreProbabilityFunction(numberOfPockets, sentenceScores.compound),
        complex: getScoreProbabilityFunction(numberOfPockets, sentenceScores.complex),
        "compound-complex": getScoreProbabilityFunction(numberOfPockets, sentenceScores["compound-complex"])
    };

    const scores = lineSpace(0, 1, numberOfPoints);
    const probabilities = {
        simple: scores.map((score) => probFunctions.simple(score)),
        compound: scores.map((score) => probFunctions.compound(score)),
        complex: scores.map((score) => probFunctions.complex(score)),
        "compound-complex": scores.map((score) => probFunctions["compound-complex"](score))
    }

    return {
        scores,
        probabilities
    }

}