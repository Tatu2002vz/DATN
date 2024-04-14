import { NavLink, useParams } from "react-router-dom";
import { apiGetComic } from "../apis";
import { useEffect, useState } from "react";
import icons from "../utils/icons";
import { apiGetChapters } from "../apis/chapter";
import { RateArea } from "../components";
const {
  HiStatusOnline,
  GrUpdate,
  IoEye,
  IoBookmark,
  BiSolidBook,
  IoMdWarning,
  IoLogoFacebook,
  RiInformationFill,
  TfiMenuAlt,
} = icons;

const ComicDetail = () => {
  const { id, slug } = useParams();
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState(null);
  const fetchComic = async () => {
    const comicApi = await apiGetComic(id);
    const chaptersApi = await apiGetChapters(id);
    if (comicApi?.data?.success) {
      setComic(comicApi?.data?.mes);
    } else {
      console.log(comicApi?.data?.mes);
    }
    if (chaptersApi?.data?.success) {
      setChapters(chaptersApi?.data?.mes);
    } else {
      console.log(chaptersApi?.data?.mes);
    }
  };
  useEffect(() => {
    fetchComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-mainBg relative h-[1400px]">
      <div className="h-[350px] overflow-hidden absolute top-0 left-0 w-full z-0">
        <img
          src={comic?.coverImage}
          alt=""
          className="w-full object-cover blur-xl opacity-50"
        />
      </div>
      <p>BreadCrumb</p>
      <div className="p-[25px] bg-color-float w-main mx-auto z-1 relative top-32 text-sm">
        <div className="flex mb-10">
          <img
            src={comic?.coverImage}
            alt="avatar"
            className="w-[190px] mr-[25px]"
          />
          <div className="w-full">
            <h1 className="text-2xl">{comic?.title}</h1>
            <div className="my-3">
              {comic?.genre?.map((item) => {
                return (
                  <span className="px-2 py-1 bg-[#4A5693]">{item?.name}</span>
                );
              })}
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/6 flex items-center">
                <HiStatusOnline className="mr-1" />
                Tình trạng
              </p>
              <p className="">Đang cập nhật</p>
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/6 flex items-center">
                <GrUpdate className="mr-1" />
                Cập nhật
              </p>
              <p className="">0 phút trước</p>
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/6 flex items-center">
                <IoEye className="mr-1" />
                Lượt xem
              </p>
              <p className="">{comic?.viewCount}</p>
            </div>
            <div className="flex my-3 flex-row w-full">
              <p className="mr-6 basis-1/6 flex items-center">
                <IoBookmark className="mr-1" />
                Lượt theo dõi
              </p>
              <p className="">178</p>
            </div>
            <div className="flex my-4">
              <div className="bg-main rounded-full px-5 flex items-center mr-2">
                <BiSolidBook className="mr-1" />
                Đọc từ đầu
              </div>
              <div className="rounded-full px-5 py-2 bg-[#222F5C] mr-2 flex items-center">
                <IoBookmark className="mr-1" />
                Theo dõi
              </div>
              <div className=" rounded-full px-5 py-2 bg-[#222F5C] mr-2 flex  items-center">
                <IoMdWarning className="mr-1" />
                Báo lỗi
              </div>
              <div className=" rounded-full px-5 py-2 bg-[#222F5C] mr-2 flex  items-center">
                <IoLogoFacebook className="mr-1" />
                Share
              </div>
            </div>
          </div>
        </div>
        <div className="mb-10">
          <div className="mt-5 mb-3 text-[19px] flex items-center">
            <RiInformationFill className="mr-2" />
            Giới thiệu
          </div>
          <p className="text-sm">{comic?.description}</p>
        </div>
        <div className="mb-10">
          <h2 className="text-[19px] flex items-center mb-3">
            <TfiMenuAlt className="mr-2" />
            Danh sách chương
          </h2>
          <div className="h-[500px] w-full overflow-auto border border-chapter-border-color rounded-md">
            <div className="grid grid-cols-4 border-b border-chapter-border-color">
              <div className="col-span-2 font-bold py-3 pl-2">Chapter</div>
              <div className="col-span-1 font-bold py-3 pl-2">Cập nhật</div>
              <div className="col-span-1 font-bold py-3 pl-2">
                <IoEye />
              </div>
            </div>
            {chapters?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="grid grid-cols-4 border-b border-chapter-border-color"
                >
                  {item.price === 0 ? <NavLink
                    to={`/comic/chapter/${slug}/${item._id}`}
                    className="col-span-2 font-bold py-3 pl-2 cursor-pointer"
                  >
                    Chapter {item.chapNumber}
                  </NavLink> : <NavLink
                    to={`/comic/chapter/${slug}/${item._id}`}
                    className="col-span-2 font-bold py-3 pl-2 cursor-pointer text-red-600"
                  >
                    Chapter {item.chapNumber}
                  </NavLink>} 
                  <div className="col-span-1 text-label-text-color py-3 pl-2">
                    0 phút trước
                  </div>
                  <div className="col-span-1 text-label-text-color py-3 pl-2">
                    {item.viewCount || 0}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <RateArea object={comic} />
      </div>
    </div>
  );
};

export default ComicDetail;
