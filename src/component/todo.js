import React, { useState, useEffect } from 'react';
import todoImg from '../images/todo.svg';


var name = 'hamdle';
var handle = 'mac';

function get_user () {
     return {
         name:name,
         handle:handle
     }
}

console.log(get_user())


const getLocalData = () => {
    let data = localStorage.getItem('items')
    if (data) {
        return JSON.parse(localStorage.getItem('items'))
    } else {
        return []
    }
}

const Todo = () => {
    const [todoData, setTodoData] = useState('')
    const [items, setItems] = useState(getLocalData());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditTodo, setIseditTodo] = useState(null);


    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

    const addItem = () => {
        console.log("addItem Call")
        if (!todoData) {
            alert('Pls add the data')
        } else if (todoData && !toggleBtn) {
            setItems(
                items.map((element) => {
                    if (element.id === isEditTodo) {
                        return { ...element, name: todoData }
                    }
                    return element
                })
            )
            setToggleBtn(true)
            setTodoData('')
            setIseditTodo(null)
        }
        else {
            const allTodoData = { id: new Date().getTime().toString(), name: todoData }
            console.log(items)
            setItems([...items, allTodoData])
            setTodoData('')

        }
    }

    const editItem = (id) => {

        const editTodoItem = items.find((element) => {
            return element.id === id
        })
        setToggleBtn(false)
        setTodoData(editTodoItem.name)
        setIseditTodo(id)
        console.log(editTodoItem)

    }

    const deleteItem = (index) => {
        console.log('deleteItem Called')
        const updateItems = items.filter((element) => {
            return index !== element.id;

        })
        setItems(updateItems)
    }

    const removeAll = () => {
        console.log('removeAll Call')
        setItems([])
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={todoImg} alt="todo-logo" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='Add Items ...'
                            value={todoData} onChange={(e) => setTodoData(e.target.value)}
                        />
                        {
                            toggleBtn ? <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> :
                                <i className="far fa-edit add-btn" title='Edit Item' onClick={addItem}></i>
                        }

                    </div>
                    <div className='showItems'>
                        {items.map((element) => {
                            return (
                                <div className='eachItem' key={element.id}>
                                    <h3>{element.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" title='Edit Item' onClick={() => editItem(element.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleteItem(element.id)}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='REMOVE ALL' onClick={removeAll}> <span> CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;