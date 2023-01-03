import React from "react";
import {copyTable} from "../../latex/table";


type Props = {
    tableCaption: string;
    tableLable: string;
    configValues: string[];
    keys: string[],
    data: Object[];

}
const LatexButton = ({tableLable, tableCaption, configValues, keys, data}: Props) => {

    const hanleClick = () => {
        copyTable(tableLable, tableCaption, configValues, keys, data);
    }

    return (
        <button
            onClick={hanleClick}
        >
            <img src="https://blog.hrz.tu-chemnitz.de/urzcommunity/wp-content/uploads/sites/2/2014/05/latex.png"/>
        </button>
    );
}

export {LatexButton};