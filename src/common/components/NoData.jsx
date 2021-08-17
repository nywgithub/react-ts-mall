import * as React from "react";

export default function NoData(props) {
    return (
        <div className="no-data">
            <div className="no-data-img" />
            {props.info}
        </div>
    )
}