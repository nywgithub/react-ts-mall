import * as React from "react";
import * as ReactDOM from "react-dom";
import { getPoints, getInvite, addIntergral, getDetail } from "@/fetch/intergral";
import { getAccount } from "@/fetch/userinfo";
import MallCommon from "@/views/page/mall/components/mall-common";
import Task from "./components/task";
import Table from '@/common/components/Table';
import Dialog from '@/common/components/Dialog';
import Head from "@/common/components/Head";
import Pager from '@/common/components/Pager';
// import {PointContext} from '@/views/context/context'
export default class Intergral extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isSelect: false,
      isAngel: false,
      isLicense: false,
      unClickable: false,
      points: '',
      userPoints: '',
      leftPoints: '',
      overDate: '',
      signInStatus: '',
      appDownloadStatus: '',
      licenseStatus: '',
      invited: null,
      intergralType: '全部',
      currentUser: '',
      //积分明细弹窗
      invited_Visible: false,
      intergralDetail_Visible: false,
      //用户信息
      userList: [],

      pagerDetail: {
        pageNo: 1,
        pageTotal: null
      },
      pagerInvited: {
        pageNo: 1,
        pageTotal: null
      },
      intergralListThead: [
        {
          title: "积分记录",
          key: "pointDesc",
        },
        {
          title: "时间",
          key: "pointDate",
        },
        {
          title: "分值",
          key: "points",
        },
      ],
      intergralListTbody: [],
      invitedThead: [
        {
          title: "公司名称",
          key: "companyName",
        },
        {
          title: "注册时间",
          key: "inviteDate",
        },
        {
          title: "公司状态",
          key: "status",
        },
      ],
      invitedTbody: []
    }
  }
  //领取积分方法
  addIntergral(type) {
    const self = this
    addIntergral({
      type: type
    }).then(res => {
      if (res.code === 0) {
        switch (type) {
          case 1:
            new window.future.Bubble.create({ html: '签到成功，+5分', type: 'success' });
            break;
          case 2:
            new window.future.Bubble.create({ html: '领取成功，+50分', type: 'success' });
            break;
          case 3:
            new window.future.Bubble.create({ html: '领取成功，+100分', type: 'success' });
            break;
          default:
            new window.future.Bubble.create({ html: '请求成功', type: 'success' });
        }
        self.getIntergralData()
      }
    })
  }
  // 点击license
  licenseClick() {

    const license = this.state.licenseStatus
    switch (license) {
      case '去修改':
      case '去上传':
        //新页面打开vo修改公司信息页面
        window.open('/company.do?xcase=viewCompanyGeneralInfo')
        break;
      case '领取':
        this.addIntergral(2)
        break;
      default:
        break;
    }
  }

  // 格式化日期
  formatDate(time) {
    var date = new Date(parseInt(time));
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    return year + '年' + mon + '月' + day + '日';
  }
  onChangePageDetail(e) {
    let pager = this.state.pagerDetail;
    pager.pageNo = e
    this.setState({
      pager
    })
    this.getDetailData()
  }

  onChangePageInvited(e) {
    let pager = this.state.pagerInvited;
    pager.pageNo = e
    this.setState({
      pager
    })
    this.getInviteData()
  }

  showiDetail(show = true) {

    this.setState({
      intergralDetail_Visible: show
    })
    const changeEventUser = (opt) => {
      var userList = this.state.userList, userPoints;
      userList.forEach(e => {

        if (e.operatorNo === opt.value) {
          userPoints = e.points
        }
      })
      const pager = this.state.pagerDetail
      pager.pageNo = 1
      this.setState({
        currentUser: opt.value,
        userPoints: userPoints,
        ...pager
      })
      this.getDetailData();
    }
    const changeEventType = (opt) => {
      const pager = this.state.pagerDetail
      pager.pageNo = 1
      this.setState({
        intergralType: opt.value,
        ...pager
      })
      this.getDetailData();
    }
    this.typeSelect = Select.use(".J-select-type")[0];
    this.typeSelect.off("change");
    this.typeSelect.on("change", (opt) => {
      changeEventType(opt)
    })
    this.userSelect = Select.use(".J-select-user")[0];
    this.userSelect.off("change");
    this.userSelect.on("change", (opt) => {
      changeEventUser(opt)
    })
  }
  showiInvited(show = true) {
    this.setState({
      invited_Visible: show
    })
  }
  locationTo() {
    //跳转到询盘的收件箱列表页
    window.open('/message/index.html#inbox')
  }
  componentDidMount() {

    this.getIntergralData();
    this.getInviteData();
    this.getAccountData();
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
  getIntergralData() {
    this.getPoints()
      .then((data) => {
        var signInStatus = '立即签到',
          appDownloadStatus = '下载',
          licenseStatus = '去修改';

        const SIGN_STATUS = {
          1: '立即签到',
          2: '已签到'
        }
        const LICENSE_STATUS = {
          0: '去上传', //未上传执照
          1: '领取', //审核通过未领取积分
          2: '已领取',   //审核通过领取积分
          3: '去修改'  //执照审核未通过
        }
        const APPDOWNLOAD_STATUS = {
          0: '下载',
          1: '领取',
          2: '已领取'
        }
        signInStatus = data.signInStatus ? SIGN_STATUS[data.signInStatus] : signInStatus;
        appDownloadStatus = data.appDownloadStatus !== undefined && data.appDownloadStatus !== null ? APPDOWNLOAD_STATUS[data.appDownloadStatus] : appDownloadStatus;
        if (data.licenseStatus !== -1) {
          this.setState({
            isLicense: true
          })
          licenseStatus = data.licenseStatus !== undefined && data.licenseStatus !== null ? LICENSE_STATUS[data.licenseStatus] : licenseStatus;
        }
        this.setState({
          points: data.remainPoint,
          leftPoints: data.pendingExpiredPoint,
          overDate: data.pendingExpiredDate ? this.formatDate(data.pendingExpiredDate) : '',

          signInStatus: signInStatus,
          appDownloadStatus: appDownloadStatus,
          licenseStatus: licenseStatus,
          invited: data.inviteTotal ? data.inviteTotal : 0,

          isAngel: data.angle
        });

      })
      .catch((e) => { });
  }
  getAccountData() {
    this.getAccount()
      .then((data) => {
        var currentUser, isSelect, userPoints;
        if (!data.map(e => e.isAdmin).includes(true) && data.length !== 0) {
          isSelect = true;
          currentUser = data[0].operatorNo;
          userPoints = data[0].points
        } else {
          data.forEach(user => {
            if (user.isAdmin) {
              currentUser = user.operatorNo
              userPoints = user.points
            }
          });
        }
        this.setState({
          isSelect: isSelect,
          userList: data,
          currentUser: currentUser,
          userPoints: userPoints
        })

      })
      .catch((e) => { });

  }

  getInviteData() {
    const self = this;
    const STATUS = {
      0: '完成注册',
      1: '通过审核'
    }
    this.getInvite()
      .then((data) => {
        let pager = this.state.pagerInvited;
        pager.pageTotal = data.totalPage;
        data.pageList.map(e => {
          e.status = STATUS[e.status]
          for (let key in e) {
            if (key === 'inviteDate') {
              e[key] = self.formatDate(e[key])
            }
          }
        })
        this.setState({
          invitedTbody: data.pageList,
          ...pager
        })

      })
      .catch((e) => { });
  }

  getDetailData() {
    const self = this;
    this.getDetail()
      .then((data) => {
        let pager = this.state.pagerDetail;
        pager.pageTotal = data.totalPage;
        data.pageList.map(e => {
          for (let key in e) {
            if (key === 'pointDate') {
              e[key] = self.formatDate(e[key])
            }
          }
          if (e.status === 1) {
            e.points = '+' + e.points
          } else {
            e.points = '-' + e.points
          }
        })
        this.setState({
          intergralListTbody: data.pageList,
          ...pager
        })
      })
      .catch((e) => { });
  }
  //积分及用户详情
  async getPoints() {
    const res = await getPoints();
    if (res.content && res.code === 0) {
      return res.content;
    }
  }
  //邀请明细
  async getInvite() {
    const res = await getInvite({ pageNo: this.state.pagerInvited.pageNo, pageSize: 20 });
    if (res.content && res.code === 0) {
      return res.content;
    }
  }
  //积分明细
  async getDetail() {
    const DETAIL_TYPE = {
      '积分获取': 1,
      '积分消耗': 2,
      '全部': 3
    }
    const res = await getDetail({ pageNo: this.state.pagerDetail.pageNo, pageSize: 20, status: DETAIL_TYPE[this.state.intergralType], operatorNo: this.state.currentUser });
    if (res.content && res.code === 0) {
      return res.content;
    }
  }

  async getAccount() {
    const res = await getAccount();
    if (res.content && res.code === 0) {
      return res.content;
    }
  }

  render() {
    const spanStyle = {
      color: '#888888',
    }
    return (
      <React.Fragment>
        <Head title="我的积分" />
        <div className="intergral-detail content-wrap">
          <div className="module-title-intergral">
            <div className="module-title-points my-point">
              我的积分 {this.state.points}
            </div>
            <div className="module-title-detail" onClick={() => {
              this.showiDetail();
              this.getDetailData();
            }}>
              查看积分明细
              <i class="ob-icon icon-right"></i>
            </div>
          </div>
          {
            this.state.leftPoints !== 0 &&
            (
              <div className="module-content">
                {this.state.leftPoints}积分将于{this.state.overDate}到期
              </div>
            )
          }
          {/* <div className="module-content">
            {this.state.leftPoints}积分将于{this.state.overDate}到期
          </div> */}
        </div>
        <div className="intergral-mall content-wrap">
          <div className="module-title">
            积分商城
          </div>
          <div className="module-content">
            {/* <PointContext.Provider value={this.state.points}> */}
            <MallCommon isMoreShow getPointsData={() => { this.getPointsData() }} />
            {/* </PointContext.Provider> */}
          </div>
        </div>
        <div className="intergral-task content-wrap">
          <div className="module-title">
            积分任务
          </div>
          <div className="module-content">
            {/* <div class="ft-loading">
              <i class="ft-loading__page is-l"></i>
            </div> */}
            <table>
              <tbody>
                <Task
                  title="每日签到"
                  detail="签到成功即可奖励积分。"
                  add="+5分/天"
                  btninfo={this.state.signInStatus}
                  taskClick={() => this.addIntergral(1)}
                  unClickable={this.state.signInStatus === '已签到'}
                />
                {
                  this.state.isLicense &&
                  <Task
                    title="上传有效营业执照"
                    detail="公司信息中营业执照审核通过。"
                    add="+50分"
                    btninfo={this.state.licenseStatus}
                    taskClick={() => this.licenseClick()}
                    unClickable={this.state.licenseStatus === '已领取'}
                  />
                }
                <Task
                  title="邀请新用户"
                  tipTitle="邀请好友来注册 积分奖励换好礼"
                  tipBottom="微信扫码分享"
                  imgClass='invite-new-img'
                  invite={
                    <div className="tooltip-jl">
                      <div className="jl-top">
                        <div className="jl-line"></div>
                        <div className="jl-text">邀请奖励</div>
                        <div className="jl-line"></div>
                      </div>
                      <div className="jl-w">1.好友完成注册, +10积分/位</div>
                      <div className="jl-w">2.好友通过审核, +490积分/位</div>
                      <div className="jl-up">赶快行动吧～</div>
                    </div>
                  }
                  isToolTip
                  isShow={this.state.invited === 0 ? (false) : (true)}
                  invited={this.state.invited}
                  detail="每成功邀请1位新用户完成注册、通过审核均可获得奖励。"
                  add="最高500分/人"
                  btninfo="去邀请"
                  inviteClick={() => { this.showiInvited() }}
                />
                <Task
                  title="阅读新询盘"
                  detail="每封新询盘24H内阅读即可获得积分奖励，每日上限100分。APP端也可以完成任务。"
                  add="+10分/封"
                  btninfo="去阅读"
                  taskClick={this.locationTo}
                />
                <Task
                  title="回复新询盘"
                  detail="每封新询盘24H内回复即可获得积分奖励，每日上限300分。APP端也可以完成任务。"
                  add="+30分/封"
                  btninfo="去回复"
                  taskClick={this.locationTo}
                />
                <Task
                  title="下载供应商APP"
                  tipTitle="随时随地掌握商机"
                  tipBottom="扫码直接下载"
                  isToolTip={this.state.appDownloadStatus === '下载' ? (true) : (false)}
                  imgClass='app-download-img'
                  detail="下载并登录供应商APP即可获得积分奖励。"
                  add="+100分"
                  btninfo={this.state.appDownloadStatus}
                  taskClick={() => this.addIntergral(3)}
                  unClickable={this.state.appDownloadStatus === '已领取'}
                />
                <Task
                  title="APP报名参加线下活动"
                  tipTitle="报名路径"
                  tipBottom="扫码下载/登录"
                  tipDetail="“发现” - “线下活动”"
                  isToolTip
                  imgClass='app-download-img'
                  detail="在APP上报名参加线下活动并签到成功，即可获得积分奖励。"
                  add="+50分/次"
                  btninfo="去APP报名"
                />
                <Task
                  title="天使问吧提问"
                  tipTitle="有疑问就去提问吧"
                  tipBottom="扫码下载/登录"
                  tipDetail="“业务中心” - “天使问吧”"
                  isToolTip
                  imgClass='app-download-img'
                  detail="每有效提问1次即可获得奖励，每日上限15分。"
                  add="+5分/次"
                  btninfo="去APP提问"
                />
                {
                  this.state.isAngel &&
                  <Task
                    title="天使问吧回答"
                    tipTitle="天使用户专享"
                    tipBottom="扫码下载/登录"
                    tipDetail="“业务中心” - “天使问吧”"
                    isToolTip
                    imgClass='app-download-img'
                    detail="每有效回答1次即可获得奖励，回答被采纳获得额外奖励，每日上限25分。"
                    add="+5分/次"
                    btninfo="去APP回答"
                  />
                }

              </tbody>
            </table>
          </div>
        </div>
        <Dialog
          visible={this.state.intergralDetail_Visible}
          skin="point-dialog"
          title="积分明细"
          width={560}
          height={440}
          onOK={() => { this.showiDetail(false) }}
          onCancel={() => { this.showiDetail(false) }}
        >
          <div className="vo-block toolbar ob-form">
            <div className="form-item" style={{ marginRight: 60 }}>
              <span style={spanStyle}>帐户：</span>
              <select className="select J-select-user" value={this.state.currentUser} disabled={this.state.isSelect}>
                {
                  this.state.userList.map(name => {
                    return (
                      <option key={name.operatorNo} value={name.operatorNo}>{name.userName}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className="form-item">
              <span style={spanStyle}>类型：</span>
              <select className="select J-select-type" value={this.state.intergralType}>
                <option value="全部">全部</option>
                <option value="积分获取">积分获取</option>
                <option value="积分消耗">积分消耗</option>
              </select>
            </div>
          </div>
          <div className="current-point-table">
            <div className="current-point">当前有效积分：{this.state.userPoints}</div>
            <Table plusStyle="points" columnOpts={this.state.intergralListThead} data={this.state.intergralListTbody} />
          </div>
          {this.state.pagerDetail.pageTotal > 1 && (
            <Pager
              simple
              total={this.state.pagerDetail.pageTotal}
              current={this.state.pagerDetail.pageNo}
              onChangePage={(e) => {
                this.onChangePageDetail(e);
              }}
            />
          )}
        </Dialog>
        <Dialog
          skin="invite-dialog"
          visible={this.state.invited_Visible}
          title="邀请好友明细"
          width={560}
          height={405}
          onOK={() => { this.showiInvited(false) }}
          onCancel={() => { this.showiInvited(false) }}
        >
          <div className="invite-table">
            <div className="invite-title">邀请好友{this.state.invited}人</div>
            <Table columnOpts={this.state.invitedThead} data={this.state.invitedTbody} />
          </div>
          {this.state.pagerInvited.pageTotal > 1 && (
            <Pager
              simple
              total={this.state.pagerInvited.pageTotal}
              current={this.state.pagerInvited.pageNo}
              onChangePage={(e) => {
                this.onChangePageInvited(e);
              }}
            />
          )}
        </Dialog>
      </React.Fragment>
    );
  }
}
