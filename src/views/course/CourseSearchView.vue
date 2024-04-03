<template>
  <div id="CourseSearchView">
    <div class="menu-demo">
      <a-menu mode="horizontal" @menu-item-click="handleMenuItemClick">
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <p style="color: #333">大分类：</p>
        </a-menu-item>
        <a-menu-item v-for="item in MtList" :key="item.id"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </div>
    <div class="menu-demo">
      <a-menu mode="horizontal" @menu-item-click="handleStMenuItemClick">
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
    <div class="videos-container">
      <SearchVideo
        v-for="video in item"
        :key="video.id"
        :id="video.id as number"
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
  const res: BaseResponse_List_CourseCategoryMenuDto_ =
    await Service.queryAllStUsingGet(key);
  if (res.code === 0) {
    StList.value = res.data;
    console.log("StList.value: ", StList.value);
  } else message.error(res.message as string);
};

const handleStMenuItemClick = async (key: string) => {
  console.log("小分类点击的 key为：", key);
};

// const router = useRouter();
</script>

<style scoped>
.videos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 控制间隔 */
}
</style>
