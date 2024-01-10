import { Select } from 'antd';
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { selectTranslation } from "../../i18n/i18nSlice";
import { setLang } from '../../i18n/i18nSlice';

const ChangeLanguage: React.FC = () => {
    const supportLangs = useSelector((state: RootState) => state.i18n.supportLangs)
    const defaultLang = useSelector((state: RootState) => state.i18n.lang)
    const trans = useSelector(selectTranslation)
    const dispatch: AppDispatch = useDispatch()

    const handleChange = (value: string) => {
        dispatch(setLang(value))
    }

    return (
        <Select
            defaultValue={defaultLang}
            style={{ width: 120 }}
            onChange={handleChange}
            options={Object.keys(supportLangs).map((key) => (
                {value: key, label: supportLangs[key]}
            ))}
        />
    );
}

export default ChangeLanguage