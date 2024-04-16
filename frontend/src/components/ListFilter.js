import { useContext } from "react";
import { comicContext } from "../pages/Home";
import { apiGetComicFilter } from "../apis";
const ListFilter = ({ list, setValue }) => {
  const { setComics } = useContext(comicContext);

  
  const handleClick = async ({id, name}) => {
    console.log(name);
    setValue(name)
    const filter = {
      genre: id
    }
    const comicApi = await apiGetComicFilter(filter)
    setComics(comicApi?.mes)
  }

  return <div className="w-full grid grid-cols-5 absolute top-full left-0 bg-color-float p-4 translate-y-2 delay-1000">
    {list.map((item, index) => {
        return <div onClick={() => {
          const data = {
            id: item._id,
            name: item.name,
          }
          handleClick(data)
        }} key={index} className="text-sm leading-7 hover:bg-main rounded-md cursor-pointer">{item.name}</div>
    })}
  </div>;
};

export default ListFilter;
