import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { dataUser, isLoggingIn } = useSelector((state) => state.user);
  if (!isLoggingIn) navigate("/");
  return <div className="min-h-fs"></div>;
};

export default Profile;
