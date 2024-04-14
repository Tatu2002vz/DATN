import { NavLink, useParams, redirect, useNavigate } from "react-router-dom";
import icons from "../utils/icons";
import { apiGetChapter, apiGetChapterWithSlug } from "../apis";
import { useState, useEffect } from "react";
const {
  TiHome,
  IoMdWarning,
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  IoBookmark,
  FaCircleArrowUp,
} = icons;
const ChapterController = ({ chapNumber }) => {
  const { slug, id } = useParams();
  const [listChapters, setListChapters] = useState();
  const navigate = useNavigate();
  const fetchChapter = async () => {
    const getListChapters = await apiGetChapterWithSlug(slug);
    // const getChapNumber = await apiGetChapter(id)
    if (getListChapters?.data?.success)
      setListChapters(getListChapters?.data?.mes);
  };
  useEffect(() => {
    fetchChapter();
  }, []);
  const handleChangeSelect = (event) => {
    console.log(event.target.value);
    navigate(`/comic/chapter/${slug}/${event.target.value}`)
    navigate(0) //reload
  };
  return (
    <div className="py-3 bg-color-float fixed left-0 right-0 bottom-0 z-10">
      <div className="w-main flex items-center text-[17px] mx-auto justify-between px-2">
        <div className="flex gap-5">
          <NavLink to={"/"} className="flex items-center">
            <TiHome className="mr-1" size={20} />
            Trang chủ
          </NavLink>

          <NavLink to={"/"} className="flex items-center">
            <IoMdWarning className="mr-1" size={20} />
            Báo lỗi
          </NavLink>
        </div>
        <div className="flex">
          <NavLink to={"/"} className="flex items-center">
            <MdKeyboardArrowLeft
              className="mr-1 text-white bg-main rounded-full"
              size={40}
            />
          </NavLink>
          <select
            className="bg-[#2d334f] rounded-full px-3 py-1 outline-none"
            onChange={(event) => handleChangeSelect(event)}
          >
            {listChapters?.map((item) => {
              return item.chapNumber === chapNumber ? (
                <option key={item._id} value={item._id} selected>
                  Chapter {item.chapNumber}
                </option>
              ) : (
                <option key={item._id} value={item._id}>
                  Chapter {item.chapNumber}
                </option>
              );
            })}
          </select>
          <NavLink to={"/"} className="flex items-center">
            <MdKeyboardArrowRight
              className="ml-1 text-white bg-main rounded-full"
              size={40}
            />
          </NavLink>
        </div>
        <div className="flex gap-5">
          <NavLink to={"/"} className="flex items-center">
            <IoBookmark className="mr-1" size={20} />
            Theo dõi
          </NavLink>

          <NavLink to={"/"} className="flex items-center">
            <FaCircleArrowUp className="mr-1" size={20} />
            Lên đầu
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ChapterController;
