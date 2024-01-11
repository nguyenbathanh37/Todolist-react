import { Input } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTranslation } from '../../i18n/i18nSlice';
import { AppDispatch } from '../../redux/store';
import { search } from './filterSlice';

const { Search } = Input

const Filter: React.FC = () => {
    const [searhText, setSearchText] = useState<string>('')
    const trans = useSelector(selectTranslation)
    const dispatch: AppDispatch = useDispatch()

    const handleSearchChanged = (e: any) => {
        setSearchText(e.target.value)
        dispatch(search(e.target.value))
    }

    return (
        <div>
            {trans.Search}
            <Search placeholder={trans.phSearch} value={searhText} onChange={handleSearchChanged}/>
        </div>
    );
}

export default Filter