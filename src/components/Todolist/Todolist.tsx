import { Row, Col, Input, Button, Space, Pagination, message } from "antd";
import Todo from "../Todo/Todo";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTodo, setTodo, setCurrentPage, selectCurrentPage, selectTodosPerPage, selectNumberOfTodosPerPage, selectFilterTodos } from "./todoListSlice";
import supabase from "../../supabase/supabase.config";
import { v4 as uuidv4 } from "uuid";
import { selectTranslation } from "../../i18n/i18nSlice";
import { selectUserID } from "../Login/authSlice";

const Todolist: React.FC = () => {
    const [addText, setAddText] = useState<string>('')
    const todos = useSelector(selectFilterTodos)
    const todosPerPage = useSelector(selectTodosPerPage)
    const numberOfTodosPerPage = useSelector(selectNumberOfTodosPerPage)
    const currentPage = useSelector(selectCurrentPage)
    const trans = useSelector(selectTranslation)
    const user_id = useSelector(selectUserID)
    const dispatch: AppDispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();

    const handleAddText = (e: any) => {
        setAddText(e.target.value)
    }

    const handleClickAddText = () => {
        const todo_id = uuidv4()
        if(addText) {
            dispatch(addTodo({id: todo_id, name: addText, completed: false}))
            setAddText('')
            insertDataFromSupabase(todo_id, user_id)
        } else {
            messageApi.open({
                type: 'error',
                content: trans.errorEmpty,
                duration: 5
            })
        }  
    }

    const handlePagination = (page: number) => {     
        dispatch(setCurrentPage(page))
    }

    const insertDataFromSupabase = async (id: string, user_id: string) => {
        const date = new Date(Date.now());
        try {
            const { data, error } = await supabase
            .from('Todo')
            .insert([
                {id: id, name: addText, completed: false, date: date, user_id: user_id },
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
            .order('date', {ascending: false})
            .eq('user_id', user_id)
      
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
        <Row style={{ height: '70%' }}>
            <Col span={24}  style={{ height: 'calc(100% - 60px)'}}>
                {todosPerPage.map((todo) => (
                    <Todo key={todo.id} id={todo.id} name={todo.name}></Todo>
                ))}
            </Col>

            <Col span={24} style={{textAlign: "center", marginBottom: "20px"}}>
                <Pagination simple current={currentPage} pageSize={numberOfTodosPerPage} total={todos.length} onChange={handlePagination}/>
            </Col>

            <Col span={24}>
                <Row>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input placeholder={trans.phAdd} value={addText} onChange={handleAddText}/>
                        {contextHolder}
                        <Button type="primary" onClick={handleClickAddText}>{trans.Add}</Button>
                    </Space.Compact>
                </Row>
            </Col>
        </Row>
    );
}

export default Todolist