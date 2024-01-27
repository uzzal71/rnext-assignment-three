import { useReducer } from "react";
import { ToastContainer } from "react-toastify";
import { TaskContext } from "./contexts/taskContext";
import { initialState, taskReducer } from "./reducers/taskReducer";

import "react-toastify/dist/ReactToastify.css";

import Page from "./Page";

function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      <Page />
      <ToastContainer />
    </TaskContext.Provider>
  );
}

export default App;
