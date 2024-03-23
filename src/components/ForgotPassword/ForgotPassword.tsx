import React, { useState } from 'react';
import { Button, Form, Input, message, Space } from 'antd';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../../i18n/i18nSlice';
import supabase from '../../supabase/supabase.config';
import { auth } from '../../firebase/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
const ForgotPassword: React.FC = () => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState<string>('')
    const trans = useSelector(selectTranslation)
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', values.email)

            if (data?.length != 0) {
                sendPasswordResetEmail(auth, values.email)
                    .then(() => {
                        messageApi.open({
                            type: 'success',
                            content: trans.successEmailReset,
                            duration: 5
                        })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + errorMessage)
                    });
            } else {
                messageApi.open({
                    type: 'error',
                    content: trans.errorEmailUnregistered,
                    duration: 5
                })
            }

        } catch (error) {
            console.log(error)
        }
    };

    const handleEmailInput = (e: any) => {
        setEmail(e.target.value)
    }

    return (
        <div>
            <h1>{trans.forgotPasswordTitle}</h1>
            <p>{trans.forgotPasswordContent}</p>
            <br />
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
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
                    <Input onChange={handleEmailInput} value={email} placeholder="enter your email" />
                </Form.Item>
                <Form.Item>
                    <Space>
                    {contextHolder}
                        <Button type="primary" htmlType="submit">
                            {trans.submitBtn}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPassword