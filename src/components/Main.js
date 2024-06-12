import Categories from "./Catagories";
import { SnackBarContext, useTodo } from "./Context";
import Todo from "./Todo";
import "./main.css";
import { useContext, useEffect, useRef, useState } from "react";

const todoStorage = JSON.parse(localStorage.getItem("todoStorage")) || [];
const idStorage = +localStorage.getItem("id") || 0;
export default function Main() {
    // states
    const { todo, dispatch } = useTodo();
    const [inputValue, setInputValue] = useState("");
    const [currentId, setCurrentId] = useState(idStorage);
    const [arrToBeRender, setArrToBeRender] = useState(todo);
    const { mySnackbar } = useContext(SnackBarContext);
    let myRef = useRef();

    // controls
    function handleAdd() {
        dispatch({
            type: "add",
            payload: { input: inputValue, id: currentId },
        });
        setCurrentId((prev) => prev + 1);
        setInputValue("");
        mySnackbar("Note has been declared");
    }
    function handleDeleteAll() {
        dispatch({ type: "deleteAll" });
        mySnackbar("All Notes has been deleted");
    }
    function handleEnterKeyPress(event) {
        if (event.key === "Enter") {
            document.querySelector(".add-todo").click();
        }
    }
    function handleDelete(index) {
        dispatch({ type: "delete", payload: { index: index } });
        mySnackbar("Note has been deleted");
    }
    function toggleCheck(index) {
        dispatch({ type: "toggle", payload: { index: index } });
    }

    // useEffect to handle initial load and focusing the input
    useEffect(() => {
        dispatch({ type: "storage", payload: { todoStorage: todoStorage } });
        myRef.current.focus();
    }, [dispatch]);

    // useEffect to update local storage when currentId or todo changes
    useEffect(() => {
        localStorage.setItem("todoStorage", JSON.stringify(todo));
        localStorage.setItem("id", currentId);
    }, [currentId, todo]);
    return (
        <>
            <div className="container">
                <div className="box">
                    <Categories
                        data={todo}
                        setArrToBeRender={setArrToBeRender}
                    />
                    <input
                        maxLength={14}
                        type="text"
                        placeholder="Write Notes"
                        className="input-todo"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        ref={myRef}
                        onKeyDown={handleEnterKeyPress}
                    />
                    <button className="add-todo" onClick={handleAdd}>
                        Add
                    </button>
                    <button
                        className="DeleteAll-todo"
                        onClick={() => handleDeleteAll()}
                    >
                        Delete All
                    </button>
                    <div className="box-tasks">
                        <div className="tasks">
                            {arrToBeRender.map((el) => (
                                <Todo
                                    el={el}
                                    key={el.id}
                                    handleDelete={handleDelete}
                                    toggleCheck={toggleCheck}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
