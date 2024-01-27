import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { TaskContext } from "../contexts/taskContext";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

import { ADD_TASK, UPDATE_TASK } from "../reducers/taskReducerType";

export default function TaskBoard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const { state, dispatch } = useContext(TaskContext);

  const handleAddTask = (event, isAdd, task) => {
    event.preventDefault();
    if (isAdd) {
      dispatch({
        type: ADD_TASK,
        payload: task,
      });
      toast.success(`The task "${task.title}" is added in the task list.`, {
        position: "bottom-right",
      });
    } else {
      dispatch({
        type: UPDATE_TASK,
        payload: task,
      });
      toast.success(`The task "${task.title}" is updated in the task list.`, {
        position: "bottom-right",
      });
    }
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
              <SearchTask />
              <TaskAction onAddClick={() => setShowAddModal(true)} />
            </div>
          </div>
          {state.tasks.length === 0 ? (
            <NoTasksFound />
          ) : (
            <TaskList onEditTask={handleEditTask} />
          )}
        </div>
      </div>
    </section>
  );
}
