import React, {useEffect, useState} from 'react';
import '../styles/Todos.css'

const UserList = () => {
    const [user, setUser] = useState(null);
    const [next, setNext] = useState(0);
    const [todos, setTodos] = useState([]);
    const [complete] = useState(false);
    const [userId, setUserId] = useState(1);

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/');
            const data = await response.json();
            setUser(data);
        }
        getData();
    },[user]);


    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
            const data = await response.json();
            setTodos(data);
        }

        getData();
    }, [userId]);

    const handleNextUser = () => {
        if(next < 10 && next >= 0){
            setNext(next + 1);
            setUserId(userId + 1);
        }

    }
    const handleLastUser = () => {
        if(next < 10 && next >= 0){
            setNext(next - 1);
            setUserId(userId - 1);
        }
    }

    const handleAddTask = () => {
        const newTask = document.querySelector("#task").value;
        console.log('task',newTask);

        setTodos((prevState) => {
            return [...prevState, newTask];
        });

        document.querySelector("#task").value = "";
    };
    const handleDelete = (index) => {
        setTodos((prevState)=> {
            return prevState.filter((todos, i)=> i !== index);

        })
    }
    const handleComplete = (index) => {
        todos.map((todo, i) => {

            if (index === i) {
                if (!(todo.completed || complete)) {
                    //console.log('index', index);
                    //setComplete(true);
                    todo.completed = true;
                }
            }
        })
    }


    return(
        <>
            <button disabled={next<=0} onClick={handleLastUser}>Anterior usuario</button>
            <button disabled={next>=9} onClick={handleNextUser}>Siguiente usuario</button>
            <h1>Información del usuario</h1>
            {user ? (
                <ul>
                    <li><strong>Nombre: </strong>{user[next].name}</li>
                    <li><strong>Usuario: </strong>{user[next].username}</li>
                    <li><strong>Email: </strong>{user[next].email}</li>
                    <li><strong>Web: </strong>{user[next].website}</li>
                    <li><strong>Teléfono: </strong>{user[next].phone}</li>
                </ul>
            ) : (
                "Cargando los datos..."
            )}

            <label>Tarea</label>
            <input id="task" placeholder="Ingrese una tarea"/>
            <button onClick={handleAddTask}>Agregar tarea</button>

            <h1>Lista de tareas ({todos.length} en total)</h1>
            <table>
                <thead>
                <tr>
                    <td><strong>Nombre</strong></td>
                    <td ><strong>Estado</strong></td>
                    <td><strong>Eliminar</strong></td>
                </tr>
                </thead>

                <tbody>

                {todos.map((todo, indexTodo, index) => (
                    <tr key={indexTodo}>
                        <td id="todo">{todo.title || todo}</td>
                        <td key={index}>
                            <button id="complete" className={(complete || todo.completed) ? 'noComplete' : 'complete'} onClick={() => handleComplete(indexTodo)}>
                                {(complete || todo.completed) ? 'Completada' : 'Marcar como completada'}</button>

                        </td>
                        <td>
                            <button onClick={ () => handleDelete(indexTodo)}>Eliminar</button>
                        </td>
                    </tr>

                ))}
                </tbody>

            </table>
        </>
    )
}
export default UserList;
