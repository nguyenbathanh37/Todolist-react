import { Checkbox, Modal, Input } from 'antd';
import { useState } from 'react';
import { Row, Button, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteTodo, editTodo } from '../Todolist/todoListSlice';

type TodoProps = {
    id: string,
    name: string
}

const Todo: React.FC<TodoProps> = ({id, name}) => {
    const todos = useSelector((state: RootState) => state.todoList.todos)
    const dispatch: AppDispatch = useDispatch()
    
    const completed = todos.find(todo => todo.id === id)?.completed
    const oldNameTodo = todos.find(todo => todo.id === id)?.name
    const [checked, setChecked] = useState<boolean | undefined>(completed)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editText, setEditText] = useState<any>(oldNameTodo)

    const onChange = () => {
        setChecked(!checked)
    }

    const handleClickDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
        console.log(id);
    }

    const handleClickEditTodo = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        dispatch(editTodo({id: id, name: editText}))
        handleCancel()
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleChangeEditText = (e: any) => {
        setEditText(e.target.value)
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
                <Checkbox onChange={onChange} checked={checked}>
                    {name}
                </Checkbox>
            </Col>
            <Col>
                <Button type="primary" onClick={handleClickEditTodo}>
                    Edit
                </Button>
                <Modal title="Edit Todo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input value={editText} onChange={handleChangeEditText}/>
                </Modal>
                <Button type="primary" danger onClick={() => handleClickDeleteTodo(id)}>
                    Delete
                </Button>
            </Col>
        </Row>
    );
}

export default Todo;