import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login/Login";
import ErrorPage from "@/pages/Error/Error";
// Core
import TypographyPage from "@/pages/forms/addNewApplication";

// Tables
import RecruitmentList from "@/pages/Tables/RecruitmentList";

// Main
import AnalyticsPage from "@/pages/Dashboard/Dashboard";

import LettersList from "@/pages/Tables/lettersList";

import letterDetail from "@/pages/Tables/letterDetail";


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/error",
      name: "Error",
      component: ErrorPage,
    },
    {
      path: "/app",
      name: "Layout",
      component: Layout,
      children: [{
          path: "dashboard",
          name: "AnalyticsPage",
          component: AnalyticsPage,
        },
        {
          path: "letter",
          name: "lettersList",
          component: LettersList,
        },
        {
          path: "new-applicant",
          name: "TypographyPage",
          component: TypographyPage,
        },
        {
          path: "recruits",
          name: "RecruitmentList",
          component: RecruitmentList,
        },
        {
          path: "/view-detail/:slug",
          name: "letterDetail",
          component: letterDetail
        },
        {
          path: "addnew-user",
          name: "addNewUser",
          component: () => import("@/pages/forms/addNewUser"),
        },
        {
          path: "addnew-letter",
          name: "newLetter",
          component: () => import("@/pages/forms/newLetter"),
        },
        {
          path: "users",
          name: "users",
          component: () => import("@/pages/Tables/users"),
        },
        {
          path: ":slug",
          name: "Detail",
          component: () => import("@/pages/Tables/Detail"),
        },
        {
          path: ":slug",
          name: "userDetails",
          component: () => import("@/pages/Tables/userDetails"),
        },
      ],
    },
  ],
});