import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CardSidebar = ({ cardInformation = {} }) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    window.onclick = function(event){
      const closeAdd = document.querySelector('#close-add');
      if(event.target === closeAdd){
        document.querySelector('#add-attachment').style.display = 'none'
      }
    }
  },[])

  const closeCard = (e) => {
    document.querySelector("#floating-card").style.display = "none";
    document.querySelector(".floating-card-background").style.display = "none";
  };

  console.log(cardInformation);

  const addFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);
    formData.append("description", e.target.description.value);

    try {
      const response = await axiosPrivate.post(
        `attachment/card=${cardInformation._id}`,
        formData,
        {
          headers: {
            Authorization: auth.accessToken,
          },
        }
      );
      if (response.status === 201) {
        document.querySelector("#add-attachment").style.display = "none";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card_sidebar">
      <p style={{ float: "right", cursor: "pointer" }} onClick={closeCard}>
        X
      </p>
      <section>
        <h4>Add to card</h4>
        <ul className="card-sidebar-list">
          <li className="card-sidebar-listitem">
            <div className="card-sidebar-icon">
              <img src="/img/usuario.png" />
            </div>
            <p>Member</p>
          </li>
          <li
            className="card-sidebar-listitem"
            onClick={(e) => {
              document.querySelector("#add-attachment").style.display = "block";
            }}
          >
            <div className="card-sidebar-icon">
              <img src="/img/adjunto-archivo.png" />
            </div>
            <p>Attachment</p>
            <div id="add-attachment">
              <p style={{ float: "right" }} id="close-add">X</p>
              <h4>Add attachment</h4>
              <form encType="multipart/form-data" onSubmit={addFile}>
                <label htmlFor="file">File</label>
                <input type="file" name="file" />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  style={{ textAlign: "start", width: "100%" }}
                />
                <input type="submit" value="Add" style={{ width: "100%" }} />
              </form>
            </div>
          </li>
          <li className="card-sidebar-listitem">
            <div className="card-sidebar-icon">
              <img src="/img/pintura.png" />
            </div>
            <p>Cover</p>
          </li>
        </ul>
      </section>
      <section>
        <h4>Actions</h4>
        <ul>
          <li className="card-sidebar-listitem">
            <div className="card-sidebar-icon">
              <img src="/img/compartir.png" />
            </div>
            <p>Share</p>
          </li>
          <li className="card-sidebar-listitem">
            <div className="card-sidebar-icon">
              <img src="/img/bandeja-de-entrada.png" />
            </div>
            <p>Archive</p>
          </li>
          <li className="card-sidebar-listitem">
            <div className="card-sidebar-icon">
              <img src="/img/borrar.png" />
            </div>
            <p>Delete</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CardSidebar;
