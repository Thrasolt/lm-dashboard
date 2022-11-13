import {AGGREGATE_PATH, REST_URL, SCORE_PATH} from "./parameters";


export const getAggregateData = async () => {
    const result = await fetch(`${REST_URL}/${AGGREGATE_PATH}/`)
    return result.json();
}