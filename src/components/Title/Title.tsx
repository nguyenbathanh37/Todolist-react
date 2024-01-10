import { useSelector } from "react-redux";
import { selectTranslation } from "../../i18n/i18nSlice";

const Title: React.FC = () => {
    const trans = useSelector(selectTranslation)

    return (
        <h1 style={{ textAlign: 'center' }}>{trans.Title}</h1>
    );
}

export default Title