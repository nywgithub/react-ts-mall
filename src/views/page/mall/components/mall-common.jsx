import * as React from "react";
import TabsControl from '@/common/components/TabsControl';
import Gift from './gift';
import Pager from '@/common/components/Pager';
import NoData from '@/common/components/NoData';
import Dialog from '@/common/components/Dialog';
import Form from '@/views/form/index';
import { getPoints } from "@/fetch/intergral";
import { getInfo, getTop, getAddress, Exchange } from "@/fetch/gift";
import { getUser } from "@/fetch/userinfo";
// import { PointContext } from '@/views/context/context'
export default class MallCommon extends React.Component {
    static defaultProps = {
        isMoreShow: false
    }
    // static contextType = PointContext;
    constructor(props) {
        super();
        this.state = {
            isOss: false,
            isLogin: false,
            unClickable: false,
            email: '',
            isApproved: false,
            form_giftId: null,
            tabList: ['全部', '服务卡券', '实物'],
            giftDetail_Visible: false,
            formData_Visible: false,
            isClickable: true,
            currentTab: '',
            dialog_info: {
                leftNum: "",
                points: "",
                name: "",
                type: '',
                imgUrl: '',
                prodDesc: '',
                exchange: '',
            },
            giftList: [],
            pager: {
                pageNo: 1,
                pageTotal: null
            },
            total: null,
            formData: {
                contactor: "",
                phone: "",
                address: ""
            },
        }
        this.formRef = React.createRef();
        this.newsDialog = React.createRef();
    }
    tabClick(val) {
        const TYPE = {
            '全部': '',
            '服务卡券': 1,
            '实物': 2
        }
        this.setState({
            currentTab: TYPE[val]
        })
        this.getInfoData({ pageNo: 1, type: TYPE[val] });
    }
    exchangeClick() {

        if (this.state.isLogin) {
            if (!this.state.isApproved) {
                new window.future.Dialog.GetInfoDialog({
                    padding: '30px 30px 30px 30px',
                    quickClose: true,
                    content: '公司信息审核通过后才可以兑换。',
                    okValue: '立即修改',
                    cancelValue: '取消',
                    ok: function () {
                        window.open('/company.do?xcase=viewCompanyGeneralInfo')
                    },
                    cancel: function () { }
                });
            } else {
                this.formClick();
                const bindTextarea = () => {

                    $('#J-textarea').on('input', function () {
                        let val = $(this).val()
                        let num = val.length;
                        $('.J-text-num').text(num)
                        if (val.length > 200) {
                            $('.J-text-num').addClass('error')
                        } else {
                            $('.J-text-num').removeClass('error')
                        }

                    })
                }
                bindTextarea()
                getAddress()
                    .then((data) => {

                        if (data.code === 0 && data.content) {
                            if ($('#J-textarea').length && $('#J-textarea').length > 0) {
                                $('#J-textarea').val(data.content.address);
                                $('.J-text-num').text($('#J-textarea').val().length)
                            }
                            this.setState({
                                formData: {
                                    contactor: data.content.receiverName,
                                    phone: data.content.phoneNumber,
                                    address: data.content.address
                                }
                            })
                            this.clearForm()
                        }
                    })
                    .catch((e) => { });

            }

        } else {
            window.location.href = `https://login.made-in-china.com/sign-in/?jumpNext=1&baseNextPage=${encodeURIComponent(window.location.href)}`
        }

    }
    setDialogData(item) {
        const TYPE = {
            "1": '服务卡券',
            "2": '实物',
        }
        const self = this
        let exchange = '立即兑换', isLogin = false;
        if ($('.J-isLogin').val() === 'false') {
            exchange = '立即兑换';
            isLogin = false;
        } else if ($('.J-isLogin').val() === 'true') {
            isLogin = true;
        }
        var test = item.prodDesc;
        if (test) {
            while (test.indexOf("\r\n") >= 0) {
                test = test.replace("\r\n", " <br> ");
            }
        }
        self.setState({
            dialog_info: {
                leftNum: item.leftNum,
                points: item.points,
                name: item.name,
                type: TYPE[item.type],
                imgUrl: item.imgUrl,
                prodDesc: test,
                exchange: exchange
            },
            form_giftId: item.giftId,
            isLogin: isLogin
        })
        self.getPoints()
            .then((data) => {
                let unClickable = self.state.unClickable
                let points = data.remainPoint

                if (item.leftNum > 0) {
                    if (points >= item.points && item.max !== 0) {
                        exchange = '立即兑换';
                        unClickable = false
                    }
                    if (points < item.points && item.max !== 0) {
                        exchange = '积分不足'
                        unClickable = true
                    }
                    if (item.max == 0) {
                        exchange = '已兑换'
                        unClickable = true
                    }
                } else if (item.leftNum === 0) {
                    exchange = '已兑完'
                    unClickable = true
                }
                if (self.state.isOss) {
                    unClickable = true
                }
                let dialog_info = self.state.dialog_info
                dialog_info.exchange = exchange

                self.setState({
                    ...dialog_info,
                    unClickable
                })
            })
            .catch((e) => { });
    }
    detailClick(show = true) {
        this.setState({
            giftDetail_Visible: show
        })
    }
    formClick(show = true) {
        this.setState({
            formData_Visible: show
        })
    }
    clearForm() {
        this.formRef.current.setFieldsValue({ ...this.state.formData })
    }
    formSubmit() {
        const self = this
        this.formRef.current.validateFields({ force: true }, (error) => {
            if (!error) {
                new window.future.Dialog.GetInfoDialog({
                    padding: '30px 30px 30px 30px',
                    quickClose: true,
                    content: '请再次核对信息，提交后将无法修改。 确定提交并兑换吗？',
                    okValue: '确定',
                    cancelValue: '取消',
                    ok: function () {
                        const formData = self.formRef.current.getFieldsValue();
                        Exchange(
                            {
                                email: self.state.email,
                                contactor: formData.contactor,
                                phone: formData.phone,
                                address: formData.address,
                                giftId: self.state.form_giftId
                            }
                        ).then(res => {
                            if (res.code === 0) {
                                new window.future.Bubble.create({ html: '兑换成功', type: 'success', classList: ['theclass'] });
                                self.setState({
                                    formData_Visible: false
                                })
                                self.newsDialog.current.getNews().close()
                                // getPoints()
                                //     .then((data) => {
                                //         $('.my-point').text(data.totalPoint)

                                //     })
                                //     .catch((e) => { });
                                self.props.getPointsData();
                                self.getInfoData({ pageNo: self.state.pager.pageNo, type: self.state.currentTab });
                                self.getAddressData();
                            }
                        })
                    },
                    cancel: function () { }
                });
            } else {

            }
        });
    }
    onChangePage(e) {
        const pager = this.state.pager
        pager.pageNo = e
        this.setState({
            ...pager
        })
        this.getInfoData({ pageNo: e, type: this.state.currentTab });
    }
    componentDidMount() {
        this.getInfoData({ pageNo: 1, type: this.state.currentTab });
        // this.getTopData({ num: 1, type: 1 });
        this.getUserData();
    }
    getInfoData(query) {
        getInfo(query)
            .then((data) => {
                const pager = this.state.pager
                pager.pageTotal = data.content.totalPage
                pager.pageNo = query.pageNo
                if (data.code === 0 && data.content) {
                    this.setState({
                        total: data.content.total,
                        giftList: data.content.info,
                        isOss: data.content.oss,
                        ...pager
                    })
                }
            })
            .catch((e) => { });
    }
    // getTopData(query) {
    //     getTop(query)
    //         .then((data) => {
    //             if (data.code === 0 && data.content) {
    //                 this.setState({
    //                     giftList: data.content.info
    //                 })
    //             }
    //         })
    //         .catch((e) => { });
    // }

