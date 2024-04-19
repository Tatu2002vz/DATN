import { NavLink, useParams, useNavigate } from "react-router-dom";
import icons from "../utils/icons";
import { apiGetChapterWithSlug } from "../apis";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const {
  TiHome,
  IoMdWarning,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  IoBookmark,
  FaCircleArrowUp,
} = icons;
const ChapterController = ({ chapNumber, setShowReport }) => {
  const { slug } = useParams();
  const [listChapters, setListChapters] = useState();
  const navigate = useNavigate();
  const fetchChapter = async () => {
    const getListChapters = await apiGetChapterWithSlug(slug);
    // const getChapNumber = await apiGetChapter(id)
    if (getListChapters?.success) setListChapters(getListChapters?.mes);
  };
  useEffect(() => {
    fetchChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleChangeSelect = (event) => {
    console.log(event.target.value);
    navigate(`/comic/chapter/${slug}/${event.target.value}`);
    navigate(0); //reload
  };
  const handleNextChap = (next) => {
    let nextChapNumber
    if (next) {
      nextChapNumber = chapNumber + 1;
      
    } else {
      nextChapNumber = chapNumber - 1;
    }
    const nextChapter = listChapters.find(
      (item) => item.chapNumber === nextChapNumber
    )?._id;
    if(nextChapter) {
      navigate(`/comic/chapter/${slug}/${nextChapter}`);
      navigate(0); //reload

    } else {
      Swal.fire({
        title: 'Đã hết chapter rồi bạn ơi!',
        icon: 'info'
      })
    }
  };
  return (
    <div className="py-3 bg-color-float fixed left-0 right-0 bottom-0 z-10">
      <div className="w-main flex items-center text-[17px] mx-auto justify-between px-2">
        <div className="flex gap-5">
          <NavLink to={"/"} className="flex items-center">
            <TiHome className="mr-1" size={20} />
            Trang chủ
          </NavLink>

          <div className="flex items-center cursor-pointer" onClick={() => {setShowReport(true)}}>
            <IoMdWarning className="mr-1" size={20} />
            Báo lỗi
          </div>
        </div>
        <div className="flex">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              handleNextChap(false);
            }}
          >
            <MdKeyboardArrowLeft
              className="mr-1 text-white bg-main rounded-full"
              size={40}
            />
          </div>
          <select
            className="bg-[#2d334f] rounded-full px-3 py-1 outline-none"
            onChange={(event) => handleChangeSelect(event)}
          >
            {listChapters?.map((item) => {
              return item.chapNumber === chapNumber ? (
                <option
                  className="px-3 py-1"
                  key={item._id}
                  value={item._id}
                  selected
                >
                  Chapter {item.chapNumber}
                </option>
              ) : (
                <option className="px-3 py-1" key={item._id} value={item._id}>
                  Chapter {item.chapNumber}
                </option>
              );
            })}
          </select>
          <div
            to={"/"}
            className="flex items-center cursor-pointer"
            onClick={() => {
              handleNextChap(true);
            }}
          >
            <MdKeyboardArrowRight
              className="ml-1 text-white bg-main rounded-full"
              size={40}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <NavLink to={"/"} className="flex items-center">
            <IoBookmark className="mr-1" size={20} />
            Theo dõi
          </NavLink>

          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              document.body.scrollTop = 0; // For Safari
              document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            }}
          >
            <FaCircleArrowUp className="mr-1" size={20} />
            Lên đầu
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterController;
