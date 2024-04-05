const ListFilter = ({ list }) => {
  return <div className="w-full grid grid-cols-5 absolute top-full left-0 bg-color-float p-4 translate-y-2 delay-1000">
    {list.map((item, index) => {
        return <div key={index} className="text-sm leading-7 hover:bg-main rounded-md">{item.name}</div>
    })}
  </div>;
};

export default ListFilter;
