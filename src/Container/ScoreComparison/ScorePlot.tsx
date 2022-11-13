import React, {useState} from "react";
import Plot from "react-plotly.js";
import {SentenceValues} from "../../Data/types";
import {SelectChangeEvent} from "@mui/material";
import {FilterSelection} from "../Components/FilterSelection";

type Props = {
    scores: number[],
    probabilities: SentenceValues
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
                data={
                [
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