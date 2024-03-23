import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import supabase from '../../supabase/supabase.config';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { selectTranslation } from '../../i18n/i18nSlice';
import { auth } from '../../firebase/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
        // await signInWithEmailAndPassword(auth, values.username, values.password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         console.log('user infor: ' + user);
                
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });
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
                dispatch(login({ user_id: data[0].user_id, email: username, fullname: data[0].fullname, isLoggin: true }))
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
                        placeholder={trans.phEmail}
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

                    {/* <a className="login-form-forgot" href="">
                    {trans.ForgotPassword}
                </a> */}
                    <Link to='/forgot-password'>{trans.ForgotPassword}</Link>
                </Form.Item>

                <Form.Item>
                    {contextHolder}
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        {trans.Login}
                    </Button>
                    {trans.Or} <Link to='/register'>{trans.Register}</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login