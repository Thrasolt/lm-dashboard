import {REST_URL, COMPARISON_PATH} from "./parameters";


export const getComparisonRows = async (modelName: string, metric: string = "cosine") => {
    const result = await fetch(`${REST_URL}/${COMPARISON_PATH}/${modelName}/${metric}`);
    return result.json();
}