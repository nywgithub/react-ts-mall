import * as React from "react";
import { createForm } from "rc-form";

export class Form extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    
  }
  isBlank = (rule, value, callback) => {
    if (!$.trim(value)) {
      callback(rule.message);
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator, getFieldError, getFieldProps } = this.props.form;
    const { contactor, phone, address } = this.props.formData;
    getFieldProps("contactor", {
      initialValue: contactor,
      validateFirst: true,
    });
    getFieldProps("phone", {
      initialValue: phone,
      validateFirst: true,
    });
    getFieldProps("address", {
      initialValue: address,
      validateFirst: true,
    });
    return (
      <>
        <form action="" method="post" className="ft-form ft-form-span-6 is-horizontal is-res" id="myform4">

          <div className="ft-form-item ft-form-item">
            <div className="ft-form-label">
              <label>帐户邮箱:</label>
            </div>
            <div className="ft-form-field">
              <span className="ft-span-email">{this.props.email}</span>
            </div>
          </div>

          <div className="ft-form-item ft-form-item--required">
            <div className="ft-form-label">
              <label>联系人:</label>
            </div>
            <div className="ft-form-field">
              {getFieldDecorator("contactor", {
                validateFirst: true,
                initialValue: contactor,
                validate: [
                  {
                    trigger: 'onChange',
                    rules: [{ max: 100, message: '最大100个字符' }],
                  },
                  {
                    trigger: 'onSubmit',
                    rules: [
                      {
                        required: true,
                        transform(value) {
                          return value.trim();
                        },
                        message: "请填写联系人姓名",
                      }
                    ]
                  }
                ],
              })(<input type="text" className="ft-input-text" placeholder="请填写联系人姓名" />)}

            </div>
            <span
              className="form-validate-span"
              style={{
                display: !!getFieldError("contactor") ? "" : "none",
                color: "red",
              }}
            >
              {getFieldError("contactor")}
            </span>
          </div>

          <div className="ft-form-item ft-form-item--required">
            <div className="ft-form-label">
              <label >手机号码:</label>
            </div>
            <div className="ft-form-field">
              {getFieldDecorator("phone", {
                validateFirst: true,
                initialValue: phone,
                validate: [
                  {
                    trigger: 'onChange',
                    rules: [{
                      max: 11,
                      message: "手机号码不能超过11位",
                    },],
                  },
                  {
                    trigger: 'onSubmit',
                    rules: [
                      {
                        required: true,
                        transform(value) {
                          return value.trim();
                        },
                        message: "请填写联系人手机号",
                      }, {
                        type: "integer",
                        transform(value) {
                          value = value.trim();
                          if (/^-?\d+$/.test(value)) return parseInt(value);
                          return value;
                        },
                        message: "请填写正确的手机号码",
                      },
                    ]
                  }
                ],
                // rules: [
                //   {
                //     required: true,
                //     message: "请填写联系人手机号",
                //   },
                //   {
                //     type: "integer",
                //     transform(value) {
                //       value = value.trim();
                //       if (/^-?\d+$/.test(value)) return parseInt(value);
                //       return value;
                //     },
                //     message: "请填写正确的手机号码",
                //   },
                //   {
                //     max: 11,
                //     message: "手机号码不能超过11位",
                //   },
                // ],
              })(<input type="text" className="ft-input-text" placeholder="请务必填写准确手机号" />)}

            </div>
            <span
              className="form-validate-span"
              style={{
                display: !!getFieldError("phone") ? "" : "none",
                color: "red",
              }}
            >
              {getFieldError("phone")}
            </span>
          </div>

          {
            this.props.isExpress &&
            (
              <div className="ft-form-item ft-form-item--required">
                <div className="ft-form-label">
                  <label >寄送地址:</label>
                </div>
                <div className="ft-form-field">
                  {getFieldDecorator("address", {
                    validateFirst: true,
                    initialValue: address,
                    validate: [
                      {
                        trigger: 'onChange',
                        rules: [{ max: 200, message: '最大200个字符' }],
                      },
                      {
                        trigger: 'onSubmit',
                        rules: [
                          {
                            required: true,
                            transform(value) {
                              return value.trim();
                            },
                            message: "请填写寄送地址",
                          }
                        ]
                      }
                    ]
                  })(
                    <div className="ft-textarea-common">
                      <textarea className="ft-input-textarea" id="J-textarea" cols="46" rows="7" placeholder="请正确填写寄送地址 &#10; （xx省xx市xx区+详细地址）"></textarea>
                      <div className="ft-field">
                        <div className="ft-field-length">
                          <span className="ft-field-num J-text-num">0</span> / 200
                    </div>
                      </div>
                    </div>
                  )}

                </div>
                <span
                  className="form-validate-span"
                  style={{
                    display: !!getFieldError("address") ? "" : "none",
                    color: "red",
                  }}
                >
                  {getFieldError("address")}
                </span>
              </div>
            )

          }
         
        </form>
      </>
    );
  }
}

const Component = createForm()(Form);

export default React.forwardRef((props, ref) => <Component {...props} ref={ref} />);
