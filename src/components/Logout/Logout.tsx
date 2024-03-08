import { Button } from "antd"
import { persistor } from "../../redux/store"
import { useSelector } from "react-redux"
import { selectTranslation } from "../../i18n/i18nSlice"

const Logout: React.FC = () => {
    const trans = useSelector(selectTranslation)
    const handleClickLogout = () => {
        persistor.purge()
        window.location.href = '/'
    }

    return (
        <Button style={{position: "absolute", right: 0}} type="primary" danger onClick={() => handleClickLogout()}>
            {trans.logout}
        </Button>
    )
}

export default Logout