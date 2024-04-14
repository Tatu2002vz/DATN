import { useState } from "react";
import icons from "../utils/icons";
const { TbEye, TbEyeClosed } = icons;
const InputField = ({ label, type, payload, setPayload, namekey, value }) => {
  const [hide, setHide] = useState(true);
  const handleShowPassword = () => {
    setHide(!hide);
  };
  return (
    <div className="text-[14px] relative">
      <div className="mb-[10px]">{label}</div>
      <input
        type={hide && type ? "password" : "text"}
        className="h-[44px] w-full px-[15px] rounded-md bg-inputBg focus:outline-none mb-5"
        onChange={(event) =>
          setPayload(prev => ({ ...prev, [namekey]: event.target.value }))
        }
        value={value}
      />
      {type && (
        <div
          className="absolute bottom-8 right-2"
          onClick={() => handleShowPassword()}
        >
          {hide ? <TbEyeClosed size={20} /> : <TbEye size={20} />}
        </div>
      )}
    </div>
  );
};

export default InputField;
