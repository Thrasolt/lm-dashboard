import {REST_URL, SCORE_PATH} from "./parameters";


export const getScoreRows = async (modelName: string) => {
    const result = await fetch(`${REST_URL}/${SCORE_PATH}/${modelName}`)
    return result.json();
}