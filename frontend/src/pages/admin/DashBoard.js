import { useEffect, useState } from "react";
import { StatisticsCard } from "../../components";
import { apiGetAllUser, apiGetAllComic, apiGetAllChapter } from "../../apis";
import icons from "../../utils/icons";
const { FaUser, FaBookOpen, CgEreader } = icons;
const DashBoard = () => {
  const [total, setTotal] = useState({
    totalUsers: 0,
    totalComics: 0,
    totalChapters: 0,
  });
  const fetchData = async () => {
    const allUser = await apiGetAllUser();
    const allComic = await apiGetAllComic();
    const allChapter = await apiGetAllChapter();
    
    if (allUser.success) {
      setTotal((prev) => ({ ...prev, totalUsers: allUser?.mes?.length }));
    }
    if (allComic.success) {
      setTotal((prev) => ({ ...prev, totalComics: allComic?.counts }));
    }
    if (allChapter.success) {
      setTotal((prev) => ({ ...prev, totalChapters: allChapter?.mes }));
    }
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex gap-10 p-10">
      <StatisticsCard
        className={"bg-gradient-to-r from-[#FFBF96] to-[#FE7D96]"}
        total={total.totalUsers}
        icon={<FaUser />}
        title={"Total Users"}
        description={"Increased 60% compared to last month"}
      />
      <StatisticsCard
        className={"bg-gradient-to-r from-[#8FCAF9] to-[#1C8BE4]"}
        total={total.totalComics}
        icon={<FaBookOpen/>}
        title={"Total Comics"}
        description={"Increased 60% compared to last month"}
      />
      <StatisticsCard
        className={"bg-gradient-to-r from-[#83D9D2] to-[#1CCFB4]"}
        total={total.totalChapters}
        icon={<CgEreader/>}
        title={'Total Chapters'}
        description={"Increased 60% compared to last month"}
      />
    </div>
  );
};

export default DashBoard;
