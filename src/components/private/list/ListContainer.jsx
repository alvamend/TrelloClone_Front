import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const URL = "list";
const ListContainer = ({ boardId }) => {
  const [listArray, setListArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="list-container">
      <div style={{display:'flex', flexWrap:'wrap'}}>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      <h1>{boardId}</h1>
      </div>
    </div>
  );
};

export default ListContainer;
