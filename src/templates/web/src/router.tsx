import React from 'react';
import { useRoutes } from "react-router-dom";

const Home = React.lazy(() => import(/* webpackChunkName: "home" */'./view/home'));
const Test = React.lazy(() => import(/* webpackChunkName: "home" */'./view/test'));

const Route: React.FC = () => useRoutes([
    { path: "/", element: <Home /> },
    { path: "/test", element: <Test /> }
  ]);

export default Route;


