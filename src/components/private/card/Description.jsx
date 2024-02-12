const CardDescription = ({cardInformation}) => {
  return (
    <section className="card-section">
      <div className="section-title">
        <div className="card-section-icon">
          <img
            src="/img/descripcion-del-producto.png"
            style={{ height: "70%" }}
          />
        </div>
        <h3>Description</h3>
      </div>
      <p style={{ marginTop: "15px" }}>{cardInformation?.description}</p>
    </section>
  );
};

export default CardDescription;
