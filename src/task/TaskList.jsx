import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { TaskContext } from "../contexts/taskContext";
import { DELETE_TASK, FAVORITE_TASK } from "../reducers/taskReducerType";
import DeleteTaskModal from "./DeleteTaskModal";

export default function TaskList({ onEditTask }) {
  const [selectTask, setSelectTask] = useState(null);
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const { state, dispatch } = useContext(TaskContext);

  function handleSelectTask(task) {
    setSelectTask(task);
    setshowDeleteModal(true);
  }

  function handleFavorite(taskId) {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
    const newTask = [...state.tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;

    dispatch({
      type: FAVORITE_TASK,
      payload: newTask,
    });
  }

  const handleDeleteTask = (task) => {
    dispatch({
      type: DELETE_TASK,
      payload: task,
    });
    toast.error(`The task "${task.title}" is removed in the task list.`, {
      position: "bottom-right",
    });
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteTaskModal
          task={selectTask}
          onDeleteTask={handleDeleteTask}
          onCloseModal={() => setshowDeleteModal(false)}
        />
      )}
      <div className="overflow-auto">
        <table className="table-fixed overflow-auto xl:w-full">
          <thead>
            <tr>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                {" "}
                Title{" "}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                {" "}
                Description{" "}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                {" "}
                Tags{" "}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                {" "}
                Priority{" "}
              </th>
              <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]">
                {" "}
                Options{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {state.tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
              >
                <td>
                  <button onClick={() => handleFavorite(task.id)}>
                    {task.isFavorite ? (
                      <FaStar color="yellow" />
                    ) : (
                      <FaStar color="gray" />
                    )}
                  </button>
                </td>
                <td>{task.title}</td>
                <td>
                  <div>{task.description}</div>
                </td>
                <td>
                  <ul className="flex justify-center gap-1.5 flex-wrap">
                    {task.tags.map((tag) => (
                      <li key={tag}>
                        <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">
                          {tag}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-center">{task.priority}</td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => onEditTask(task)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSelectTask(task)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
