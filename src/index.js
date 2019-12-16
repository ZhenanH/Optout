import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";
import "antd/dist/antd.css";
import "./index.css";

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }

class HorizontalLoginForm extends React.Component {
  state = {
    isVerified: false,
    agreedWithTerms: false,
    submitted: false
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    //this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.setState({ submitted: true });
      } else {
        console.log("err: ", err);
      }
    });
  };

  checkCheckBox = (rule, value, callback) => {
    console.log(value);
    if (!value) {
      callback("Please agree the terms and conditions.");
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
    this.setState({ isVerified: true });
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
              alignItems: "center",
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
              Thank you for submitting - please allow 48 hours before it's taken
              into efficient.{" "}
            </div>
          </div>
        ) : (
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item label="First Name">
                  {getFieldDecorator("fistname", {
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
                    rules: []
                  })(<Input placeholder="Enter email" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address 1">
                  {getFieldDecorator("address1", {
                    rules: [{ required: true, message: "Please enter address" }]
                  })(<Input placeholder="Enter address 1" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={32}>
              <Col span={12}>
                <Form.Item label="Address 2">
                  {getFieldDecorator("address2", {
                    rules: []
                  })(<Input placeholder="Enter address 2" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City">
                  {getFieldDecorator("city", {
                    rules: [{ required: true, message: "Please enter city" }]
                  })(<Input placeholder="Enter city" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={32}>
              <Col span={12}>
                <Form.Item label="State">
                  {getFieldDecorator("state", {
                    rules: [{ required: true, message: "Please enter state" }]
                  })(<Input placeholder="Enter state" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Zip">
                  {getFieldDecorator("zip", {
                    rules: [{ required: true, message: "Please enter zipcode" }]
                  })(<Input placeholder="Enter zip" />)}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              {getFieldDecorator("agree", {
                rules: [{ validator: this.checkCheckBox }]
              })(
                <Checkbox
                  onChange={e =>
                    this.setState({ agreedWithTerms: e.target.checked })
                  }
                >
                  {" "}
                  <span style={{}}>
                    By checking this box you agreed to provide PebblePost your
                    data so that we may accommodate your request to
                    unsubscribe/opt out.
                  </span>
                </Checkbox>
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                //disabled={!this.agreedWithTerms}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
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
