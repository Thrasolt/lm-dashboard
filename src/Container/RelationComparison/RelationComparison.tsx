import React, {useState} from "react";
import {DataSourceType, MetricType, Model} from "../../Data/types";
import DataTable from "react-data-table-component";
import {getRelationComparisonData} from "../../Data/handleAggregateData";
import {RelationComparisonColumns} from "./RelationComparisonColumns";
import {FilterSelection} from "../Components/FilterSelection";
import {DATA_SOURCE_CHOICES, METRIC_CHOICES, MODELS} from "../../Data/Constants";
import {SelectChangeEvent} from "@mui/material";


export const RelationComparison: React.FC = () => {

    const [model, setModel] = useState<Model>("bert-base-cased");
    const [dataSource, setDataSource] = useState<DataSourceType>("complete");
    const [metric, setMetric] = useState<MetricType>("k@1 accuracy");


    const handleDataSourceChange = (event: SelectChangeEvent) => {
        setDataSource(event.target.value as DataSourceType);
    };

    const handleMetricChange = (event: SelectChangeEvent) => {
        setMetric(event.target.value as MetricType);
    };

    const handleModelChane = (event: SelectChangeEvent) => {
        setModel(event.target.value as Model)
    };

    return (<>
        <h2>Relation Comparison</h2>
        <div className="filterContainer">
            <FilterSelection
                name={"Model"}
                onChange={handleModelChane}
                value={model}
                label={"Model Choice"}
                choices={MODELS}
            />
            <FilterSelection
                name={"Data Source"}
                onChange={handleDataSourceChange}
                value={dataSource}
                label={"data source"}
                choices={DATA_SOURCE_CHOICES}
            />
            <FilterSelection
                name={"Metric"}
                onChange={handleMetricChange}
                value={metric}
                label={"metric"}
                choices={METRIC_CHOICES}
            />
        </div>
        <DataTable
            columns={RelationComparisonColumns}
            data={getRelationComparisonData(model, dataSource, metric)}
        />

    </>)
};