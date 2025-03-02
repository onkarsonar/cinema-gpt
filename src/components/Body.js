import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import ErrorPage from "./Error";

const Body = () => {
 
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
            errorElement: <ErrorBoundary />,
        },
        {
            path:"/browse",
            element:<Browse/>,
            errorElement: <ErrorBoundary />,
        },
        {
            path: "/error",
            element: <ErrorBoundary />,
          },
    ]);

  

    return (
        <div>
        <RouterProvider router = {appRouter}/>
        </div>
    );
}

export default Body;