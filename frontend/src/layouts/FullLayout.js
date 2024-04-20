import { useParams } from "react-router-dom";
import { apiGetChapter } from "../apis";
import { Header, ChapterController, Report } from "../components";
import { useEffect, useState } from "react";
import { chapterError } from "../enum/listError";
const DefaultLayout = ({ children }) => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const fetchChapter = async () => {
    const resp = await apiGetChapter(id);
    if (resp?.success) {
      setChapter(resp.mes);
    }
  };
  useEffect(() => {
    fetchChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="relative">
      <Header />
      <div className="bg-mainBg pt-[70px] pb-16 relative">
        <div className="mx-auto w-main">{children}</div>
        {showReport && (
          <Report
            setShowReport={setShowReport}
            errorComic={`Chapter ${chapter.chapNumber} - ${chapter?.comic?.title}`}
            errorReport={chapterError}
            isComic={true}
          />
        )}
      </div>
      <ChapterController chapNumber={chapter?.chapNumber} setShowReport={setShowReport} />
    </div>
  );
};

export default DefaultLayout;
