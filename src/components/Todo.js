
export default function Todo({ el , handleDelete ,toggleCheck}) {
    return (
        <>
            <div className="task" key={el.id}>
                <div className="task-text">
                    <button onClick={() => handleDelete(el.id)}>X</button>
                    <h2>{el.text}</h2>
                </div>
                <input
                    type="checkbox"
                    checked={el.check}
                    onChange={() => toggleCheck(el.id)}
                />
            </div>
        </>
    );
}
