const InputField = ({label, type, onclick}) => {
  return <div className="text-[14px]">
    <div className="mb-[10px]">{label}</div>
    <input type={type} className="h-[44px] w-full px-[15px] rounded-md bg-inputBg focus:outline-none mb-5" onClick={onclick} />
  </div>;
};

export default InputField;
