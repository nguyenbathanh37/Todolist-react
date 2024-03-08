import { useSelector } from "react-redux"
import { selectTranslation } from "../../i18n/i18nSlice"

const Welcome= (props: any) => {
    const trans = useSelector(selectTranslation)
    return (
        <div>
            <p>{trans.welcome} <b><i>{props.fullname}</i></b></p>
        </div>
    )
}

export default Welcome