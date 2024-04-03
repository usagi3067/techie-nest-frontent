<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" tooltip="账号" label="账号">
        <a-input v-model="form.username" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item style="text-align: center; width: 100%">
        <a-button
          type="primary"
          html-type="submit"
          style="text-align: center; width: 120px"
        >
          登录
        </a-button>
      </a-form-item>
      <a-form-item style="text-align: center">
        <!-- 注册跳转链接 -->
        <router-link to="/user/register"> 还未注册？</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Service } from "../../../generated";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCurrentInstance } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useCookies } from "vue3-cookies";
import { AuthService } from "../../../generated/services/AuthService";

const { cookies } = useCookies();

/**
 * 表单信息
 */
const form = reactive({
  username: "s1",
  password: "1234",
  authType: "password",
});

const client_id = ref<string>("WebApp");
const client_secret = ref<string>("WebApp");
const grant_type = ref<string>("password");
const scope = ref<string>("all");
const autoLogin = ref<boolean>(false);

const router = useRouter();
const route = useRoute();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const usernameJson = JSON.stringify(form);
  console.log("提交的 username表单信息： ", usernameJson);
  let res;
  try {
    res = await AuthService.userLoginUsingPost(
      client_id.value,
      client_secret.value,
      grant_type.value,
      usernameJson,
      scope.value
    );
    console.log("登录中...", res);
    if (!autoLogin.value) setCookie("jwt", res.access_token, 0);
    else setCookie("jwt", res.access_token, 30);
    // 登录成功，跳转到主页
    await store.dispatch("user/getLoginUser", cookies.get("jwt"));
    // 登录后的重定向逻辑
    // 检查当前路由的查询参数中是否有`redirect`值
    const redirectPath = route.query.redirect;
    console.log("重定向路径： ", redirectPath);

    if (redirectPath) {
      router.replace(redirectPath as string);
      return;
    }
    router.push({
      path: "/",
      replace: true,
    });
  } catch (error) {
    message.error("用户名或密码错误");
  } finally {
    console.log("登录的结果信息: ", res);
  }
};

const setCookie = (name: string, value: string, Days: number) => {
  cookies.set(name, value, Days, "/");
};

// const res = await UserControllerService.userLoginUsingPost(form);
// // 登录成功，跳转到主页
// if (res.code === 0) {
//   await store.dispatch("user/getLoginUser");
//   router.push({
//     path: "/",
//     replace: true,
//   });
// } else {
//   message.error("登陆失败，" + res.message);
// }
</script>
