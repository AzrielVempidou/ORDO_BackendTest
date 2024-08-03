import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage";
import LayOut from "../view/LayOut";
import DetailPages from "../view/DetailPages";
import PostFormPage from "../view/PostFormPage";
import UpdateFormPage from "../view/UpdateFormPage";

const router = createBrowserRouter([
  {
    element: <LayOut/>,
    children : [
      {
        path: "/",
        element: <HomePage/>
      },
      {
        path: "/form",
        element: <PostFormPage/>
      },
      {
        path: "/detail/:id",
        element: <DetailPages />
      },
      {
        path:"/edit/:id",
        element: <UpdateFormPage/>
      }
    ]
  },
])

export default router;