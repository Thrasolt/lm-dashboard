import React, {useState} from "react";
import {FilterSelection} from "../Components/FilterSelection";
import {boradFilterNameType, DataSourceType, Model} from "../../Data/types";
import {DATA_SOURCE_CHOICES, MODELS, NO_FILTER_NAME} from "../../Data/Constants";
import {SelectChangeEvent} from "@mui/material";
import DataTable from "react-data-table-component";
import {getMetricComparisonData} from "../../Data/handleAggregateData";
import {MetricComparisonColumns} from "./MetricComparisonColumns";

export const MetricComparison: React.FC = () => {

    const [model, setModel] = useState<Model>("bert-base-cased");
    const [dataSource, setDataSource] = useState<DataSourceType>("complete");
    const [filterName, setFilterName] = useState<boradFilterNameType>(null);

    const handleFilterNameChange = (event: SelectChangeEvent) => {
        const newFilterName = (event.target.value === NO_FILTER_NAME ? null : event.target.value) as boradFilterNameType
        setFilterName(newFilterName);
    };

    const handleModelChange = (event: SelectChangeEvent) => {
        setModel(event.target.value as Model)
    };

    const handleDataSourceChange = (event: SelectChangeEvent) => {
        setDataSource(event.target.value as DataSourceType);
    };

    return (<>
        <h2>Metric Comparison</h2>
        <div className="filterContainer">
            <FilterSelection
                name={"Model"}
                onChange={handleModelChange}
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
                name={filterName}
                onChange={handleFilterNameChange}
                value={filterName}
                label={"cardinality"}
                choices={[NO_FILTER_NAME, "1:1", "N:1", "N:M"]}
            />
        </div>
        <DataTable
            columns={MetricComparisonColumns}
            data={getMetricComparisonData(filterName, model, dataSource)}
        />
    </>)
}