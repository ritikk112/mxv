import HomePage from './views/HomePage';
import ErrorPage from "./views/Error";
import Movie from "./views/Movie";
import EntitySearch from "./views/EntitySearch";
import Discover from './views/Discover';
// import MoviePage from './views/MoviePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header';
import Auth from './views/Auth';

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><HomePage /></Layout>,
    errorElement: <ErrorPage />
  },
  {
    path: "/stream/movie/:id",
    element: <Layout><Movie /></Layout>,
  },
  {
    path: "/stream/tv/:id",
    element: <Layout><Movie /></Layout>,
  },
  {
    path: "/search",
    element: <Layout><EntitySearch /></Layout>,
  },
  {
    path: "/auth",
    element: <Layout><Auth /></Layout>
  },
  {
    path: "/discover",
    element: <Layout><Discover /></Layout>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
