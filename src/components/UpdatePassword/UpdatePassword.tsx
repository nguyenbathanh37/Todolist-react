import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import supabase from '../../supabase/supabase.config';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../../i18n/i18nSlice';
import { confirmThePasswordReset } from '../../firebase/firebase.config';

const UpdatePassword: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const trans = useSelector(selectTranslation)

    const [searchParams] = useSearchParams()
    let oobCode: string | null = searchParams.get('oobCode')

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

    const onFinish = async (values: any) => {
        try {
            if (oobCode) {
                await confirmThePasswordReset(oobCode, values.confirm)
                // có thể thay đổi pass của email khác
                const { data, error } = await supabase
                .from('User')
                .update({'password': values.confirm})
                .eq('email', values.email)

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
    };

    return (
        <div>
            <h1>{trans.updatePasswordTitle}</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="update"
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

                <Form.Item {...tailFormItemLayout}>
                    {contextHolder}
                    <Button type="primary" htmlType="submit">
                        {trans.updateBtn}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdatePassword