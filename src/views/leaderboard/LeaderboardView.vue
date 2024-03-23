<template>
  <div id="questionsView">
    <!--    <a-form :model="searchParams" layout="inline">-->
    <!--      <a-form-item field="title" label="名称" style="min-width: 240px">-->
    <!--        <a-input v-model="searchParams.title" placeholder="请输入名称" />-->
    <!--      </a-form-item>-->
    <!--      <a-form-item field="tags" label="标签" style="min-width: 240px">-->
    <!--        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />-->
    <!--      </a-form-item>-->
    <!--      <a-form-item>-->
    <!--        <a-button type="primary" @click="doSubmit">提交</a-button>-->
    <!--      </a-form-item>-->
    <!--    </a-form>-->
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #userAvatar="{ record }">
        <a-avatar>
          <img alt="avatar" :src="record.userAvatar" />
        </a-avatar>
      </template>
      <template #passPercent="{ record }">
        {{
          `${
            record.submitNumber
              ? ((record.acNumber / record.submitNumber) * 100).toFixed(2)
              : "0.00"
          }% (${record.acNumber}/${record.submitNumber})`
        }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  Page_LeaderboardVO_,
  LeaderboardControllerService,
  LeaderboardQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<LeaderboardQueryRequest>({
  pageSize: 8,
  current: 1,
});

const loadData = async () => {
  const res = await LeaderboardControllerService.listLeaderboardByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  //loadData();
});

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "排名",
    dataIndex: "no",
    width: 100,
  },
  {
    title: "用户昵称",
    dataIndex: "userName",
  },
  {
    title: "用户头像",
    slotName: "userAvatar",
  },
  {
    title: "用户简介",
    dataIndex: "userProfile",
    ellipsis: true,
    tooltip: true,
    width: 400,
  },
  {
    title: "ac数量",
    dataIndex: "acNumber",
  },
  {
    title: "提交数量",
    dataIndex: "submitNumber",
  },
  {
    title: "通过率(%)",
    slotName: "passPercent",
  },
  // {
  //   slotName: "optional",
  // },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到做题页面
 * @param question
 */
// const toQuestionPage = (question: Question) => {
//   router.push({
//     path: `/view/question/${question.id}`,
//   });
// };

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
