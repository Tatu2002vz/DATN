import Comic from "./Comic";

const SearchResult = ({data}) => {
  return <div className="w-full max-h-[400px] absolute rounded-md overflow-y-auto flex flex-col gap-[1px] bg-black">
    {data?.map((item, index) => {
      return <Comic comic={item} key={index} isResult={true}/>
    })}
  </div>;
};

export default SearchResult;
