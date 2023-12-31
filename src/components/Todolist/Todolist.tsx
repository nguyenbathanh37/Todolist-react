import { Row, Col, Input, Button, Space } from "antd";
import Todo from "../Todo/Todo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTodo, setTodo } from "./todoListSlice";
import supabase from "../../supabase/supabase.config";

const Todolist: React.FC = () => {
    const [addText, setAddText] = useState<string>('')
    const todos = useSelector((state: RootState) => state.todoList.todos)
    const dispatch: AppDispatch = useDispatch()

    const handleAddText = (e: any) => {
        setAddText(e.target.value)
    }

    const handleClickAddText = () => {
        dispatch(addTodo({id: '', name: addText, completed: false}))
        setAddText('')
        insertDataFromSupabase()
        fetchDataFromSupabase()
    }

    const insertDataFromSupabase = async () => {
        try {
            const { data, error } = await supabase
            .from('Todo')
            .insert([
                { name: addText, completed: false },
            ])

            if (error) {
                console.log('Error insert data', error.message);   
            }
        } catch (error) {
            console.error('Unexpected error:', error)
        }
    }

    const fetchDataFromSupabase = async () => {
        try {
            const { data, error } = await supabase
            .from('Todo')
            .select('*')
      
            if (error) {
                console.error('Error fetching data', error.message)
            } else {
                dispatch(setTodo(data))
            }
        } catch (error) {
            console.error('Unexpected error:', error)
        }
    }

    useEffect(()=> {
        fetchDataFromSupabase()
    }, [])

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