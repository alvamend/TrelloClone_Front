const Title = ({cardInformation}) => {
return(
    <section
              className="card-section"
              style={{
                backgroundColor: cardInformation.cover,
                padding: "15px",
              }}
            >
              <div className="section-title">
                <div className="card-section-icon">
                  <img src="/img/descripcion-del-producto.png" />
                </div>
                <div>
                  <h2>{cardInformation?.title}</h2>
                  <p>
                    in List{" "}
                    <span style={{ textDecoration: "underline" }}>
                      {cardInformation?.listInfo?.title}
                    </span>
                  </p>
                </div>
              </div>
            </section>
)
}

export default Title;