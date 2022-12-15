import React, {useEffect, useState} from "react";
import "./Container.css"
import {ModelComparison} from "./ModelComparison/ModelComparison";
import {MetricComparison} from "./MetricComparison/MetricComparison";
import {RelationComparison} from "./RelationComparison/RelationComparison";
import {ScoreComparison} from "./ScoreComparison/ScoreComparison";
import {FeatureComparison} from "./FeatureComparison/FeatureComparison";
import {KEYS} from "../Data/Constants";
import {SelectChangeEvent} from "@mui/material";
import {KeySettings} from "./KeySettings";


export type KeySetting = "typology" | "verbs" | "complete";

const Container = () => {

    const [keySetting, setKeySetting] = useState<KeySetting>("typology");
    const [keys, setKeys] = useState<string[]>(KEYS.typology);

    const handleKeySettingChange = (event: SelectChangeEvent) => {
        setKeySetting(event.target.value as KeySetting);
    };

    useEffect(() => {setKeys(KEYS[keySetting])}, [keySetting]);


    return (
        <>
            <h1>Language Model Dashboard</h1>
            <h3>Analysis of Syntax Structure’s Impact on Fact Retrieval from Pre-trained Language Models</h3>
            <KeySettings onChange={handleKeySettingChange} value={keySetting}/>
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
                        <RelationComparison keys={keys}/>
                    </div>
                    <div className="column">
                        <ScoreComparison keys={keys} keySetting={keySetting}/>
                        <FeatureComparison keys={keys}/>
                    </div>
                </div>
            </div>
        </>)
}

export {Container};