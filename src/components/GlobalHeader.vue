<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.png" />
            <div class="title">FLY OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <!-- 如果未登录，显示“未登录”并提供登录按钮 -->
        <div v-if="userName === '未登录'">
          <a-button type="primary" @click="goToLogin">登录</a-button>
        </div>
        <!-- 如果已登录，显示用户名 -->
        <div v-else class="user-profile">
          <a-avatar class="user-avatar">
            <img alt="avatar" :src="userAvatarUrl" />
          </a-avatar>
          <div class="user-name">{{ userName }}</div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

const router = useRouter();
const store = useStore();

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

console.log();

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
// 假设你的store中有用户信息，包括头像URL
const userAvatarUrl = computed(
  () => store.state.user?.loginUser?.userAvatar ?? ""
);

// 使用计算属性来安全地访问用户名
const userName = computed(() => {
  return store.state.user?.loginUser?.userName ?? "未登录";
});
// 添加跳转到登录页面的方法
const goToLogin = () => {
  router.push("/user/login");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中对齐头像和用户名 */
  justify-content: center; /* 如果需要，也可以在容器内部垂直居中内容 */
}

.user-avatar {
  margin-bottom: 8px; /* 头像和用户名之间的距离 */
}

/* 根据需要调整样式 */
.user-name {
  /* 可以添加更多样式来定制用户名的外观 */
  color: #888888; /* 字体颜色 */
}
</style>
