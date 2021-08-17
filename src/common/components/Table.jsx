import * as React from "react";
import NoData from '@/common/components/NoData'

export default function Table(props) {
    const { data, columnOpts, plusStyle } = props;
    return (
        <div className="some-table">
            <table className="ft-table is-normal">
                <thead className="table-header">
                    <tr>
                        {
                            columnOpts.map((opt, colIndex) => (
                                <th key={`col-${colIndex}`}>{opt.title}</th>
                            ))
                        }
                    </tr>

                </thead>
                <tbody className="table-body">
                    {
                        data.length !== 0 ?
                            data.map((entry, rowIndex) => (
                                <tr key={`row-${rowIndex}`}>
                                    {
                                        columnOpts.map((opt, colIndex) => {
                                            
                                            if (plusStyle && opt.key === plusStyle && entry[opt.key].indexOf('+')!==-1) {
                                                return (
                                                    <td key={`col-${colIndex}`} style={{ color: '#FF9500' }}>{entry[opt.key]}</td>
                                                )
                                            } else {
                                                return (<td key={`col-${colIndex}`}>{entry[opt.key]}</td>)
                                            }

                                        })
                                    }
                                </tr>
                            )) :
                            (
                                <tr>
                                    <td className="no-data-td">
                                        <NoData info="暂无积分记录" />
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    );
}