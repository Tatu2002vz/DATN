import { Header } from "../components";

const HeaderOnly = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default HeaderOnly;
