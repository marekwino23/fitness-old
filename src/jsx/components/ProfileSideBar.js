import imageDefault from "../../images/profile/5856.jpg";

const ProfileSideBar = ({ typePerson, data, onClick }) => {
  console.log(typePerson);
  return (
    <div className="side-bar-result-list">
      {data.map((result, index) => (
        <div
          key={index}
          style={{ cursor: "pointer" }}
          onClick={(e) => onClick(e, result.id)}
          className="side-bar-result"
        >
          {result.customer_file !== "null" && result.trainer_file !== "null" ? (
            <img
              src={
                typePerson === "client"
                  ? result.customer_file
                  : result.trainer_file
              }
              className="sidebar-box-element-image"
              height={60}
              width={60}
              alt="1"
            />
          ) : (
            <img
              src={imageDefault}
              className="sidebar-box-element-image"
              height={60}
              width={60}
              alt="1"
            />
          )}
          <div>
            {typePerson === "client" ? (
              <span style={{ fontSize: "12px" }}>{result.customer_name}</span>
            ) : (
              <span style={{ fontSize: "12px" }}>{result.name}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileSideBar;
