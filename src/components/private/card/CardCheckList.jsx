const CardCheckList = ({cardInformation}) => {
  return (
    <section className="card-section">
      <div className="section-title">
        <div className="card-section-icon">
          <img src="/img/portapapeles.png" style={{ height: "70%" }} />
        </div>
        <h3>Checklist</h3>
      </div>
      {cardInformation?.taskList.map((task) => (
        <>
          <div key={task?._id}>
            <input type="checkbox" id={`task${task._id}`} />
            <label htmlFor={`task${task._id}`}>{task.task}</label>
          </div>
        </>
      ))}
    </section>
  );
};

export default CardCheckList;
