import {SelectChangeEvent} from "@mui/material";
import {FilterSelection} from "./Components/FilterSelection";
import {KEYS} from "../Data/Constants";
import React from "react";

export function KeySettings(props: { onChange: (event: SelectChangeEvent) => void, value: "typology" | "verbs" | "complete" }) {
    return (<>
        <div className="Key-settings">
            <FilterSelection
            name={"Key Settings"}
            onChange={props.onChange}
            value={props.value}
            label={"Key Settings"}
            choices={Object.keys(KEYS)}
        />
        </div>
    </>);
}