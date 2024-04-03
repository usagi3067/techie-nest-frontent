import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import CourseDetailView from "@/views/course/CourseDetailView.vue";
import CourseSearchView from "@/views/course/CourseSearchView.vue";
import LearningView from "@/views/learn/LearningView.vue";
import MyCourseView from "@/views/course/MyCourseView.vue";
import CourseManageView from "@/views/company/CourseManageView.vue";
import CourseUpdateView from "@/views/company/CourseUpdateView.vue";
import MediaManageView from "@/views/company/MediaManageView.vue";
import CoursePreviewView from "@/views/course/preview/CoursePreviewView.vue";
import LearningPreviewView from "@/views/learn/preview/LearningPreviewView.vue";
import CourseAuditView from "@/views/audit/CourseAuditView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/logout",
        name: "退出登录",
        component: UserLoginView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    redirect: "/courseSearch", // 重定向 / 到 /questions
  },
  {
    path: "/courseSearch",
    name: "课程主页",
    component: CourseSearchView,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },

  {
    path: "/course/preview",
    name: "课程预览详情",
    component: CoursePreviewView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.INSTRUCTOR,
    },
  },
  {
    path: "/course/detail",
    name: "课程详情",
    component: CourseDetailView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/preview/learning",
    name: "课程预览学习",
    component: LearningPreviewView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.INSTRUCTOR,
    },
  },
  {
    path: "/learning",
    name: "课程学习",
    component: LearningView,
    meta: {
      hideInMenu: true,
    },
  },

  {
    path: "/myCourse",
    name: "我的课程表",
    component: MyCourseView,
    meta: {
      access: ACCESS_ENUM.STUDENT,
    },
  },
  {
    path: "/company/course",
    name: "课程管理",
    component: CourseManageView,
    meta: {
      access: ACCESS_ENUM.INSTRUCTOR,
    },
  },

  {
    path: "/company/media",
    name: "媒体管理",
    component: MediaManageView,
    meta: {
      access: ACCESS_ENUM.INSTRUCTOR,
    },
  },

  {
    path: "/add/course",
    name: "添加课程",
    component: CourseUpdateView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/update/course",
    name: "更新课程",
    component: CourseUpdateView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/course/audit",
    name: "课程审核",
    component: CourseAuditView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
];
