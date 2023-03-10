import {TableColumn} from "react-data-table-component";
import {RelationSentenceTypeRow} from "../../Data/types";

export const RelationComparisonColumns: TableColumn<RelationSentenceTypeRow>[] = [
    {
        name: 'relation',
        selector: row => row.relation,
        sortable: true,
    },
    {
        name: 'simple',
        selector: row => row.simple,
        sortable: true,
    },
    {
        name: 'compound',
        selector: row => row.compound,
        sortable: true,
    },
    {
        name: 'complex',
        selector: row => row.complex,
        sortable: true,
    },
    {
        name: 'compound-complex',
        selector: row => row["compound-complex"],
        sortable: true,
    },
    {
        name: 'active',
        selector: row => row["active"],
        sortable: true,
    },

    {
        name: 'passive',
        selector: row => row["passive"],
        sortable: true,
    },

    {
        name: 'nominalized',
        selector: row => row["nominalized"],
        sortable: true,
    },
];