import * as React from "react";
import NewToolTip from "./NewTooltip"

export default class Task extends React.Component {
    static defaultProps = {
        isShow: false,
        isToolTip: false
    }
    constructor(props) {
        super();

    }

    render() {
        return (
            <>
                <tr className="task-item">
                    <td style={{ width: 800 }}>
                        <div className="task-title">
                            {this.props.title}
                            {
                                this.props.isShow ?
                                    (<span onClick={this.props.inviteClick} className="task-invited">已邀请{this.props.invited}人</span>) : null
                            }
                        </div>
                        <div className="task-detail">{this.props.detail}</div>
                    </td>
                    <td style={{ width: 265 }}>{this.props.add}</td>
                    <td style={{ width: 265 }}>
                        {
                            this.props.isToolTip ?
                                (
                                    <NewToolTip
                                        btn={
                                            <div className="task-button" >
                                                {this.props.btninfo}
                                            </div>
                                        }
                                        invite={this.props.invite}
                                        tipTitle={this.props.tipTitle}
                                        tipDetail={this.props.tipDetail}
                                        tipBottom={this.props.tipBottom}
                                        imgClass={this.props.imgClass}
                                    />

                                    // </NewToolTip>
                                ) :
                                (
                                    <div className={`task-button ${this.props.unClickable ? 'task-button-disabled' : ''}`} onClick={this.props.taskClick}>
                                        {this.props.btninfo}
                                    </div>
                                )
                        }

                    </td>
                </tr>
            </>
        )
    }
}