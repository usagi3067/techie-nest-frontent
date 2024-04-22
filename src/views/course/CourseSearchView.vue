<template>
  <div id="CourseSearchView">
    <div class="menu-demo">
      <div>
        <a-input
          class="input"
          placeholder="搜索感兴趣的课程"
          v-model="keywords"
          @input="inputSearch"
          allow-clear
        />
      </div>
      <a-menu
        mode="horizontal"
        @menu-item-click="handleMenuItemClick"
        class="menu"
      >
        <a-menu-item key="0" disabled>
          <p style="color: #333">大分类：</p>
        </a-menu-item>
        <a-menu-item v-for="item in MtList" :key="item.id"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
      <a-menu
        mode="horizontal"
        @menu-item-click="handleStMenuItemClick"
        class="menu"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <p style="color: #333">小分类：</p>
        </a-menu-item>
        <a-menu-item v-for="item in StList" :key="item.id"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </div>
    <div class="menu-demo"></div>
    <div class="videos-container">
      <SearchVideo
        v-for="video in item"
        :key="video.id"
        :id="video.id as number"
        :height="200"
        :width="300"
      ></SearchVideo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  CourseCategoryMenuDto,
  SearchPageResultDto_CourseIndex_,
  Service,
  SearchService,
  CourseIndex,
  BaseResponse_List_CourseCategoryMenuDto_,
  BaseResponse_SearchPageResultDto_CourseIndex_,
} from "../../../generated";

import { useRouter } from "vue-router";
import SearchVideo from "@/components/SearchVideo.vue";
import message from "@arco-design/web-vue/es/message";

const MtList = ref<CourseCategoryMenuDto[]>([]);
const StList = ref<CourseCategoryMenuDto[]>([]);

const loadData = async () => {
  const res: BaseResponse_List_CourseCategoryMenuDto_ =
    await Service.queryAllMtUsingGet();
  if (res.code !== 0) {
    message.error(res.message as string);
    return;
  }
  MtList.value = res.data;

  const res2: BaseResponse_SearchPageResultDto_CourseIndex_ =
    await SearchService.listUsingGet(
      grade.value,
      keywords.value,
      mt.value,
      pageNo.value,
      pageSize.value,
      sortFiled.value,
      sortOrder.value,
      st.value
    );
  if (res2.code === 0) {
    searchResult.value = res2.data;
    item.value = searchResult.value?.items ?? [];
  } else {
    message.error(res2.message as string);
  }
};

const grade = ref<string>("");
const keywords = ref("");
const mt = ref("");
const pageNo = ref(1);
const pageSize = ref(10);
const sortFiled = ref("");
const sortOrder = ref("");
const st = ref("");
const item = ref<CourseIndex[]>([]);

const searchResult = ref<SearchPageResultDto_CourseIndex_>();

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const handleMenuItemClick = async (key: string) => {
  console.log("大分类点中的 key 为:", key);
  mt.value = key;
  st.value = "";
  const res: BaseResponse_List_CourseCategoryMenuDto_ =
    await Service.queryAllStUsingGet(key);
  if (res.code === 0) {
    StList.value = res.data ?? [];
    console.log("StList.value: ", StList.value);
  } else message.error(res.message as string);

  doSearch();
};

const handleStMenuItemClick = async (key: string) => {
  console.log("小分类点击的 key为：", key);
  st.value = key;
  doSearch();
};

const inputSearch = () => {
  mt.value = "";
  st.value = "";
  doSearch();
};

const doSearch = async () => {
  const res: BaseResponse_SearchPageResultDto_CourseIndex_ =
    await SearchService.listUsingGet(
      grade.value,
      keywords.value,
      mt.value,
      pageNo.value,
      pageSize.value,
      sortFiled.value,
      sortOrder.value,
      st.value
    );
  if (res.code === 0) {
    searchResult.value = res.data;
    item.value = searchResult.value?.items ?? [];
  } else {
    message.error(res.message as string);
  }
};

// const router = useRouter();
</script>

<style scoped>
.videos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 控制间隔 */
}

#CourseSearchView .input {
  margin-bottom: 30px;
  border: 2px solid green; /* 设置边框为2像素实线绿色 */
  border-radius: 50px; /* 较大的值确保两侧为半圆形状 */
  padding: 10px 20px; /* 顶部和底部内边距以及左右内边距 */
  font-size: 16px; /* 字体大小可以根据实际需求调整 */
  /* 这将确保输入框较高的话，左右侧仍然呈现半圆形状 */
  height: 40px; /* 高度可根据实际需求调整，确保左右两端是半圆 */
  width: 400px; /* 宽度可根据实际需求调整 */
  box-sizing: border-box; /* 使得宽度和高度的计算包含padding和border */
}
</style>
