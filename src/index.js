import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Row, Col, Checkbox } from "antd";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from "react-google-recaptcha-v3";
import "antd/dist/antd.css";
import "./index.css";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError =
      isFieldTouched("username") && getFieldError("username");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <GoogleReCaptchaProvider>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                validateStatus={usernameError ? "error" : ""}
                help={usernameError || ""}
              >
                {getFieldDecorator("fistname", {
                  rules: [
                    { required: true, message: "Please input your first name!" }
                  ]
                })(<Input placeholder="Enter first Name" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                validateStatus={passwordError ? "error" : ""}
                help={passwordError || ""}
              >
                {getFieldDecorator("lastname", {
                  rules: [
                    { required: true, message: "Please input your last name!" }
                  ]
                })(<Input placeholder="Enter last name" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Email"
                validateStatus={usernameError ? "error" : ""}
                help={usernameError || ""}
              >
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your first name!" }
                  ]
                })(<Input placeholder="Enter email" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Address 1"
                validateStatus={passwordError ? "error" : ""}
                help={passwordError || ""}
              >
                {getFieldDecorator("address1", {
                  rules: [
                    { required: true, message: "Please input your last name!" }
                  ]
                })(<Input placeholder="Enter address 1" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="Address 2"
                validateStatus={usernameError ? "error" : ""}
                help={usernameError || ""}
              >
                {getFieldDecorator("address2", {
                  rules: [
                    { required: true, message: "Please input your first name!" }
                  ]
                })(<Input placeholder="Enter address 2" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="City"
                validateStatus={passwordError ? "error" : ""}
                help={passwordError || ""}
              >
                {getFieldDecorator("city", {
                  rules: [
                    { required: true, message: "Please input your last name!" }
                  ]
                })(<Input placeholder="Enter city" />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12}>
              <Form.Item
                label="State"
                validateStatus={usernameError ? "error" : ""}
                help={usernameError || ""}
              >
                {getFieldDecorator("state", {
                  rules: [
                    { required: true, message: "Please input your first name!" }
                  ]
                })(<Input placeholder="Enter state" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Zip"
                validateStatus={passwordError ? "error" : ""}
                help={passwordError || ""}
              >
                {getFieldDecorator("zip", {
                  rules: [
                    { required: true, message: "Please input your last name!" }
                  ]
                })(<Input placeholder="Enter zip" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <div>
              <Checkbox>
                Placeholder for [legal terms here to comply with any regulatory
                requirements]
              </Checkbox>
            </div>
            <GoogleReCaptcha onVerify={token => console.log(token)} />
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
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
