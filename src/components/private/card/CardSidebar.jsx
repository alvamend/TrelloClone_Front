const CardSidebar = () => {
  const closeCard = (e) => {
    document.querySelector("#floating-card").style.display = "none";
    document.querySelector(".floating-card-background").style.display = "none";
  };

  return (
    <div className="card_sidebar">
      <p style={{ float: "right", cursor: "pointer" }} onClick={closeCard}>
        X
      </p>
      <section>
        <h4>Add to card</h4>
        <ul>
          <li>
            <p>Member</p>
            <p>Attachment</p>
            <p>Cover</p>
          </li>
        </ul>
      </section>
      <section>
        <h4>Actions</h4>
        <ul>
          <li>
            <p>Share</p>
            <p>Archive</p>
            <p>Delete</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default CardSidebar;
