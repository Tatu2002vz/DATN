import { useEffect, useState } from "react";
import { apiGetChapter, apiGetCommentWithChapter } from "../apis";
import { useNavigate, useParams } from "react-router-dom";
import {Comment, RateArea} from '../components'
const Chapter = () => {
  const [chapter, setChapter] = useState(null);
  const [comments, setComments] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchChapter = async () => {
    const res = await apiGetChapter(id);
    if (res?.status === 401) {
      navigate("/");
    }
    if (res?.success === true) setChapter(res?.mes);
    const getComments = await apiGetCommentWithChapter(id)
    if(getComments?.success) {
      setComments(getComments?.mes)
    }
  };
  useEffect(() => {
    fetchChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative pb-16">
      <h1 className="text-center text-xl py-[30px]">
        {chapter?.comic?.title} - Chapter {chapter?.chapNumber}
      </h1>
      {chapter?.images.map((item, index) => {
        return (
          <img
            key={index}
            src={`${process.env.REACT_APP_API_IMAGE}${item}`}
            alt=""
            className="max-w-3xl mx-auto"
          />
        );
      })}
      <RateArea data={comments.length} isComic={false} id={id}/>
      {comments.length > 0 && <div className="py-4">
          {comments?.map((item, index) => {
            return <Comment key={index} data={item} />;
          })}
        </div>}
    </div>
  );
};

export default Chapter;
