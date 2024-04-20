import { NavLink, useParams } from "react-router-dom";
import { apiGetComic, apiGetCommentWithComic } from "../apis";
import { useEffect, useState } from "react";
import icons from "../utils/icons";
import { apiGetChapters } from "../apis/chapter";
import { RateArea, ChapterList, Report, Comment } from "../components";
import { comicError } from "../enum/listError";
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
  RiMoneyDollarCircleFill,
} = icons;

const ComicDetail = () => {
  const { id, slug } = useParams();
  const [comic, setComic] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [comments, setComments] = useState(null);
  console.log(comments);
  const fetchComic = async () => {
    const comicApi = await apiGetComic(id);
    const chaptersApi = await apiGetChapters(id);
    const getComments = await apiGetCommentWithComic(id);
    if (comicApi?.success) {
      setComic(comicApi?.mes);
    } else {
      console.log(comicApi?.mes);
    }
    if (chaptersApi?.success) {
      setChapters(chaptersApi?.mes);
    } else {
      console.log(chaptersApi?.mes);
    }
    if (getComments?.success) {
      setComments(getComments?.mes);
    } else {
      console.log(getComments?.mes);
    }
  };
  useEffect(() => {
    fetchComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-mainBg relative pb-6">
      <div className="h-[350px] overflow-hidden absolute top-0 left-0 w-full z-0">
        <img
          src={comic?.coverImage}
          alt=""
          className="w-full object-cover blur-xl opacity-50"
        />
      </div>
      <p className="text-base pt-7 mb-5 w-main mx-auto text-white z-10">
        BreadCrumb
      </p>
      <div className="p-[25px] bg-color-float w-main mx-auto z-1 relative text-sm rounded-b-md">
        <div className="flex mb-10">
          <img
            src={comic?.coverImage}
            alt="avatar"
            className="w-[190px] mr-[25px]"
          />
          <div className="w-full">
            <h1 className="text-2xl">{comic?.title}</h1>
            <div className="my-3">
              {comic?.genre?.map((item, index) => {
                return (
                  <span key={index} className="px-2 py-1 bg-[#4A5693] mr-2">
                    {item?.name}
                  </span>
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
              <NavLink
                to={
                  comic
                    ? `/comic/chapter/${slug}/${
                        chapters[chapters.length - 1]._id
                      }`
                    : ""
                }
                className="bg-main rounded-full px-5 flex items-center mr-2"
              >
                <BiSolidBook className="mr-1" />
                Đọc từ đầu
              </NavLink>
              <div className="rounded-full px-5 py-2 bg-[#222F5C] mr-2 flex items-center">
                <IoBookmark className="mr-1" />
                Theo dõi
              </div>
              <div
                className=" rounded-full px-5 py-2 bg-[#222F5C] mr-2 flex cursor-pointer items-center"
                onClick={() => {
                  setShowReport(true);
                }}
              >
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
            <div className="grid grid-cols-5 border-b border-chapter-border-color">
              <div className="col-span-2 font-bold py-3 pl-2">Chapter</div>
              <div className="col-span-1 font-bold py-3 pl-2">Cập nhật</div>
              <div className="col-span-1 font-bold py-3 pl-2">
                <IoEye />
              </div>
              <div className="col-span-1 font-bold py-3 pl-2">
                <RiMoneyDollarCircleFill />
              </div>
            </div>
            {chapters?.map((item, index) => (
              <ChapterList
                key={index}
                slug={slug}
                data={item}
                coverImage={comic?.coverImage}
              />
            ))}
          </div>
        </div>
        <RateArea amount={comments?.length} isComic={true} id={id} />
        <div className="py-4">
          {comments?.map((item, index) => {
            return <Comment key={index} data={item} />;
          })}
        </div>
      </div>
      {showReport && (
        <Report
          setShowReport={setShowReport}
          errorComic={comic?.title}
          errorReport={comicError}
          isComic={true}
        />
      )}
    </div>
  );
};

export default ComicDetail;
