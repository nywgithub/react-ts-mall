import * as React from "react";
import { formatTime } from "@/common/util";

export default class CountDown extends React.Component {
  timer = null;
  static defaultProps = {
    count: 100,
    format:formatTime,
    onTimeEnd: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  count() {
    this.timer && clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { current } = this.state;
      const { onTimeEnd } = this.props;
      if (current >= 1) {
        this.setState({
          current: current - 1,
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          current: 0,
        });
        onTimeEnd();
      }
    }, 1000);
  }
  componentDidMount() {
    const { count } = this.props;
    this.setState({
      current: count,
    });
    this.count();
  }
  componentWillReceiveProps(nextProps) {
    const { count } = nextProps;
    this.setState({
      current: count,
    });
    this.count();
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  render() {
    const { current } = this.state;
    const { format } = this.props;
    const str = format(current);
    return <span>{str}</span>;
  }
}
