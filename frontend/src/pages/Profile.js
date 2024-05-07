import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cover_profile from "../assets/cover_profile.png";
import icons from "../utils/icons";
import { InputField } from "../components";
import { useEffect, useState } from "react";
import { apiChangePassword, apiGetUser, apiUpdateUser } from "../apis";
import validate from "../utils/validate";
import { toast } from "react-toastify";
const { MdEdit } = icons;
const Profile = () => {
  const { userData, isLoggingIn } = useSelector((state) => state.user);
  console.log(isLoggingIn);
  const id = userData?._id;
  const [invalidField, setInvalidField] = useState([]);
  const navigate = useNavigate();
  const [payload, setPayload] = useState(() => {
    return {
      fullname: userData?.fullname,
      email: userData?.email,
      password: "",
      oldPassword: "",
      rePassword: "",
    };
  });
  const handleUpdateUser = async () => {
    const updateData = {
      fullname: payload.fullname,
      email: payload.email,
    };
    const invalid = validate(updateData, setInvalidField);
    if (invalid === 0) {
      const updateUserApi = await apiUpdateUser({
        payload: updateData,
        id: userData._id,
      });
      if (updateUserApi?.success) {
        toast.success("Cập nhật thành công!");
        navigate(0);
      }
    }
  };
  const handleChangePassword = async () => {
    const updateData = {
      password: payload.password,
      oldPassword: payload.oldPassword,
    };
    if (payload.password !== payload.rePassword)
      toast.info("Nhập lại mật khẩu không chính xác!");
    const invalid = validate(updateData, setInvalidField);
    if(invalid === 0) {
      const changePasswordApi = await apiChangePassword({payload: updateData})
      if(changePasswordApi?.success) toast.success("Thay đổi mật khẩu thành công!")
      else toast.error(changePasswordApi?.mes)
    }
  };
  if (!isLoggingIn) navigate("/");
  const fetchUser = async () => {
    const user = await apiGetUser(id);
    if (user.success) {
      setPayload((prev) => ({
        ...prev,
        fullname: user?.mes?.fullname,
        email: user?.mes?.email,
        // password: user?.mes?.password,
      }));
    }
  };
  useEffect(() => {
    if (id !== "new-user") {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div className="flex">
      <div className="px-4 w-full">
        <img src={cover_profile} className="w-full" alt="" />
        <div className="relative mb-32">
          <div className="border-4 border-black w-[140px] h-[140px] rounded-full flex items-center justify-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={`${process.env.REACT_APP_API_IMAGE}${userData?.avatar}`}
              alt=""
              className="w-3/4"
            />
          </div>
          <label
            htmlFor="avatar"
            className="flex items-center cursor-pointer justify-center translate-y-[80px]"
          >
            Đổi ảnh đại diện <MdEdit />
          </label>
          <input type="file" id="avatar" hidden />
        </div>
        <div className="w-[400px] mx-auto">
          <InputField
            label={"Tên hiển thị"}
            value={payload.fullname}
            setInvalidField={setInvalidField}
            payload={payload}
            invalidField={invalidField}
            setPayload={setPayload}
            namekey={"fullname"}
          />
          <InputField
            label={"Email"}
            value={payload.email}
            setInvalidField={setInvalidField}
            payload={payload}
            invalidField={invalidField}
            setPayload={setPayload}
            namekey={"email"}
          />
          <button
            className="px-4 py-2 border rounded-full mb-4 bg-gradient-to-l from-main to-purple-600"
            onClick={() => {
              handleUpdateUser();
            }}
          >
            Cập nhật
          </button>
          <p className="py-4 font-medium">Đổi mật khẩu:</p>
          <InputField
            label={"Mật khẩu cũ"}
            value={payload.oldPassword}
            setInvalidField={setInvalidField}
            payload={payload}
            invalidField={invalidField}
            setPayload={setPayload}
            namekey={"oldPassword"}
            type={"password"}
          />
          <InputField
            label={"Mật khẩu mới"}
            value={payload.password}
            setInvalidField={setInvalidField}
            payload={payload}
            invalidField={invalidField}
            setPayload={setPayload}
            namekey={"password"}
            type={"password"}
          />
          <InputField
            label={"Nhập lại mật khẩu"}
            value={payload.rePassword}
            setInvalidField={setInvalidField}
            payload={payload}
            invalidField={invalidField}
            setPayload={setPayload}
            namekey={"rePassword"}
            type={"password"}
          />
          <button
            className="px-4 py-2 border rounded-full mb-4 bg-gradient-to-l from-main to-purple-600"
            onClick={() => {
              handleChangePassword();
            }}
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
