import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Card from "../card/Card";

const List = ({ list, setSelectedCard }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cardList, setCardList] = useState([]);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCards = async () => {
      try {
        const URL = `card/query?l=${list._id}&s=active`;
        const response = await axiosPrivate.get(URL, {
          headers: {
            Authorization: auth.accessToken,
          },
        });
        if (response?.status === 200) {
          setCardList(response?.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCards();

    return () => {
      setCardList([]);
      setIsLoading(true);
    };
  }, []);

  return isLoading ? (
    ""
  ) : (
    <>
      <div className="list">
        <div className="list-header">
          <h3>{list.title}</h3>
        </div>
        <div className="list-content">
          {cardList.map((card) => (
            <div
              key={card._id}
              className="card_div"
              onClick={(e) => {
                setSelectedCard(card._id);
                document.querySelector('.floating-card-background').style.display = 'block';
                document.querySelector("#floating-card").style.display =
                  "grid";
              }}
            >
              <p style={{ color: "white" }}>{card.title}</p>
            </div>
          ))}
        </div>
        <div className="list-footer">
          <h3>+ Add a card</h3>
        </div>
      </div>
    </>
  );
};

export default List;
