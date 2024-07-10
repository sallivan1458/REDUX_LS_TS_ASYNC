interface INewTodoForm {
    value: string;
    updateValue: (str:string) => void;
    handleSubmit: () => void;
}



const NewTodoForm:React.FC<INewTodoForm> = ({ value, updateValue, handleSubmit }) => {
    return (
        <label>
            <input
                placeholder='new todo'
                value={value}
                onChange={(e) => updateValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Add todo</button>
        </label>
    );
};

export default NewTodoForm;