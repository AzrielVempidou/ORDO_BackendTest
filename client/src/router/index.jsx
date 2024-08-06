import { createBrowserRouter } from "react-router-dom";
import HomePage from "../view/HomePage";
import LayOut from "../view/LayOut";
import FormPages from "../view/FormPages";
import DetailPages from "../view/DetailPages";

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
        element: <FormPages/>
      },
      {
        path: "/detail/:id",
        element: <DetailPages />
      },
      {
        path:"/edit/:id",
        element: <FormPages/>
      }
    ]
  },
])

export default router;