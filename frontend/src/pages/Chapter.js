import { useEffect, useState } from "react";
import {apiGetChapter} from '../apis'
import { useNavigate, useParams } from "react-router-dom";

const Chapter = () => {
  const [chapter, setChapter]  = useState(null)
  const {id} = useParams();
  const navigate = useNavigate()
  const fetchChapter = async() => {
    const res = await apiGetChapter(id)
    if(res?.status === 401) {
      navigate('/')
    }
    if(res?.success === true) setChapter(res?.mes)
  }
  useEffect(() => {
    fetchChapter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className="relative">
    <h1 className="text-center text-xl py-[30px]">{chapter?.comic?.title} - Chapter {chapter?.chapNumber}</h1>
    {chapter?.images.map((item, index) => {
      return <img key={index} src={`${process.env.REACT_APP_API_IMAGE}${item}`} alt="" className="max-w-3xl mx-auto"/>
    })}
  </div>;
};

export default Chapter;
