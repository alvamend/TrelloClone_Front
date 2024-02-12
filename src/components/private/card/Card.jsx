import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import CardSidebar from "./CardSidebar";
import Attachments from "../attachment/Attachments";
import CardCheckList from "./CardCheckList";
import Title from "./Title";
import CardDescription from "./Description";

const Card = ({ card = "" }) => {
  const [cardInformation, setCardInformation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (card !== "") {
      const getData = async () => {
        try {
          const response = await axiosPrivate.get(`card/${card}`, {
            headers: {
              Authorization: auth.accessToken,
            },
          });

          if (response?.status === 200) {
            setCardInformation(response.data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getData();

      return () => {
        setCardInformation({});
        setIsLoading(true);
      };
    }
  }, [card]);

  return (
    <div className="floating-card-background">
      {isLoading ? (
        ""
      ) : (
        <div id="floating-card">
          <div className="card-content">
            <Title cardInformation={cardInformation} />
            <CardDescription cardInformation={cardInformation} />
            <CardCheckList cardInformation={cardInformation} />

            <section className="card-section">
              <div className="section-title">
                <div className="card-section-icon">
                  <img
                    src="/img/adjunto-archivo.png"
                    style={{ height: "70%" }}
                  />
                </div>
                <h3>Attachments</h3>
              </div>
              <Attachments cardId={card} />
            </section>
          </div>

          <CardSidebar cardInformation={cardInformation} />
        </div>
      )}
    </div>
  );
};

export default Card;
