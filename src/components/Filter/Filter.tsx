import { Input } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTranslation } from '../../i18n/i18nSlice';

const { Search } = Input

const Filter: React.FC = () => {
    const [searhText, setSearchText] = useState<string>('')
    const trans = useSelector(selectTranslation)

    const handleSearchChanged = (e: any) => {
        setSearchText(e.target.value)
    }

    return (
        <div>
            {trans.Search}
            <Search placeholder={trans.phSearch} value={searhText} onChange={handleSearchChanged}/>
        </div>
    );
}

export default Filter