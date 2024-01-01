import { Checkbox } from 'antd';
import { useState } from 'react';
import { Row, Button, Col } from 'antd';

type TodoProps = {
    name: string
}

const Todo: React.FC<TodoProps> = ({name}) => {
    const [checked, setChecked] = useState(false)

    const onChange = () => {
        setChecked(!checked)
    }

    return (
        <Row
            justify='space-between'
            style={{
            marginBottom: 3,
            ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}),
            }}
        >
            <Col>
                <Checkbox onChange={onChange}>
                    {name}
                </Checkbox>
            </Col>
            <Col>
                <Button type="primary">
                    Edit
                </Button>
                <Button type="primary" danger>
                    Delete
                </Button>
            </Col>
        </Row>
    );
}

export default Todo;