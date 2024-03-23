<template>
  <div id="discussionsView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item label="标题" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入标题" />
      </a-form-item>
      <!--      <a-form-item label="作者" style="min-width: 240px">-->
      <!--        <a-input v-model="searchParams.userId" placeholder="请输入作者" />-->
      <!--      </a-form-item>-->
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
  </div>
  <div
    :style="{
      display: 'flex',
      width: '80%',
      margin: '0 auto',
    }"
  >
    <!-- 左侧区域：a-card列表 -->
    <div :style="{ flex: 7, padding: '10px' }">
      <a-card
        v-for="postVO in dataList"
        :key="postVO.id"
        :style="{ marginBottom: '20px' }"
        @click="toDiscussionPage(postVO)"
        hoverable
      >
        <template #title>
          {{ postVO.title }}
        </template>
        <template #extra>
          <span>{{ postVO.user?.userName }}</span>
        </template>
        {{ postVO.content }}
        <div :style="{ marginTop: '10px' }">
          <a-icon type="like-o" />
          {{ postVO.favourNum }} |
          <a-icon type="message" />
          {{ postVO.thumbNum }}
        </div>
      </a-card>
    </div>

    <!-- 右侧区域：发布讨论按钮和表情符号 -->
    <div
      :style="{
        flex: 3,
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
      }"
    >
      <a-button type="primary" @click="publishDiscussion">发布讨论</a-button>
      <div :style="{ marginTop: '20px' }">😊</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  PostVO,
  PostControllerService,
  PostQueryRequest,
} from "../../../generated"; // 假设有相应的API和类型
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<PostQueryRequest>({
  title: "",
  userId: undefined,
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  const res = await PostControllerService.listPostVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

watchEffect(() => {
  loadData();
});

const columns = [
  {
    title: "讨论ID",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "点赞数",
    slotName: "thumbNum",
  },
  {
    title: "收藏数",
    slotName: "favourNum",
  },
  {
    title: "用户id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "actions",
  },
];

const onPageChange = (page: number) => {
  searchParams.value.current = page;
  loadData();
};

const router = useRouter();

const toDiscussionPage = (postVO: PostVO) => {
  router.push({
    path: `/view/post/${postVO.id}`,
  });
};

const publishDiscussion = (postVO: PostVO) => {
  router.push({
    path: `/view/post/${postVO.id}`,
  });
};

const doSubmit = () => {
  searchParams.value.current = 1;
  loadData();
};
</script>

<style scoped>
#discussionsView {
  max-width: 1280px;
  margin: 0 auto;
  width: 78%;
}
</style>
