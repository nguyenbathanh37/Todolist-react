import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import supabase from '../../supabase/supabase.config';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
import { selectTranslation } from '../../i18n/i18nSlice';

const Login: React.FC = () => {
    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const trans = useSelector(selectTranslation)
    const [messageApi, contextHolder] = message.useMessage();


    const handleUserName = (e: any) => {
        setUserName(e.target.value)
    }

    const handlePassword = (e: any) => {
        setPassword(e.target.value)
    }

    const onFinish = async (values: any) => {
        try {        
            const { data, error } = await supabase
            .from('User')
            .select('*')
            .eq('email', values.username)
            .eq('password', values.password)

            if (error) {
                console.error(error);
                return;
            }

            if (data.length != 0) {
                dispatch(login({email: username, fullname: data[0].fullname}))
                navigate('/')
            } else {
                messageApi.open({
                    type: 'error',
                    content: trans.errorLogin,
                    duration: 5
                })
            }
        } catch (error) {
            console.log(error);        
        }
    }

    // const validateLogin = (username: string, password: string): string => {
    //     const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    //     const minLengthPassword = 8
    //     if (!regex.test(username)) {
    //         return 'Email invalid'
    //     } else if (password.length <= minLengthPassword) {
    //         return 'Minimum password length is 8 characters'
    //     }
    //     return ''
    // }

    return (
        <div>

        <h1>{trans.Login}</h1>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder={trans.phUsername}
                    value={username} 
                    onChange={handleUserName} 
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder={trans.phPassword}
                    value={password}
                    onChange={handlePassword}
                />
            </Form.Item>
            <Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <a className="login-form-forgot" href="">
                    {trans.ForgotPassword}
                </a>
            </Form.Item>

            <Form.Item>
                {contextHolder}
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                    {trans.Login}
                </Button>
                {trans.Or} <a href="">{trans.Register}</a>
            </Form.Item>
        </Form>
        </div>
    )
}

export default Login