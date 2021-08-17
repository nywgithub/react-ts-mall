import * as React from "react";
import ToolTip from '@/common/components/ToolTip'

export default class NewToolTip extends React.Component {
    constructor(props) {
        super()
    }
    render() {
        return (
            <React.Fragment>
                <ToolTip content={
                    //二维码
                    <div className="tooltip-content">
                        <div className="tooltip-title">
                            {this.props.tipTitle}
                        </div>
                        <div className="tooltip-title-detail">
                            {this.props.tipDetail}
                        </div>
                        <div className="td-code">
                            <div className={this.props.imgClass}></div>
                        </div>
                        <div className="tooltip-bottom">
                            {this.props.tipBottom}
                        </div>
                        {this.props.invite}
                    </div>
                }
                    offsetLeft={10}
                    wrapClassName="filter-tip"
                    trigger="click">
                    {this.props.btn}
                </ToolTip>
            </React.Fragment>
        )
    }
}