import { useParams } from "react-router-dom";
import { apiGetChapter } from "../apis";
import { Header, ChapterController } from "../components";
import { useEffect, useState } from "react";
const DefaultLayout = ({ children }) => {
  const {id} = useParams()
  const [chapNumber, setChapNumber] = useState(null)
  const fetchChapter = async() => {
    const resp = await apiGetChapter(id)
    if(resp.data?.success) {
      setChapNumber(resp.data.mes?.chapNumber)
    }
  }
  useEffect(() => {
    fetchChapter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="relative">
      <Header />
      <div className="bg-mainBg pt-[70px]">
        <div className="mx-auto w-main">
          {children}
        </div>
      </div>
      <ChapterController chapNumber={chapNumber} />
    </div>
  );
};

export default DefaultLayout;
