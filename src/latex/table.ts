const getKeySetting = (keys: string[]) => {
    if (keys.includes("active")) {
        if (keys.includes("simple")) {
            return "Complete";
        }
        return "VerbTypology";
    }
    return "SentenceTypology";
}

const transformMaxValue = (row: Object) => {
    const numValues = Object.values(row).filter(entry => typeof(entry) === "number");
    const maxValue = Math.max(...numValues);
    return Object.values(row).map(entry => entry === maxValue ? `\\textbf{${entry}}`: entry);

}

const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const createTable = (tableLable: string, tableCaption: string, configValues: string[], keys: string[], data: Object[]) => {

    // @ts-ignore
    const rowKeys = Object.keys(data[0]);
    const numberOfKeys = rowKeys.length;

    // @ts-ignore
    const columnConfig = [...Array(numberOfKeys).keys()].map((num) => 'c').join(" ");
    const headerRow = rowKeys.map(capitalize).join(" & ");
    const dataRows = Object.values(data).map(row => transformMaxValue(row).join(" & ")).join(" \\\\ \n") + " \\\\ \n";

    return `
\\begin{table}[h!]
\\centering
    \\begin{tabular}{||${columnConfig}||} 
     \\hline
      ${headerRow}\\\\ [0.5ex] 
     \\hline\\hline
     ${dataRows}
     \\hline
    \\end{tabular}
\\caption{${getKeySetting(keys)} ${tableCaption} ${configValues.join(" ")}}
\\label{table:${getKeySetting(keys)}${tableLable}${configValues.join("")}}
\\end{table}
    `
}

const copyTable = (tableLable: string, tableCaption: string, configValues: string[], keys: string[], data: Object[]) => {
    const table = createTable(tableLable, tableCaption, configValues, keys, data);
    navigator.clipboard.writeText(table);
};

export {copyTable};