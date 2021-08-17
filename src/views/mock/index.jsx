import * as React from "react";
import * as ReactDOM from "react-dom";

import { getUser } from "@/fetch/user";

export default class Mock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        user_email: "",
        user_id: "",
        user_name: "",
      },
    };
  }
  componentDidMount() {
    this.loadData()
      .then((user) => {
        this.setState({
          user: {
            user_email: user.user_email,
            user_id: user.user_id,
            user_name: user.user_name,
          },
        });
      })
      .catch((e) => {});
  }
  async loadData() {
    const user = await getUser({ user_id: "xxx" });
    return user;
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <h3>Mock数据</h3>
        <ul>
          <li>姓名： {user.user_name}</li>
          <li>邮箱： {user.user_email}</li>
          <li>帐户： {user.user_id}</li>
        </ul>
      </div>
    );
  }
}
