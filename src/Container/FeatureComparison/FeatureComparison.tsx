import React, {useEffect, useState} from "react";
import {Model, SentenceComparisons} from "../../Data/types";
import {getComparisonRows} from "../../Data/server/retrieveComparisons";
import {calculateComparisonHeatMap} from "../../Data/server/kl_divergence";
import {SentenceTypeHeatMap} from "../Components/SentenceTypeHeatMap";

type Props = {
    keys: string[]
}

export const FeatureComparison: React.FC<Props> = ({keys}: Props) => {

    const [model, setModel] = useState<Model>("bert-base-cased");
    const [similarities, setSimilarities] =  useState<SentenceComparisons[]>([]);
    const [heatMap, setHeatMap] = useState<number[][]>([[]]);

    useEffect(() => {
        getComparisonRows(model, keys, "cosine")
            .then(data => data["data"])
            .then((values) => {
                setSimilarities(values);
            });
    }, [keys]);

    useEffect(() => {
        setHeatMap(calculateComparisonHeatMap(similarities, keys))
    }, [similarities])


    return (
        <div>
            <SentenceTypeHeatMap
                valueMatrix={heatMap}
                keys={keys}
                title="Cosine Similarity"
            />
        </div>);

}