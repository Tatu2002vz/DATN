import path from "../utils/path";
import { Chapter, ComicDetail, Home } from "../pages";
import { DefaultLayout, FullLayout } from "../layouts";
import HeaderOnly from "../layouts/HeaderOnly";
const publicRoute = [
  { pathRoute: path.HOME, component: Home, layout: DefaultLayout },
  { pathRoute: path.COMIC, component: ComicDetail, layout: HeaderOnly },
  { pathRoute: path.CHAPTER, component: Chapter, layout: FullLayout },
];

export default publicRoute;
