import { useState } from "react";
import icons from "../utils/icons";
import { ListFilter } from "../components";
import { useSelector } from "react-redux";
const { FaCaretDown } = icons;
const FilterTag = () => {
  const [tabActive, setTabActive] = useState();
  const genres = useSelector((state) => state.app.genres);
  const [genreFilter, setGenreFilter] = useState("Tất cả")
  const [sortFilter, setSortFilter] = useState("Tất cả")
  const [chapFilter, setChapFilter] = useState("Tất cả")
  const title = [
    {
      name: "ttitle",
    },
    {
      name: "ttitle",
    },
    {
      name: "ttitle",
    },
    {
      name: "ttitle",
    },
  ];
  const test = [
    {
      name: "test",
    },
    {
      name: "test",
    },
    {
      name: "test",
    },
    {
      name: "test",
    },
  ];
  const listTag = [
    {
      id: 1,
      label: "Thể loại",
      value: genreFilter,
      setValue: setGenreFilter,
      options: [
        ...genres
      ]
    },
    {
      id: 2,
      label: "Sắp xếp theo",
      value: sortFilter,
      setValue: setSortFilter,
      options: [
        ...title
      ]
    },
    {
      id: 3,
      label: "Chapter tối thiểu",
      value: chapFilter,
      setValue: setChapFilter,
      options: [
        ...test
      ]
    },
    {
      id: 4,
      label: "Truyện hot",
      value: "Tất cả",
      setValue: setGenreFilter,
      options: [
        ...genres
      ]
    },
  ];
  return (
    <div className="p-4 bg-color-float w-full flex gap-16 my-10 relative">
      {listTag.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => {
              if(tabActive === item.id) setTabActive('')
              else setTabActive(item.id)
            }}
          >
            <label className="text-xs text-main-text-color mb-[10px] block">
              {item.label}
            </label>
            <p className="cursor-pointer flex items-center">
              {item.value}
              <FaCaretDown className="ml-1" />
            </p>
            {
                tabActive === item.id && <ListFilter list={item.options} setValue={item.setValue}/>
            }
          </div>
        );
      })}
    </div>
  );
};

export default FilterTag;
