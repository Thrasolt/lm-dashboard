import {AggregateData} from "./Results";
import {
    AggregateDataRow,
    AggregateRow,
    DataSourceType,
    MetricSentenceTypeRow,
    MetricType,
    Model,
    ModelSentenceTypeRow, RelationSentenceTypeRow,
    SentenceTyp
} from "./types";

const filterData = (data: AggregateDataRow[], filterFunction: (row: AggregateDataRow) => boolean) => {
    const filtred = data.filter(filterFunction)
    const mapped =  filtred
        .map(row => {
            const newRow = { ...row,
            data: row.data as DataSourceType,
            sentence: row.sentence as SentenceTyp
        };
            return newRow});
    return mapped;
}

export const getModelComparisonData = (
    filterName: string | null,
    dataSource: DataSourceType,
    metric: MetricType,
    keys: string[],
    data: AggregateRow[]) => {

    const filterFunction = (row: AggregateDataRow) => {
        return row.filterName === filterName && row.data === dataSource &&
        row.measure === metric && keys.includes(row.sentence)}

    const relevantData: AggregateRow[] = filterData(data, filterFunction);
    const resultMap = new Map<string, ModelSentenceTypeRow>();

    for(let row of relevantData){
        const entry = resultMap.get(row.model) || {model: row.model} as ModelSentenceTypeRow;
        entry[row.sentence] = Number(row.value.toFixed(3));
        resultMap.set(row.model, entry);
    }

    return Array.from(resultMap.values());
}

export const getMetricComparisonData = (
    filterName: string | null,
    model: Model,
    dataSource: DataSourceType,
    keys: string[],
    data: AggregateRow[]) => {

    const filterFunction = (row: AggregateDataRow) => {
        return row.model === model && row.data === dataSource
            && row.filterName === filterName && keys.includes(row.sentence)}

    const relevantData: AggregateRow[] =  filterData(data,filterFunction);
    const resultMap = new Map<MetricType, MetricSentenceTypeRow>();

    for(let row of relevantData){
        const entry = resultMap.get(row.measure as MetricType) || {metric: row.measure} as MetricSentenceTypeRow;
        entry[row.sentence] = Number(row.value.toFixed(3));
        resultMap.set(row.measure as MetricType, entry);
    }

    return Array.from(resultMap.values());

}

export const getRelationComparisonData = (
    model: Model,
    dataSource: DataSourceType,
    metric: MetricType) => {

    const relevantData: AggregateRow[] =  filterData(
        AggregateData,
        row => row.model === model && row.data === dataSource
            && row.filterName !== null &&
            row.filterName.startsWith("P") && row.measure === metric);

    const resultMap = new Map<String, RelationSentenceTypeRow>();

    for(let row of relevantData){
        const relation: string = row.filterName as string;
        const entry = resultMap.get(relation) || {relation: relation} as unknown as RelationSentenceTypeRow;

        // @ts-ignore
        entry[row.sentence] = Number(row.value.toFixed(3));

        resultMap.set(row.filterName as String, entry);
    }

    return Array.from(resultMap.values());
}