import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CardDescription = ({ cardInformation, setCardInformation }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const enableDescription = (e) => {
    document.querySelector("#change-btns").style.display = "flex";
    const txtarea = document.getElementsByName("txtdescription")[0];
    txtarea.disabled = false;
    txtarea.focus();
  };

  const changeDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `card/${cardInformation._id}`,
        {
          description: e.target.txtdescription.value,
        },
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );

      if (response.status === 200) {
        setCardInformation({
          ...cardInformation,
          description: e.target.txtdescription.value,
        });
        document.querySelector("#change-btns").style.display = "none";
        const txtarea = document.getElementsByName("txtdescription")[0];
        txtarea.disabled = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="card-section">
      <div className="section-title">
        <div className="card-section-icon">
          <img
            src="/img/descripcion-del-producto.png"
            style={{ height: "70%" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3>Description</h3>
          <p style={{ cursor: "pointer" }} onClick={enableDescription}>
            Edit
          </p>
        </div>
      </div>
      <form onSubmit={changeDescription}>
        <textarea
          className="textarea-card-description"
          name="txtdescription"
          defaultValue={cardInformation.description}
          disabled
        ></textarea>
        <div
          style={{ float: "right", display: "none", alignItems: "center" }}
          id="change-btns"
        >
          <input
            type="submit"
            style={{
              width: "100px",
              height: "30px",
              marginTop: "0",
              marginRight: "10px",
            }}
            value="save"
          />
          <button
            type="button"
            style={{ width: "100px", height: "30px", backgroundColor: "red" }}
            onClick={(e) =>
              (document.querySelector("#change-btns").style.display = "none")
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default CardDescription;
