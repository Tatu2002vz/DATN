import { useState } from "react";
import logo from "../assets/logo.png";
import { Button, Login } from "../components/";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState();
  const showForm = () => {
    setIsShow(true);
  };
  return (
    <header className="bg-headerBg h-[70px] text-[15px] fixed left-0 right-0 top-0 z-10">
      {isShow && <Login setIsShow={setIsShow} active={active} setActive={setActive} />}
      <div className="max-w-screen-xl mx-auto flex items-center h-full justify-between">
        <div className="flex justify-center items-center">
          <img src={logo} alt="" className="h-[30px] w-auto" />
          <input
            type="text"
            placeholder="Bạn muốn tìm truyện gì"
            className="rounded-full w-[400px] h-[44px] bg-inputBg pl-5 focus:outline-none ml-5"
          />
        </div>
        <div className="flex">
          <Button
            text={"Đăng ký"}
            css={"border-main"}
            onClick={() => {
              showForm();
              setActive(true)
            }}
          ></Button>
          <Button
            text={"Đăng nhập"}
            css={"bg-main border-main ml-5"}
            onClick={() => {
              showForm();
              setActive(false)
            }}
          ></Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
