import { Row, Col, Input, Button, Space } from "antd";
import Todo from "../Todo/Todo";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTodo } from "./todoListSlice";
import { uuid } from "uuidv4";

const Todolist: React.FC = () => {
    const [addText, setAddText] = useState<string>('')
    const todos = useSelector((state: RootState) => state.todoList.todos)
    const dispatch: AppDispatch = useDispatch()

    const handleAddText = (e: any) => {
        setAddText(e.target.value)
    }

    const handleClickAddText = () => {
        dispatch(addTodo({id: "uuid()", name: addText, completed: false}))
        setAddText('')
    }

    return (
        <Row style={{ height: 'calc(100% - 40px)' }}>
            <Col span={24}  style={{ height: 'calc(100% - 40px)'}}>
                {todos.map((todo) => (
                    <Todo key={todo.id} id={todo.id} name={todo.name}></Todo>
                ))}
            </Col>

            <Col span={24}>
                <Row>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder="Add Todo" value={addText} onChange={handleAddText}/>
                        <Button type="primary" onClick={handleClickAddText}>Add</Button>
                    </Space.Compact>
                </Row>
            </Col>
        </Row>
    );
}

export default Todolist