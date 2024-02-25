import { useState } from 'react';
import type { CascaderProps } from 'antd';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select, message } from 'antd';
import supabase from '../../supabase/supabase.config';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../../i18n/i18nSlice';

const { Option } = Select;

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [fullname, setFullname] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const trans = useSelector(selectTranslation)

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    const [form] = Form.useForm();

    const handleEmail = (e: any) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value)
    }

    const handleFullname = (e: any) => {
        setFullname(e.target.value)
    }

    const onFinish = async (values: any) => {
        try {
            const {data, error} = await supabase
            .from('User')
            .select('*')
            .eq('email', values.email)

            if (data?.length == 0) {
                const date = new Date(Date.now())
                const {data, error} = await supabase
                .from('User')
                .insert([
                    {email: values.email, password: values.password, fullname: values.fullname, gender: values.gender, created_at: date}
                ])
                navigate('/login')
            } else {
                messageApi.open({
                    type: 'error',
                    content: trans.errorEmailInsert,
                    duration: 5
                })
            }
        } catch (error) {
            console.log(error);
        }
        // console.log('Received values of form: ', values);
    };

    return (
        <div>
            <h1>{trans.RegisterTitle}</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label={trans.phEmail}
                    rules={[
                        {
                            type: 'email',
                            message: trans.errorEmailInValid,
                        },
                        {
                            required: true,
                            message: trans.errorEmailEmpty,
                        },
                    ]}
                >
                    <Input 
                        value={email}
                        onChange={handleEmail}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={trans.phPassword}
                    tooltip={trans.passwordTooltip}
                    rules={[
                        {
                            validator: (_, value) => {
                                const minLength = 8; // Minimum password length
                                const hasUpperCase = /[A-Z]/.test(value);
                                const hasLowerCase = /[a-z]/.test(value);
                                const hasNumber = /\d/.test(value);
                                const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
                                if (!value || (value.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
                                    return Promise.resolve()
                                } else {
                                    return Promise.reject(trans.errorWeekPassword)
                                }
                            },
                        },
                        {
                            required: true,
                            message: trans.errorPasswordEmpty,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password 
                        value={password}
                        onChange={handlePassword}
                    />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label={trans.confirmPassword}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: trans.errorConfirmPasswordEmpty,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(trans.errorConfirmPasswordMatching));
                            },
                        }),
                    ]}
                >
                    <Input.Password 
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                    />
                </Form.Item>

                <Form.Item
                    name="fullname"
                    label={trans.fullname}
                    rules={[{ required: true, message: trans.errorFullnameEmpty, whitespace: true }]}
                >
                    <Input 
                        value={fullname}
                        onChange={handleFullname}
                    />
                </Form.Item>

                {/* <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item> */}

                <Form.Item
                    name="gender"
                    label={trans.gender}
                    rules={[{ required: true, message: trans.errorGenderEmpty }]}
                >
                    <Select placeholder={trans.phGender}>
                        <Option value="male">{trans.male}</Option>
                        <Option value="female">{trans.female}</Option>
                        <Option value="other">{trans.other}</Option>
                    </Select>
                </Form.Item>

                {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="captcha"
                                noStyle
                                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Button>Get captcha</Button>
                        </Col>
                    </Row>
                </Form.Item> */}

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error(trans.errorAgreement)),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        {trans.agreementRead1} <Link to=''>{trans.agreementRead2}</Link>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {contextHolder}
                    <Button type="primary" htmlType="submit">
                        {trans.RegisterTitle}
                    </Button>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    {trans.haveAnAccount} <Link to='/login'>{trans.Login}</Link> 
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register