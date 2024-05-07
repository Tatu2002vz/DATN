import { Header, Sidebar, Footer } from "./components";
// import { Toast } from "../../components";
const DefaultLayoutAdmin = ({ children }) => {
  return (
    <div className="grid grid-cols-7 text-white bg-mainBg">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-6 flex flex-col">
        <div className="h-[65px]">
          <Header />
        </div>
        <div className="flex-grow">{children}</div>
        <div className="">
          <Footer />
        </div>
        {/* <div className="fixed top-8 right-8 toast">
          <Toast
            status={"success"}
            message={"Anyone with access can view your invited visitors."}
          />
          <Toast
            status={"error"}
            message={"Anyone with access can view your invited visitors."}
          />
        </div> */}
      </div>
    </div>
  );
};

export default DefaultLayoutAdmin;
