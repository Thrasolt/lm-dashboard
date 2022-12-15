import React, {useEffect, useState} from "react";
import {boradFilterNameType, Model, ScoreRow, SentenceValues} from "../../Data/types";
import {SelectChangeEvent} from "@mui/material";
import {CARDINALITIES, MODELS, NO_FILTER_NAME} from "../../Data/Constants";
import {FilterSelection} from "../Components/FilterSelection";
import {getEmptySentenceScores, getProbabilities} from "../../Data/handleData";
import {getScoreRows} from "../../Data/server/retrieveScores";
import {ScorePlot} from "./ScorePlot";
import {KeySetting} from "../Container";
import {KLDivergenceHeatmap} from "./KLDivergenceHeatmap";

const NUMBER_OF_POINTS = 1000;

type Props = {
    keys: string[]
    keySetting: KeySetting;
}

export const ScoreComparison: React.FC<Props> = ({keys, keySetting}: Props) => {

    const [model, setModel] = useState<Model>("bert-base-cased");
    const [filterName, setFilterName] = useState<boradFilterNameType>(null);
    const [numberOfPockets, setnumberOfPockets] = useState<number>(60);
    const [scoreRows, setScoreRows] = useState<ScoreRow[]>([])
    const [scores, setScores] =  useState<number[]>([])
    const [probabilities, setProbabilities] =  useState<SentenceValues>(getEmptySentenceScores())

    const handleScoreRows =  async () => {
        const scoreList = await getScoreRows(model);
        setScoreRows(scoreList["scores"]);
    }

    const handleProbabilities = () => {
            const result = getProbabilities(scoreRows, filterName as string, numberOfPockets, NUMBER_OF_POINTS, keySetting);
            setScores(result.scores);
            setProbabilities(result.probabilities);

    }

    const handleModelChange = async (event: SelectChangeEvent) => {
        const newModel = event.target.value as Model
        setModel(newModel);
    };

    const handleNumberOfPocketsChange = async (event: SelectChangeEvent) => {
        setnumberOfPockets(parseFloat(event.target.value));
        await handleScoreRows();
    };

    const handleFilterNameChange = async (event: SelectChangeEvent) => {
        const newFilterName = (event.target.value === NO_FILTER_NAME ? null : event.target.value) as boradFilterNameType
        setFilterName(newFilterName);
        await handleScoreRows();
    };

    useEffect(() => {
        getScoreRows(model)
            .then(data => data["scores"])
            .then((scores) => {
            setScoreRows(scores);
        });
    }, []);

    useEffect(() => {handleProbabilities()}, [scoreRows])
    useEffect(() => {handleScoreRows().then(rows => console.log("new rows fetched"))}, [model])


    return (
        <>
            <h2>Score Comparison</h2>
            <div className="filterContainer">
                <FilterSelection
                    name={"Model"}
                    onChange={handleModelChange}
                    value={model}
                    label={"Model Choice"}
                    choices={MODELS}
                />
                <FilterSelection
                    name={filterName}
                    onChange={handleFilterNameChange}
                    value={filterName}
                    label={"cardinality"}
                    choices={[NO_FILTER_NAME, ...CARDINALITIES]}
                />
                <FilterSelection
                        name={"Number of Pockets"}
                        onChange={handleNumberOfPocketsChange}
                        value={numberOfPockets.toString()}
                        label={"number of pckets"}
                        choices={Array.from(Array(90).keys()).map((key) => (key+10).toString())}
                />
            </div>
            <div>
                <ScorePlot
                    scores={scores}
                    probabilities={probabilities}
                    keys={keys}
                    keySetting={keySetting}
                />
                <KLDivergenceHeatmap
                    probabilities={probabilities}
                    keys={keys}
                />
            </div>
        </>
    );
}