import icons from "../utils/icons";
const { IoChatbubblesSharp, BsFillSendFill } = icons;
const RateArea = ({ object }) => {
  return (
    <div className="relative">
      <div className="mb-3 flex items-center text-[19px]">
        <IoChatbubblesSharp className="mr-2" />
        {object?.ratings?.length}
        <span className="ml-2">Bình luận</span>
      </div>
      <textarea
        className="w-full px-4 py-3 bg-[#303956] h-24 border-0 rounded-md outline-none resize-none relative"
        placeholder="Nội dung bình luận..."
      ></textarea>
      <button
        onClick={(event) => {
          event.defaultPrevented();
        }}
      >
        <BsFillSendFill size={20} className="absolute bottom-3 right-3" />
      </button>
    </div>
  );
};

export default RateArea;
