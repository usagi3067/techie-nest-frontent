// initial state
// import { UserControllerService } from "../../generated";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { StoreOptions } from "vuex";
import { useCookies } from "vue3-cookies";

interface CustomJwtPayload extends JwtPayload {
  user_name?: string;
  authorities?: string[];
}

const { cookies } = useCookies();
export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      name: "未登录",
      avatar:
        "https://flyoj-1317926399.cos.ap-guangzhou.myqcloud.com/user_avatar/20203331040/wCe3oqfZ-test1_avatar.png",
      userRole: "",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      const jwtPayload: CustomJwtPayload = jwtDecode(payload);
      console.log("获取的登录用户信息", jwtPayload);
      let user_info = {} as any;
      if (jwtPayload.user_name != null) {
        user_info = JSON.parse(jwtPayload.user_name);
      }
      if (jwtPayload.authorities != null) {
        const authorities = jwtPayload.authorities;
        commit("updateUser", {
          ...state.loginUser,
          name: user_info.username,
          authorities,
        });
      }
    },
    async logout({ commit }) {
      commit("updateUser", {
        name: "未登录",
        authorities: [],
      });
      cookies.remove("jwt");
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser.name = payload.name;
      state.loginUser.userRole = payload.authorities[0];
    },
  },
} as StoreOptions<any>;
