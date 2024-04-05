import { BrowserRouter, Routes, Route } from "react-router-dom";
import publicRoute from './routes';
import {useDispatch} from "react-redux"
import { useEffect } from "react";
import {getGenres} from './store/app/asyncAction'
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])
  return (
    <BrowserRouter>
      <div className="text-white">
        <Routes>
          {publicRoute.map((item, index) => {
            const Page = item.component
            const Layout = item.layout
            return <Route
            key={index}
            path={item.pathRoute}
            element= {
              <Layout>
                <Page/>
              </Layout>
            }
            />
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
