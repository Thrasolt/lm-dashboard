import React from "react";
import Plot from "react-plotly.js";

type Props = {
    valueMatrix: number[][],
    keys: string[],
    title: string
}

export const SentenceTypeHeatMap: React.FC<Props> = (props: Props) => {

    const data = [{
        //z: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
        z: props.valueMatrix,
        x: props.keys,
        y: props.keys,
        type: 'heatmap',
    }]

    const layout = {
        title: props.title
    }

    // @ts-ignore
    return <Plot data={data} layout={layout}/ > }