import * as React from "react";
import * as ReactDOM from "react-dom";
import { getPoints } from "@/fetch/intergral";
import MallCommon from "./components/mall-common"
import Head from "@/common/components/Head"
// import {PointContext} from '@/views/context/context'
export default class Mall extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogin: false,
      points: '',
    }
  }
  componentDidMount() {
    let isLogin = false;
    if ($('.J-isLogin').val() === 'false') {
      isLogin = false;
    } else if ($('.J-isLogin').val() === 'true') {
      isLogin = true;
    }
    this.setState({
      isLogin: isLogin
    })
    this.getPointsData()
  }
  getPointsData() {
    this.getPoints()
      .then((data) => {
        this.setState({
          points: data.remainPoint
        })
      }).catch(e => {

      })
  }
  //积分及用户详情
  async getPoints() {
    const res = await getPoints();
    if (res.content && res.code === 0) {
      return res.content;
    }
  }
  locto() {
    window.open('/supplier/point/mine.html')
  }
  render() {
    return (
      <div className="mall-body">
        <Head title="积分商城" />
        <div className="mall-top">

          <div className="welcome-img"></div>
          
            {
              this.state.isLogin ?
                (
                  <div className="is-login-state content-wrap">
                    <div className="state-info-detail">我的积分 <span className="state-info-number my-point">{this.state.points}</span></div>
                    <a className="state-href" href="/supplier/point/mine.html" target="_blank">做任务,赚积分
                      <i className="ob-icon icon-right"></i>
                    </a>
                  </div>
                ) :
                (
                  <div className="login-state content-wrap">
                    <div className="state-info">我的积分</div>
                    <a className="state-login" href={
                      `https://login.made-in-china.com/sign-in/?jumpNext=1&baseNextPage=${encodeURIComponent(
                        window.location.href
                      )}`
                    } target="_blank">登录查看</a>
                    <a className="state-sign" href={`https://login.made-in-china.com/join/?accountType=supplier&sourceType=1&baseNextPage=${encodeURIComponent(window.location.href)}`} target="_blank">立即注册</a>
                  </div>
                )
            }
          
        </div>
        <MallCommon getPointsData={() => { this.getPointsData() }}/>
        <div className="mall-banner" onClick={() => { this.locto() }}>
        </div>
      </div >
    );
  }
}
