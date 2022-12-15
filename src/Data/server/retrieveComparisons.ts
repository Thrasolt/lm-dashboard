import {REST_URL, COMPARISON_PATH} from "./parameters";


export const getComparisonRows = async (modelName: string, keys: string[], metric: string) => {

    const nominalized: boolean = keys.includes("active");

    const data = {
        model_name: modelName,
        metric: metric,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const result = await fetch(
        `${REST_URL}/${COMPARISON_PATH}`, options);
    return result.json();
}