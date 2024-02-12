import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Attachments = ({ cardId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [attachmentList, setAttachmentList] = useState([]);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getAttachments = async () => {
      try {
        const response = await axiosPrivate.get(`attachment?card=${cardId}`, {
          headers: {
            Authorization: auth.accessToken,
          },
        });
        if (response.status === 200) {
          setAttachmentList(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getAttachments();
  });

  const showAttachment = async (filename) => {
    try {
      const response = await axiosPrivate.get(`attachment/file/${filename}`, {
        headers: {
          Authorization: auth.accessToken,
        },
      });
      if (response.status === 200) {
        window.open(response.data.signedUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return isLoading ? (
    ""
  ) : (
    <ul>
      {attachmentList.map((attachment) => (
        <li key={attachment._id}>
          <p style={{ fontWeight: "bold" }}>{attachment.description}</p>
          <p
            style={{ cursor: "pointer", display: "inline-block" }}
            onClick={(e) => showAttachment(attachment.filename)}
          >
            {attachment.filename}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Attachments;
