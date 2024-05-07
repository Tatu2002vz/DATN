import { useEffect, useState } from "react";
import { apiGetChapter, apiGetChapterWithSlug, apiGetComicFilter, apiGetCommentWithChapter } from "../apis";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Comment, RateArea } from "../components";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_URL_SERVER, {
  query: { isComic: false },
}); // khởi tạo 1 lần
const Chapter = () => {
  const [chapter, setChapter] = useState(null);
  const [comments, setComments] = useState("");
  const [comic, setComic] = useState(null)
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const fetchChapter = async () => {
    const res = await apiGetChapter(id);
    if (res?.status === 401) {
      navigate("/");
    }
    if (res?.success === true) setChapter(res?.mes);
    const getComments = await apiGetCommentWithChapter(id);
    if (getComments?.success) {
      setComments(getComments?.mes);
    }
    

    const getComic  = await apiGetComicFilter({slug: slug})
    if(getComic?.success) setComic(getComic?.mes);
  };
  useEffect(() => {
    fetchChapter();
    socket.on("refreshCmt", (data) => {
      setComments(data?.mes);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative pb-16">
      <div className="flex mt-5">
        <Breadcrumbs comic={comic && comic[0]} chapNumber={chapter?.chapNumber} />
      </div>
      <h1 className="text-center text-xl py-[30px]">
        {chapter?.comic?.title} - Chapter {chapter?.chapNumber}
      </h1>
      {chapter?.images.map((item, index) => {
        return (
          <img
            key={index}
            // src={`${process.env.REACT_APP_API_IMAGE}${item}`}
            src={
              item.includes("http")
                ? item
                : `${process.env.REACT_APP_API_IMAGE}${item}`
            }
            alt=""
            className="px-1 md:max-w-3xl mx-auto w-full object-cover"
          />
        );
      })}
      <div className="p-4 px-[10px] min-[1300px]:px-0">
        <RateArea
          data={comments.length}
          isComic={false}
          id={id}
          socket={socket}
        />
      </div>
      {comments.length > 0 && (
        <div className="py-4 px-[10px] min-[1300px]:px-0">
          {comments?.map((item, index) => {
            return <Comment key={index} data={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Chapter;
