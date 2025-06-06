import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./routes/routes.tsx";
import {Suspense} from "react";
import "./index.css";
import WithParkUIProvider from "@withpark/ui/components/Provider/WithParkUIProvider";

const router = createBrowserRouter(routes)

const App = () => {
    return (
        <Suspense fallback={null}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default App;