    getAddressData() {
        getAddress()
            .then((data) => {

                if (data.code === 0 && data.content) {
                    if ($('#J-textarea').length && $('#J-textarea').length > 0) {
                        $('#J-textarea').val(data.content.address);
                        $('.J-text-num').text($('#J-textarea').val().length)
                    }
                    this.setState({
                        formData: {
                            contactor: data.content.receiverName,
                            phone: data.content.phoneNumber,
                            address: data.content.address
                        }
                    })

                }
            })
            .catch((e) => { });
    }
    getUserData() {
        getUser()
            .then((data) => {
                if (data.code === 0 && data.content) {
                    this.setState({
                        email: data.content.email,
                        isApproved: data.content.isApproved
                    })
                }
            })
            .catch((e) => { });
    }
    async getUser() {
        const res = await getUser();
        if (res.content && res.code === 0) {
            return res.content;
        }
    }
    //积分及用户详情
    async getPoints() {
        const res = await getPoints();
        if (res.content && res.code === 0) {
            return res.content;
        }
    }
    render() {
        return (
            <div className="mall-content content-wrap">
                <TabsControl tabList={this.state.tabList} tabClick={(e) => { this.tabClick(e) }} />
                {
                    this.state.total === 0 || !this.state.total ? (
                        <NoData info="礼品正在准备中,敬请期待" />
                    ) : (
                        <React.Fragment>

                            <div className="mall-list">
                                {
                                    this.state.giftList.map((item, index) => {
                                        if (index <= 4) {
                                            return (
                                                <Gift
                                                    key={index}
                                                    name={item.name}
                                                    points={item.points}
                                                    leftNum={item.leftNum}
                                                    imgUrl={item.imgUrl}
                                                    handleClick={(e) => { this.detailClick(); this.setDialogData(item, e) }}
                                                />
                                            )
                                        } else if (index > 4 && !this.props.isMoreShow) {
                                            return (
                                                <Gift
                                                    key={index}
                                                    name={item.name}
                                                    points={item.points}
                                                    leftNum={item.leftNum}
                                                    imgUrl={item.imgUrl}
                                                    handleClick={(e) => { this.detailClick(); this.setDialogData(item, e) }}
                                                />
                                            )
                                        }

                                    })
                                }
                                {
                                    this.props.isMoreShow && this.state.total >= 5 ? (
                                        <div className="show-more">
                                            <div className="show-more-content" onClick={() => { window.open('/supplier/point/mall.html') }}>
                                                <div className="more-content">
                                                    <div className="show-more-img"></div>
                                                    <div className="show-more-text">进入积分商城</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }

                            </div>
                           <div className={this.state.pager.pageTotal <= 1 && "pagerNotShow"}>
                                        <Pager
                                            simple
                                            total={this.state.pager.pageTotal}
                                            current={this.state.pager.pageNo}
                                            onChangePage={(e) => {
                                                this.onChangePage(e);
                                            }}
                                        />
                               </div>   
                            <Dialog
                                skin="gift-dialog"
                                visible={this.state.giftDetail_Visible}
                                title="礼品详情"
                                width={560}
                                height={395}
                                onOK={() => { this.detailClick(false) }}
                                onCancel={() => { this.detailClick(false) }}
                            >
                                <div className="gift-detail">
                                    <div className="gift-img">
                                        <div className="gift-mask"></div>
                                        <img src={this.state.dialog_info.imgUrl} />
                                    </div>
                                    <div className="gift-info">
                                        <div className="gift-title-dialog">
                                            {this.state.dialog_info.name}
                                        </div>
                                        <div className="gift-desc">
                                            <div className="gift-type">
                                                礼品类型：{this.state.dialog_info.type}
                                            </div>
                                            <div className="gift-left">
                                                剩余：{this.state.dialog_info.leftNum}
                                            </div>
                                        </div>
                                        <div className="gift-bottom">
                                            <div className="gift-need">
                                                {this.state.dialog_info.points}积分
                                            </div>
                                            <div className={`gift-btn ${this.state.unClickable ? 'gift-btn-disabled' : ''} `} onClick={() => { this.exchangeClick() }}>
                                                {this.state.dialog_info.exchange}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="text-desc">
                                    <div className="text-desc-title">
                                        礼品详情
                                    </div>
                                    <div className="text-desc-info">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.dialog_info.prodDesc ? this.state.dialog_info.prodDesc : '暂无详情' }} />


                                    </div>
                                </div>
                            </Dialog>
                            <Dialog
                                ref={this.newsDialog}
                                btn
                                id='form-dialog-vo'
                                visible={this.state.formData_Visible}
                                title="信息填写"
                                width={560}
                                height={320}
                                onOK={() => { this.formSubmit() }}
                                onCancel={() => {
                                    this.formClick(false);
                                    this.clearForm()
                                }}
                            >
                                <Form formData={this.state.formData} ref={this.formRef} email={this.state.email} isExpress={this.state.dialog_info.type === '实物'} />
                            </Dialog>
                        </React.Fragment>
                    )
                }

            </div>
        );
    }
}
