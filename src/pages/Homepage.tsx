import ChangeLanguage from "../components/ChangeLanguage/ChangLanguage"
import Title from "../components/Title/Title"
import Filter from "../components/Filter/Filter"
import Welcome from "../components/Welcome/Welcome"
import { Divider, Row, Col } from "antd"
import Todolist from "../components/Todolist/Todolist"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { selectFullname, selectIsLoggin } from "../components/Login/authSlice"
import { useSelector } from "react-redux"

const Homepage: React.FC = () => {
    const isLoggin = useSelector(selectIsLoggin)
    const navigate = useNavigate()
    const fullname = useSelector(selectFullname)

    useEffect(() => {
        if(!isLoggin) {
            navigate('/login')
        }
    }, [isLoggin])
    return (
        <div style={{height: '100%', width: '100%'}}>
            <Title></Title>
            <Filter></Filter>
            <Divider></Divider>
            <Todolist></Todolist>
        </div>
    )
}

export default Homepage;