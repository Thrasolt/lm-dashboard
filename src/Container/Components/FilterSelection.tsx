import {boradFilterNameType} from "../../Data/types";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";

type Props = {
    onChange: (event: SelectChangeEvent) => void;
    choices: string[];
    name: string | null;
    value: string | null;
    label: string;
}

export function FilterSelection(props: Props) {
    const name: string = `handle-${props.name}-change>`
    const label: string = `${name}-label>`

    return <FormControl fullWidth className="filterButton">
        <InputLabel id={label} >{props.label}</InputLabel>
        <Select
            labelId={label}
            id={name}
            value={props.value as string}
            label="Apply Filter"
            onChange={props.onChange}
        >
            {props.choices.map((choice, index) => <MenuItem key={`${choice}-${index}`} value={choice}>{choice}</MenuItem>)}
        </Select>
    </FormControl>;
}