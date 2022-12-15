import React, {useEffect, useState} from "react";
import {ComnpleteValues, SentenceValues, VerbValues} from "../../Data/types";
import {calculateProbabilitiesHeatMap} from "../../Data/server/kl_divergence";
import {SentenceTypeHeatMap} from "../Components/SentenceTypeHeatMap";

type Props = {
    probabilities: SentenceValues | VerbValues | ComnpleteValues;
    keys: string[];
}
const KLDivergenceHeatmap = ({probabilities, keys} : Props) => {

    const [valueMatrix, setValueMatrix] = useState<number[][]>([]);

    const transformProbabilities = () => {
        const newValueMatrix = calculateProbabilitiesHeatMap(probabilities, keys);
        setValueMatrix(newValueMatrix);
    }

    useEffect(transformProbabilities, [keys, probabilities]);

    return (
        <SentenceTypeHeatMap
            valueMatrix={valueMatrix}
            keys={keys}
            title="KL Divergence"
        />
    );
}

export {KLDivergenceHeatmap};