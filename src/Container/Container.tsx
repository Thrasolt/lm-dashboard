import React, {useEffect, useState} from "react";
import "./Container.css"
import {ModelComparison} from "./ModelComparison/ModelComparison";
import {MetricComparison} from "./MetricComparison/MetricComparison";
import {RelationComparison} from "./RelationComparison/RelationComparison";
import {ScoreComparison} from "./ScoreComparison/ScoreComparison";
import {FeatureComparison} from "./FeatureComparison/FeatureComparison";
import {CARDINALITIES, KEYS, NO_FILTER_NAME} from "../Data/Constants";
import {FilterSelection} from "./Components/FilterSelection";
import {SelectChangeEvent} from "@mui/material";
import {MetricType} from "../Data/types";
import {KeySettings} from "./KeySettings";


type KeySetting = "typology" | "verbs" | "complete";




export const Container = () => {

    const [keySettings, setKeySetting] = useState<KeySetting>("typology");
    const [keys, setKeys] = useState<string[]>(KEYS.typology);

    const handleKeySettingChange = (event: SelectChangeEvent) => {
        setKeySetting(event.target.value as KeySetting);
    };

    useEffect(() => {setKeys(KEYS[keySettings])}, [keySettings]);


    return (
        <>
            <h1>Language Model Dashboard</h1>
            <h3>Analysis of Syntax Structure’s Impact on Fact Retrieval from Pre-trained Language Models</h3>
            <KeySettings onChange={handleKeySettingChange} value={keySettings}/>
            <div className="container">
                <div className="row">
                    <div className="column">
                        <ModelComparison keys={keys}/>
                    </div>
                    <div className="column">
                        <MetricComparison keys={keys}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <RelationComparison/>
                    </div>
                    <div className="column">
                        <ScoreComparison/>
                        <FeatureComparison/>
                    </div>
                </div>
            </div>
        </>)
}