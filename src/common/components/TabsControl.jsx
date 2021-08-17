import * as React from "react";
import * as ReactDOM from "react-dom";

export default class TabsControl extends React.Component {

    constructor() {
        super();
        this.state = {
            currentIndex: 0
        };
    }

    check_tittle_index(index) {
        return index === this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
    }

    render() {
        return (
            <>
                {/*动态生成Tab导航*/}
                <div className="Tab_tittle_wrap">
                    {
                        this.props.tabList.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { this.setState({ currentIndex: index }); this.props.tabClick(item) }} className={this.check_tittle_index(index)}>{item}</div>
                            );
                        })
                    }
                </div>
                {/* Tab内容区域
                <div className="Tab_item_wrap">
                    
                </div> */}
            </>
        );
    }
}

