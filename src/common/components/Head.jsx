import * as React from "react";
import Dialog from '@/common/components/Dialog'

export default class Head extends React.Component {

    constructor(props) {
        super();
        this.state = { intergralDescription_Visible: false }
    }
    showiDescrition(show = true) {
        this.setState({
            intergralDescription_Visible: show
        })
    }
    render() {
        return (
            <>
                <div className="vo-main-title">
                    <span className="vo-main-title-text">{this.props.title}</span>
                    <span className="vo-next-title-text" onClick={() => { this.showiDescrition() }}>积分说明</span>
                </div>
                <Dialog
                    skin="desc"
                    visible={this.state.intergralDescription_Visible}
                    title="积分说明"
                    width={560}
                    height={431}
                    onCancel={() => { this.showiDescrition(false) }}
                >
                    <div className="top-title">中国制造网国际站会员积分说明</div>

                    <p>一、会员积分定义</p>
                    <p>2021年8月9日起，中国制造网国际站的每个供应商会员（简称“会员”）完成网站规定的动作，即可获取相应的会员积分。积分仅可在中国制造网国际站使用，用来兑换积分商城的商品。如果公司信息被删除、暂停，则对应帐号的积分不可使用。</p>

                    <p>二、会员积分赚取规则</p>

                    <p>计算规则详见下表：</p>
                    <table className="ft-table is-normal" >
                        <thead>
                            <tr>
                                <th>来源</th>
                                <th>动作【注1】</th>
                                <th>积分</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>会员等级积分</td>
                                <td>注册会员或升级会员【注2】</td>
                                <td>免费会员200积分；<br />金牌会员400积分；<br />钻石会员600积分；</td>
                            </tr>
                            <tr>
                                <td>Virtual Office中“积分任务”</td>
                                <td>完成行为任务【注3】</td>
                                <td>获取任务对应的分数</td>
                            </tr>
                            <tr>
                                <td>运营活动</td>
                                <td>达到活动要求</td>
                                <td>根据活动具体情况赠送</td>
                            </tr>
                        </tbody>
                    </table>

                    <p>注1：高级会员主、子帐号各自计算积分，具体根据积分任务类型将获取的积分分别计入主、子帐号中。当子帐号被主帐号删除后，对应的积分清零。</p>
                    <p>注2：根据会员等级为主帐号赋予初始积分，免费会员200积分，金牌会员400积分，钻石会员600积分。会员升级时，自动奖励相应等级对应的剩余积分，如免费会员升级金牌会员，再奖励200积分；免费会员升级钻石会员，再奖励400积分。会员等级奖励积分为一次性奖励积分，不重复累加。</p>
                    <p>注3：会员在供应商APP上完成的任务奖励积分仅在PC端查看，APP端不展示。</p>

                    <p>三、积分使用规则</p>

                    <p>1. 会员积分可以用来兑换实物类或服务卡券类商品。详细情况以积分商城页面展示的资源为准，兑换仅可以在PC端完成。</p>
                    <p>2. 所有的兑换需要在公司信息通过审核的前提下才可以实现积分兑换商品。</p>

                    <p>四、如何查看积分</p>

                    <p>您可以通过几种方式查看对应的积分：</p>
                    <p>方式一：PC端打开中国制造网，首页右上角“For Supplier”-“积分商城”-“我的积分”，登录后可以查看您对应的积分；</p>
                    <p>方式二：PC端直接登录Virtual Office，首页右上角“帐户中心”-“我的积分”，查看您对应的积分；</p>

                    <p>五、积分有效期</p>
                    <p>国际站会员积分的有效期为6个月，从积分获取月的次月开始计算有效期，6个月最后一天的23：59：59扣减该笔积分。请及时兑换，防止积分到期失效。</p>

                    <p>举例：2021年1月10日获得100积分，1月20日获得10积分，从2月份开始计算有效期，7月31日的23：59：59扣减这110积分（若110积分未使用）。</p>

                    <p>六、会员积分相关规则</p>

                    <p>1. 符合兑换条件的会员，可随时在“积分商城”参与兑换，并应依据操作要求填写领取方式、领取人资料等相关信息；一经操作则相应会员积分自动扣除，会员不得撤销操作或修改信息。</p>
                    <p>2. 部分可兑换的商品数量有限，先到先得，具体兑换说明关注积分商城页面。</p>
                    <p>3. 所有商品均可兑换，兑换时请注意兑换商品的使用条件，符合条件方可使用。</p>
                    <p>4、如出现不可抗力或形势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），中国制造网可依相关法律规定主张免责。</p>
                    <p>5、中国制造网可根据本活动实际情况对规则进行调整，调整后的规则将公布在活动页面上，并于公布时即时生效。</p>

                    <p>七、违规赚取积分行为</p>

                    如活动中会员用户有违规行为（包括但不限于恶意刷分、以多账号操作方式作弊等），中国制造网有权取消相应的活动积分、收回兑换资源等。<br />

                </Dialog>
            </>
        )
    }

}