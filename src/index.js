import React from "react";
import ReactDOM from "react-dom";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Alert,
  Tabs,
  Tooltip,
  Icon,
  Popconfirm,
  Select
} from "antd";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";
import "antd/dist/antd.css";
import "./index.css";
const { TabPane } = Tabs;
const { Option } = Select;
const states = "Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming".split(
  ","
);
// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class HorizontalLoginForm extends React.Component {
  state = {
    token: null,
    agreedWithTerms: false,
    submitted: false,
    loading: false,
    formData: null
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    //this.props.form.validateFields();
  }

  postRequest = data => {
    const param = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    };

    return param;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("options: ", this.postRequest({ token: "i am a token" }));
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", {
          token: this.state.token,
          ...values
        });

        this.setState({ loading: true });
        fetch(
          "https://m7pwfi5u15.execute-api.us-east-1.amazonaws.com/develop",
          this.postRequest({ token: this.state.token, ...values })
        )
          .then(data => {
            return data.json();
          })
          .then(res => {
            this.setState({
              submitted: true,
              loading: false,
              formData: values
            });
            console.log("submitted", res, this.state);
          })
          .catch(error => console.log("error", error));
      } else {
        console.log("err: ", err);
      }
    });
  };

  checkCheckBox = (rule, value, callback) => {
    console.log(value);
    if (!value) {
      //callback("Please agree the terms and conditions.");
    } else {
      callback();
    }
  };

  onVerify = token => {
    // const Url = "https://www.google.com/recaptcha/api/siteverify";
    // const Pram = {
    //   method:"POST",
    //   secret:"6LdhTccUAAAAAAmEOq3IpLk2UINqNhYTdzZNrIau",
    //   response:token
    // };

    // fetch(Url,Pram)
    // .then(data=>{return data.json()})
    // .then(res=>{console.log(res)})
    // .catch(error=>console.log(error));
    console.log("token: ", token);
    this.setState({ token: token });
  };

  render() {
    const {
      getFieldDecorator
      //getFieldsError,
      // getFieldError,
      // isFieldTouched
    } = this.props.form;

    return (
      <GoogleReCaptchaProvider reCaptchaKey="6LdhTccUAAAAAAmEOq3IpLk2UINqNhYTdzZNrIau">
        <GoogleReCaptcha onVerify={this.onVerify} />
        {this.state.submitted ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: 24,
              //alignItems: "center",
              flexDirection: "column",
              height: 500
            }}
          >
            <div
              style={{
                fontSize: 20,
                textAlign: "center",
                maxWidth: 500,
                marginBottom: 48
              }}
            >
              You have successfully submitted the request to following:
            </div>
            {this.state.formData["request-type-group"].indexOf("OptOutMail") >=
              0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: "grey" }}>
                  <Icon
                    type="check"
                    style={{ color: "#52c41a", marginRight: 8 }}
                  />
                  Opt Me Out of Receiving Mail
                </div>
                <div style={{ marginLeft: 24 }}>
                  Your request is confirmed. Please allow 48-72 hours before
                  your request is fully processed.
                </div>
              </div>
            )}
            {this.state.formData["request-type-group"].indexOf("DeleteInfo") >=
              0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: "grey" }}>
                  <Icon
                    type="check"
                    style={{ color: "#52c41a", marginRight: 8 }}
                  />
                  Delete Information Known About Me
                </div>
                {this.state.formData.state !== " California" ? (
                  <div style={{ marginLeft: 24 }}>
                    Your request is confirmed. We will review your request, and
                    process as quickly as possible.
                  </div>
                ) : (
                  <div style={{ marginLeft: 24 }}>
                    If your request has been validated, we will delete your
                    Personal Information within 45 days, and provide
                    confirmation via email when completed. In the event your
                    request is not validated, you will be notified via email.
                  </div>
                )}
              </div>
            )}
            {this.state.formData["request-type-group"].indexOf("NotifyMe") >=
              0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ color: "grey" }}>
                  <Icon
                    type="check"
                    style={{ color: "#52c41a", marginRight: 8 }}
                  />
                  Disclose Information Known About Me
                </div>
                {this.state.formData.state !== " California" ? (
                  <div style={{ marginLeft: 24 }}>
                    Your request is confirmed. We will review your request, and
                    process as quickly as possible.
                  </div>
                ) : (
                  <div style={{ marginLeft: 24 }}>
                    If your request has been validated, we will delete your
                    Personal Information within 45 days, and provide
                    confirmation via email when completed. In the event your
                    request is not validated, you will be notified via email.
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <Alert
              style={{ marginBottom: 24 }}
              message="Why we need these information"
              description={
                <div>
                  <div>
                    If you are a California resident, you may be able to
                    exercise certain data rights under the California Consumer
                    Privacy Act (CCPA). In order to exercise these rights,
                    PebblePost requires certain types of information (listed
                    below). We may require additional information if we are
                    unable to verify your request based on the information
                    provided.
                    <div>
                      <br />
                      This form is only applicable to consumers within the
                      United States.{" "}
                    </div>
                  </div>
                </div>
              }
              type="info"
              showIcon
            />
            <Tabs defaultActiveKey="1">
              <TabPane tab="Request Online" key="1">
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label="First Name">
                        {getFieldDecorator("firstname", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your first name!"
                            }
                          ]
                        })(<Input placeholder="Enter first Name" />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Last Name">
                        {getFieldDecorator("lastname", {
                          rules: [
                            {
                              required: true,
                              message: "Please enter your last name!"
                            }
                          ]
                        })(<Input placeholder="Enter last name" />)}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label="Email">
                        {getFieldDecorator("email", {
                          rules: [
                            { required: true, message: "Please enter email" }
                          ]
                        })(<Input placeholder="Enter email" />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Address 1">
                        {getFieldDecorator("address1", {
                          rules: [
                            { required: true, message: "Please enter address" }
                          ]
                        })(<Input placeholder="Enter address 1" />)}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label="City">
                        {getFieldDecorator("city", {
                          rules: [
                            { required: true, message: "Please enter city" }
                          ]
                        })(<Input placeholder="Enter city" />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="State">
                        {getFieldDecorator("state", {
                          rules: [
                            { required: true, message: "Please select a state" }
                          ]
                        })(
                          <Select
                            showSearch
                            //style={{ width: 200 }}
                            placeholder="Select a state"
                            //optionFilterProp="children"
                            // onChange={onChange}
                            // onFocus={onFocus}
                            // onBlur={onBlur}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {states.map(s => (
                              <Option value={s}>{s}</Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={32}>
                    <Col span={12}>
                      <Form.Item label="Zip">
                        {getFieldDecorator("zip", {
                          rules: [
                            { required: true, message: "Please enter zipcode" }
                          ]
                        })(<Input placeholder="Enter zip" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="Request Type">
                    {getFieldDecorator("request-type-group", {
                      //initialValue: [null, null,null],
                      rules: [
                        {
                          required: true,
                          message: "Please select at lease one request type"
                        }
                      ]
                    })(
                      <Checkbox.Group
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Checkbox
                          style={{ marginLeft: 8 }}
                          value="OptOutMail"
                          // onChange={e =>
                          //   this.setState({ agreedWithTerms: e.target.checked })
                          // }
                        >
                          {" "}
                          <span style={{}}>
                            Opt Me Out of Receiving Mail{" "}
                            <Tooltip title="Consumers can choose to manage the mail you or anyone in your household receives from PebblePost. By entering the required information in this form, you can opt to no longer receive mail from PebblePost on behalf of our brands.">
                              <Icon type="info-circle" />
                            </Tooltip>
                          </span>
                        </Checkbox>
                        <Checkbox
                          value="DeleteInfo"
                          // onChange={e =>
                          //   this.setState({ agreedWithTerms: e.target.checked })
                          // }
                        >
                          {" "}
                          <span style={{}}>
                            Delete Information Known About Me{" "}
                            <Tooltip title="Under the California Consumer Privacy Act (CCPA), California residents are entitled to know the categories of information collected about them. By entering the required information in this form, PebblePost can disclose the information they have collected about you over the last 12 months.">
                              <Icon type="info-circle" />
                            </Tooltip>
                          </span>
                        </Checkbox>
                        <Checkbox
                          value="NotifyMe"
                          // onChange={e =>
                          //   this.setState({ agreedWithTerms: e.target.checked })
                          // }
                        >
                          {" "}
                          <span style={{}}>
                            Disclose Information Known About Me{" "}
                            <Tooltip
                              title="The California Consumer Privacy Act (CCPA) grants consumers the right to request deletion of their personal information. By entering the required information in this form, PebblePost can properly comply and delete any personal information they have collected about you.

."
                            >
                              <Icon type="info-circle" />
                            </Tooltip>
                          </span>
                        </Checkbox>
                      </Checkbox.Group>
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Popconfirm
                      title="Please reply “Yes”  to confirm you want to proceed with your request                           "
                      onConfirm={this.handleSubmit}
                      //onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                      placement="rightTop"
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!this.state.token}
                        loading={this.state.loading}
                      >
                        Submit
                      </Button>
                    </Popconfirm>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="Request by mail" key="2">
                <div style={{ marginBottom: 24 }}>
                  You can also mail in requests with the information below via
                  certified or registered mail to:{" "}
                </div>
                <pre>
                  <div>Attention Chief Privacy Officer</div>
                  <div>400 Lafayette Street, Floor 2 </div>
                  <div>New York, NY 10003 </div>
                </pre>
                <div>
                  Please include: Name, Address (Street City, State, Zip),
                  Email, and what type of request it is (1. Opt out of receiving
                  mail, 2. Delete my information, 3. Disclose information known
                  about me), and a photocopy of a recent bill or piece of mail
                  to your current address.
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </GoogleReCaptchaProvider>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
  HorizontalLoginForm
);
ReactDOM.render(
  <div className="App">
    <WrappedHorizontalLoginForm />
  </div>,
  document.getElementById("root")
);
