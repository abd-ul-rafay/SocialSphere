import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api";
import { addRemoveFriend } from "../../state/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { HiUser } from 'react-icons/hi';
import { useParams } from "react-router-dom";

const UserRow = ({ _id, fullName, subTitle, imagePath, CornerWidget = () => (<HiUser className="icon" />), self = false }) => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams();
  const isProfile = userId ? true : false;

  return (
    <section className="user-row">
      <div className="user-row-first">
        <img
          src={`${BASE_URL}/assets/${imagePath}`}
          alt={fullName}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/user-profile.jpg";
          }}
        />
        <div>
          <p
            className={self ? "strong-name" : "simple-name"}
            onClick={!isProfile ? () => navigate(`/profile/${_id}`) : null}
          >
            {fullName}
          </p>
          <p className="small-text">{subTitle}</p>
        </div>
      </div>
      <CornerWidget className="icon" onClick={() => dispatch(addRemoveFriend({ _id, token }))} />
    </section>
  )
}

export default UserRow;
