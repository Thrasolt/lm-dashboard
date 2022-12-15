import React, {useState} from "react";
import Plot from "react-plotly.js";
import {ComnpleteValues, SentenceValues, VerbValues} from "../../Data/types";
import {SelectChangeEvent} from "@mui/material";
import {FilterSelection} from "../Components/FilterSelection";
import {KeySetting} from "../Container";

type Props = {
    scores: number[],
    probabilities: SentenceValues
    keys: string[];
    keySetting: KeySetting;
}

const heatMapEntry = (key: string, scores: number[], probabilities: SentenceValues) => {
    return {
        x: scores,
        // @ts-ignore
        y: probabilities[key],
        type: 'scatter',
        mode: 'lines',
        name: key
    }
}


export const ScorePlot: React.FC<Props> = (props: Props) => {

    const [xLimit, setxLimit] = useState<number>(1.0);
    const [yLimit, setyLimit] = useState<number>(1.0);

    const handlexLimit = async (event: SelectChangeEvent) => {
        setxLimit(parseFloat(event.target.value));
    };

    const handleyLimit = async (event: SelectChangeEvent) => {
        setyLimit(parseFloat(event.target.value));
    };

    return (
        <>
            <div className="filterContainer">
                <FilterSelection
                    name={"Set x-limit"}
                    onChange={handlexLimit}
                    value={xLimit.toString()}
                    label={"x-limit"}
                    choices={Array.from(Array(101).keys()).map((key) => (key/100).toString())}
                />
                <FilterSelection
                    name={"Set y-limit"}
                    onChange={handleyLimit}
                    value={yLimit.toString()}
                    label={"y-limit"}
                    choices={Array.from(Array(101).keys()).map((key) => (key/100).toString())}
                />

            </div>
            <Plot
                // @ts-ignore
                data={ props.keys.map(key => heatMapEntry(key,props.scores, props.probabilities))

                }
                layout={{
                    title: 'Correct Token Score Probabilities',
                    width: 800,
                    height: 500,
                    xaxis: {
                        range: [0, xLimit]
                    },
                    yaxis: {
                        range: [0, yLimit]
                    }}}
            />
        </>)
};

/*
*                 [
                    {
                        x: props.scores,
                        y: props.probabilities.simple,
                        type: 'scatter',
                        mode: 'lines',
                        name: "simple"
                    },
                    {
                        x: props.scores,
                        y: props.probabilities.compound,
                        type: 'scatter',
                        mode: 'lines',
                        name: "compound"
                    },
                    {
                        x: props.scores,
                        y: props.probabilities.complex,
                        type: 'scatter',
                        mode: 'lines',
                        name: "complex"
                    },
                    {
                        x: props.scores,
                        y: props.probabilities["compound-complex"],
                        type: 'scatter',
                        mode: 'lines',
                        name: "compound-complex"
                    },
                ]
* */