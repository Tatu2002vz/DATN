import { Header, Footer } from "../components";
const DefaultLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="bg-mainBg pt-[90px]">
        <div className="mx-auto w-main">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
