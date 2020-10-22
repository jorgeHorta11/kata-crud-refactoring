import React, {
  useContext,
  useReducer,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";
import Styled from "./App.module.css";
import {
  addTask,
  editTask,
  changeTaskStatus,
  deleteTask,
  updateList,
} from "./taskService";

const HOST_API = "http://localhost:8080/api";
const initialState = {
  todo: { list: [], item: {} },
};
const Store = createContext(initialState);

const Form = () => {
  const formRef = useRef(null);
  const {
    dispatch,
    state: { todo },
  } = useContext(Store);
  const item = todo.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: null,
      completed: false,
    };

    addTask(request).then((todo) => {
      dispatch({ type: "add-item", item: todo });
      setState({ name: "" });
      formRef.current.reset();
    });
  };

  const onEdit = (event) => {
    event.preventDefault();

    const request = {
      name: state.name,
      id: item.id,
      isCompleted: item.isCompleted,
    };

    editTask(request).then((todo) => {
      dispatch({ type: "update-item", item: todo });
      setState({ name: "" });
      formRef.current.reset();
    });
  };

  return (
    <form className={Styled.bodyForm} ref={formRef}>
      <input
        className={Styled.inputPrincipal}
        type="text"
        name="name"
        placeholder="¿Qué piensas hacer hoy?"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value });
        }}
      ></input>
      {item.id && <button onClick={onEdit}>Actualizar</button>}
      {!item.id && (
        <button className={Styled.btnCrear} onClick={onAdd}>
          Crear
        </button>
      )}
    </form>
  );
};

const List = () => {
  const {
    dispatch,
    state: { todo },
  } = useContext(Store);
  const currentList = todo.list;

  useEffect(() => {
    updateList().then((list) => {
      dispatch({ type: "update-list", list });
    });
  }, [dispatch]);

  const onDelete = (id) => {
    deleteTask(id).then(() => dispatch({ type: "delete-item", id }));
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo });
  };

  const onChange = (event, todo) => {
    const request = {
      name: todo.name,
      id: todo.id,
      completed: event.target.checked,
    };

    changeTaskStatus(request).then((todo) => {
      dispatch({ type: "update-item", item: todo });
    });
  };

  const decorationDone = {
    textDecoration: "line-through",
  };
  return (
    <div className={Styled.divPrincipal}>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Tarea</td>
            <td>¿Completado?</td>
          </tr>
        </thead>
        <tbody className={Styled.bodyTable}>
          {currentList.map((todo) => {
            return (
              <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onChange={(event) => onChange(event, todo)}
                  ></input>
                </td>
                <td>
                  <button
                    className={Styled.btnEliminar}
                    onClick={() => onDelete(todo.id)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    className={Styled.btnEditar}
                    onClick={() => onEdit(todo)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case "update-item":
      const todoUpItem = state.todo;
      const listUpdateEdit = todoUpItem.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      todoUpItem.list = listUpdateEdit;
      todoUpItem.item = {};
      return { ...state, todo: todoUpItem };
    case "delete-item":
      const todoUpDelete = state.todo;
      const listUpdate = todoUpDelete.list.filter((item) => {
        return item.id !== action.id;
      });
      todoUpDelete.list = listUpdate;
      return { ...state, todo: todoUpDelete };
    case "update-list":
      const todoUpList = state.todo;
      todoUpList.list = action.list;
      return { ...state, todo: todoUpList };
    case "edit-item":
      const todoUpEdit = state.todo;
      todoUpEdit.item = action.item;
      return { ...state, todo: todoUpEdit };
    case "add-item":
      const todoUp = state.todo.list;
      todoUp.push(action.item);
      return { ...state, todo: { list: todoUp, item: {} } };
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

function App() {
  return (
    <StoreProvider>
      <h3 className={Styled.container}>To-Do List</h3>
      <Form />
      <List />
    </StoreProvider>
  );
}

export default App;
