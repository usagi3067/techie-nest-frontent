// Add a request interceptor
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { useRouter } from "vue-router";

const router = useRouter();

const { cookies } = useCookies();

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前向 headers 添加 JWT
    const jwt = cookies.get("jwt");
    console.log("axios请求时拿到的 jwt", jwt);
    if (jwt) {
      config.headers["Authorization"] = `Bearer ${jwt}`;
    }
    // 执行任何其他的请求前配置
    // ...
    return config;
  },
  function (error) {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 设置响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果请求成功，直接返回响应
    return response;
  },
  (error) => {
    console.log("响应错误", error);
    // 检查错误响应的状态码
    if (error.response && error.response.status === 401) {
      console.log("401错误");
      // 如果是 401 错误，重定向到登录页
      router.push("/user/login");
      return;
    }
    // 返回任何响应错误
    return Promise.reject(error);
  }
);
