import ChangeLanguage from "../components/ChangeLanguage/ChangLanguage"
import Title from "../components/Title/Title"
import Filter from "../components/Filter/Filter"
import { Divider } from "antd"
import Todolist from "../components/Todolist/Todolist"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { selectIsLoggin } from "../components/Login/authSlice"
import { useSelector } from "react-redux"

const Homepage: React.FC = () => {
    const isLoggin: boolean = useSelector(selectIsLoggin)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isLoggin) {
            navigate('/login')
        }
    }, [isLoggin])
    return (
        <div style={{height: '100%', width: '100%'}}>
            {/* <ChangeLanguage></ChangeLanguage> */}
            <Title></Title>
            <Filter></Filter>
            <Divider></Divider>
            <Todolist></Todolist>
        </div>
    )
}

export default Homepage;