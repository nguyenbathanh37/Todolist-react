import { Checkbox, Modal, Input } from 'antd';
import { useState } from 'react';
import { Row, Button, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteTodo, editTodo, checkedTodo, selectTodosPerPage, setCurrentPage, selectCurrentPage, selectTodos } from '../Todolist/todoListSlice';
import supabase from '../../supabase/supabase.config';
import { selectTranslation } from '../../i18n/i18nSlice';

type TodoProps = {
    id: string,
    name: string
}

const Todo: React.FC<TodoProps> = ({id, name}) => {
    const todos = useSelector(selectTodos)
    const todosPerPage = useSelector(selectTodosPerPage)
    const currentPage = useSelector(selectCurrentPage)
    const trans = useSelector(selectTranslation)
    const dispatch: AppDispatch = useDispatch()
    
    const completed = todos.find(todo => todo.id === id)?.completed
    const oldNameTodo = todos.find(todo => todo.id === id)?.name
    const [checked, setChecked] = useState<boolean | undefined>(completed)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editText, setEditText] = useState<any>(oldNameTodo)

    const onChange = () => {
        setChecked(!checked)
        dispatch(checkedTodo({id: id, completed: !checked}))
        editCompletedFromSupabase()
    }

    const editCompletedFromSupabase = async () => {
        try {
            const { data, error } = await supabase
            .from('Todo')
            .update({ completed: !checked })
            .eq('id', id)
            
            if (error) {
                console.error('Error edit completed:', error.message)
            }
        } catch (error) {
            console.error('Unexpected error:', error)
        }
    }

    const handleClickDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
        deleteDataFromSupabase()

        if (todosPerPage.length == 1) {
            dispatch(setCurrentPage(currentPage-1))
        }
    }

    const deleteDataFromSupabase = async () => {
        try {
            const { error } = await supabase
            .from('Todo')
            .delete()
            .eq('id', id)
            
            if (error) {
                console.error('Error delete data:', error.message)
            }
        } catch (error) {
            console.error('Unexpected error:', error)
        }
    }

    const handleClickEditTodo = () => {
        setIsModalOpen(true)
    }

    const editDataFromSupabase = async () => {
        try {
            const { data, error } = await supabase
            .from('Todo')
            .update({ name: editText })
            .eq('id', id)
            
            if (error) {
                console.error('Error edit data:', error.message)
            }
        } catch (error) {
            console.error('Unexpected error:', error)
        }
    }

    const handleOk = () => {
        dispatch(editTodo({id: id, name: editText}))
        editDataFromSupabase()
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
                    {trans.Edit}
                </Button>
                <Modal title="Edit Todo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input value={editText} onChange={handleChangeEditText}/>
                </Modal>
                <Button type="primary" danger onClick={() => handleClickDeleteTodo(id)}>
                    {trans.Delete}
                </Button>
            </Col>
        </Row>
    );
}

export default Todo;