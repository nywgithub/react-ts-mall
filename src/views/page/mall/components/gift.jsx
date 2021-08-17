import * as React from "react";

export default class Gift extends React.Component {
    constructor(props) {
        super()
    }

    render() {
        // const imgUrl = require(this.props.imgUrl)
        return (
            <div className="gift-item" onClick={this.props.handleClick}>
                
                <div className="gift-img-area">
                    <div className="gift-mask"></div>
                    <img src={this.props.imgUrl} />
                </div>
                <div className="gift-info">
                    <div className="gift-title">{this.props.name}</div>
                    <div className="gift-points">
                        <div className="gift-need-points">{this.props.points}分</div>
                        <div className="gift-left-points">剩余{this.props.leftNum}</div>
                    </div>
                </div>
            </div>
        )
    }
}