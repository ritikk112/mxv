import HomePage from './views/HomePage';
import ErrorPage from "./views/Error";
import Movie from "./views/Movie";
import EntitySearch from "./views/EntitySearch";
// import MoviePage from './views/MoviePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/stream/movie/:id",
    element: <Movie />,
  },
  {
    path: "/search",
    element: <EntitySearch />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
