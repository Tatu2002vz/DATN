import { NavLink } from "react-router-dom";
import { apiGetChapters } from "../apis";
import { useEffect, useState } from "react";
const Comic = ({ comic }) => {
  const [numberChap, setNumberChap] = useState();
  const fetchLastChapter = async (id) => {
    const response = await apiGetChapters(id);
    if (response?.data?.success === true) {
      setNumberChap(response?.data?.mes?.length);
    }
  };
  useEffect(() => {
    fetchLastChapter(comic._id);
  }, [comic]);
  return (
    <NavLink className="flex flex-col justify-between" to={`/comic/${comic?.slug}/${comic?._id}`}>
      <div>
        <div className="w-full h-[330px] rounded-md overflow-hidden">
          <img
            src={comic?.coverImage}
            alt={comic?.title}
            className="rounded-md object-cover hover:scale-110 duration-300 ease-linear"
          />
        </div>
        <p className="text-sm mt-2">{comic?.title}</p>
      </div>
      <p className="text-[13px] mt-3">Chapter {numberChap}</p>
    </NavLink>
  );
};

export default Comic;
