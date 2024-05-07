import bee_chibi from "../assets/bee_chibi.png";


const Notification = ({data, className}) => {
  return (
    <div className={`absolute top-full right-0 py-2 bg-chapter-border-color flex flex-col justify-center translate-y-2 rounded-lg w-[450px] ${className}`}>
      <div className="border-b-[#3b4c89] border-b px-4 py-2">Thông báo</div>
      <div className="h-[500px]">
        <div className="py-[100px] flex flex-col items-center justify-center">
          <img src={bee_chibi} alt="" className="" />
          <div className="mt-4">{data ? data : 'Bạn không có thông báo nào'}</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
