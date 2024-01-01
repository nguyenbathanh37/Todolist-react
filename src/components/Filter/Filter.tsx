import { Input } from 'antd';
import exp from 'constants';

const { Search } = Input

const Filter: React.FC = () => {
    return (
        <div>
            Search
            
            <Search placeholder="input search text" />
        </div>
    );
}

export default Filter