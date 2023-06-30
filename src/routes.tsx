import React from "react";

// Admin Imports
import Contracts from "views/admin/contracts";
import Settlements from "./views/admin/settlements";
import Helpers from "./views/admin/helpers";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdEmojiPeople,
  MdHandshake,
  MdBarChart,
  MdLock,
} from "react-icons/md";


const routes = [
  {
    name: "도우미 구인",
    layout: "/admin",
    path: "default",
    icon: <MdEmojiPeople className="h-6 w-6" />,
    component: <Helpers />,
  },
  {
    name: "계약",
    layout: "/admin",
    path: "contracts",
    icon: <MdHandshake className="h-6 w-6" />,
    component: <Contracts />,
  },
  {
    name: "정산 리스트",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "settlements",
    component: <Settlements />,
  },
  {
    name: "로그인",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
];
export default routes;
