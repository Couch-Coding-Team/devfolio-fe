import { createContext } from "react";
import PageNotFound from "./components/PageNotFound";
import Home from "./containers/Home";
import Project from "./containers/Project";
import Magazine from "./containers/Magazine";
import ArticlePage from "./containers/Magazine/ArticlePage";
import { PATHS } from "./constants";

export const UserContext = createContext();
export const RoutesContext = createContext([
  { path: PATHS.project.home, component: Home, exact: true },
  {
    path: PATHS.project.detail,
    component: Project,
    exact: true,
  },
  {
    path: PATHS.magazine.home,
    component: Magazine,
    exact: true,
  },
  {
    path: PATHS.magazine.detail,
    component: ArticlePage,
    exact: true,
  },
  { path: "*", component: PageNotFound },
]);
