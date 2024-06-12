import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import { SnackBarContext, TodoProvider } from "./components/Context";

function App() {
    const [snackbar, setSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    // controls
    function mySnackbar(myMessage) {
        setMessage(myMessage);
        setSnackbar(true);
        setTimeout(() => {
            setSnackbar(false);
        }, 3000);
    }
    return (
        <TodoProvider>
            <div className="App">
                <SnackBarContext.Provider value={{ mySnackbar }}>
                    <Main />
                    <div className={snackbar ? "snackbar show" : "snackbar"}>
                        {message}
                    </div>
                </SnackBarContext.Provider>
            </div>
        </TodoProvider>
    );
}

export default App;
