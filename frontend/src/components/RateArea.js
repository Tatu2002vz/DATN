import { useState } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiCreateComment } from "../apis";

const { IoChatbubblesSharp, BsFillSendFill } = icons;



const RateArea = ({ amount, isComic, id }) => {
  const { isLoggingIn } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    
    if (!isLoggingIn) {
      Swal.fire({
        title: "Bạn cần đăng nhập để thực hiện chức năng này!",
        icon: "info",
      });
    } else {
      const resp = await apiCreateComment({ content: comment, isComic, id });
      if (resp?.success) {
        Swal.fire({
          title: "Thành công!",
          showConfirmButton: false,
          icon: "success",
          timer: 1000,
          position: "top-right",
        }).then(() => {
          setComment("");
        });
      }
    }
  };
  return (
    <div className="relative mb-4">
      <div className="mb-3 flex items-center text-[19px]">
        <IoChatbubblesSharp className="mr-2" />
        {amount}
        <span className="ml-2">Bình luận</span>
      </div>
      <form>
        <textarea
          className="w-full px-4 py-3 bg-[#303956] h-24 border-0 rounded-md outline-none resize-none relative"
          placeholder="Nội dung bình luận..."
          value={comment}
          onChange={(event) => handleChange(event)}
        ></textarea>
        <button
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <BsFillSendFill size={20} className="absolute bottom-3 right-3" />
        </button>
      </form>
    </div>
  );
};

export default RateArea;
