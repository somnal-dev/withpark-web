import {Navigate, useRouteError} from "react-router-dom";
import {useEffect} from "react";
import {PATH} from "../../../constants/routes.ts";

const GlobalErrorBoundary = () => {
    const error = useRouteError();

    useEffect(() => {
        if(error instanceof Error) {
            const errorMessage = `[HTTP 에러] ${error.message}`;
            console.error(errorMessage);

            return;
        }
    });

    return <Navigate to={PATH.INDEX} replace />;
}

export default GlobalErrorBoundary;