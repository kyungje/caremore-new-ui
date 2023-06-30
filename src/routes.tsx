import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/contracts";

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
    component: <MainDashboard />,
  },
  {
    name: "계약",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdHandshake className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "정산 리스트",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
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
