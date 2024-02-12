import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import List from "./List";
import Card from "../card/Card";

const URL = "list";
const ListContainer = ({ boardId }) => {
  const [listArray, setListArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState("");
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getLists = async () => {
      try {
        const queryURL = `${URL}/query?b=${boardId}&s=active`;
        const response = await axiosPrivate.get(queryURL, {
          headers: {
            Authorization: auth.accessToken,
          },
        });
        if (response?.status === 200) {
          setListArray(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLists();
  }, []);

  return isLoading ? (
    ""
  ) : (
    <div className="list-container">
      <div className="divwrap">
        {listArray.map((list) => (
          <List list={list} key={list._id} setSelectedCard={setSelectedCard} />
        ))}

        <div className="btn-add-list">
          <h3>+ Create a new list</h3>
        </div>
      </div>
      <Card card={selectedCard} />
    </div>
  );
};

export default ListContainer;
