import React, {useEffect, useState} from "react";
import {Model, SentenceComparisons} from "../../Data/types";
import {getComparisonRows} from "../../Data/server/retrieveComparisons";
import {calculateComparisonHeatMap} from "../../Data/server/kl_divergence";
import {SentenceTypeHeatMap} from "../Components/SentenceTypeHeatMap";


export const FeatureComparison: React.FC = () => {

    const [model, setModel] = useState<Model>("bert-base-cased");
    const [similarities, setSimilarities] =  useState<SentenceComparisons[]>([]);

    const handleComparisonRows =  async () => {
        const comparisonValues = await getComparisonRows(model);
        setSimilarities(comparisonValues["data"]);
    }

    useEffect(() => {
        getComparisonRows(model)
            .then(data => data["data"])
            .then((values) => {
                setSimilarities(values);
            });
    }, []);

    console.log();
    return (
        <div>
            <SentenceTypeHeatMap valueMatrix={calculateComparisonHeatMap(similarities)} />
        </div>);

}