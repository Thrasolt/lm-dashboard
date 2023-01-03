import DataTable from 'react-data-table-component';
import {AggregateRow, boradFilterNameType, DataSourceType, MetricType, ModelSentenceTypeRow} from "../../Data/types";
import {getModelComparisonData} from "../../Data/handleAggregateData";
import {SelectChangeEvent} from "@mui/material";
import React, {useEffect, useState} from "react";

import "./ModelComparison.css"
import {FilterSelection} from "../Components/FilterSelection";
import {ModelComparisonColumns} from "./ModelComparisonColumns";
import {CARDINALITIES, DATA_SOURCE_CHOICES, METRIC_CHOICES, NO_FILTER_NAME} from "../../Data/Constants";
import {getAggregateData} from "../../Data/server/retriveAggregateData";
import {LatexButton} from "../Components/LatexButton";

type Props = {
    keys: string[]
}

export const ModelComparison: React.FC<Props> = ({keys}: Props) => {

    const [filterName, setFilterName] = useState<boradFilterNameType>(null);
    const [dataSource, setDataSource] = useState<DataSourceType>("complete");
    const [metric, setMetric] = useState<MetricType>("k@1 accuracy");

    const [data, setData] = useState<ModelSentenceTypeRow[]>([])

    const handleFilterNameChange = (event: SelectChangeEvent) => {
        const newFilterName = (event.target.value === NO_FILTER_NAME ? null : event.target.value) as boradFilterNameType
        setFilterName(newFilterName);
    };

    const handleDataSourceChange = (event: SelectChangeEvent) => {
        setDataSource(event.target.value as DataSourceType);
    };

    const handleMetricChange = (event: SelectChangeEvent) => {
        setMetric(event.target.value as MetricType);
    };


    useEffect(() => {
        getAggregateData()
            .then(data => data["data"])
            .then((data) => {
                const newData = getModelComparisonData(filterName, dataSource, metric, keys, data as AggregateRow[])
                setData(newData);
            });

    }, [filterName, dataSource, metric, keys])


    // @ts-ignore
    // @ts-ignore
    return (<>
            <h2>Model Comparison</h2>
            <div className="filterContainer">
                <FilterSelection
                    name={filterName}
                    onChange={handleFilterNameChange}
                    value={filterName}
                    label={"cardinality"}
                    choices={[NO_FILTER_NAME, ...CARDINALITIES]}
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
                columns={ModelComparisonColumns.filter(
                    element => keys.includes(element.name as string) || element.name === "Model")}
                data={data}
            />
            <LatexButton
                tableCaption={"Model Comparison"}
                data={data as Object[]}
                tableLable={"ModelComparison"}
                //@ts-ignore
                configValues={[filterName, dataSource, metric].filter(val => val !== null)}
                keys={keys}
            />
        </>
    );
}
