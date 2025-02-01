interface Props {
  onSubmit: () => void;
  onChangeSelect: React.ChangeEventHandler<HTMLSelectElement>;
  onChangeInput: React.ChangeEventHandler<HTMLInputElement>;
  onClick: () => void;
  ref?: React.Ref<HTMLDivElement>;
}
const FormTask: React.FC<Props> = ({
  onSubmit,
  onChangeSelect,
  onChangeInput,
  onClick,
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-4xl text-start w-full max-w-md text-gray-300">
        <h3 className="text-white text-center">Add task</h3>
        <form onSubmit={onSubmit}>
          <label>Title of task</label>
          <input
            className="mt-2 p-2 border-1 rounded w-full"
            onChange={onChangeInput}
          />
          <label>Status</label>
          <select
            className="mt-2 p-2 border-1 rounded w-full"
            onChange={onChangeSelect}
            defaultValue="incomplete"
          >
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <div className="flex justify-between mt-5">
            <button className="p-2 bg-red-600 rounded" onClick={onClick}>
              Cancel
            </button>
            <button className="p-2 bg-blue-600 rounded" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormTask;
