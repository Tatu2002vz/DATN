import { Header, Footer } from "../components";
const DefaultLayout = ({ children }) => {
  return (
    <div className="">
      <Header />
      <div className="bg-mainBg pt-[90px]">
        <div className="max-w-main mx-auto">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
