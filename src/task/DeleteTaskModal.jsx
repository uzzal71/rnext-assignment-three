export default function DeleteTaskModal({ task, onDeleteTask, onCloseModal }) {
  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <div className="mx-auto my-20 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3">
        <div className="text-center font-semibold text-3xl">
          You are sure delete tasks
        </div>
        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            onClick={onCloseModal}
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Close
          </button>
          <button
            onClick={() => onDeleteTask(task)}
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
