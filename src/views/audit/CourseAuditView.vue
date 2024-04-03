<template>
  <div id="CourseManagementView">
    <div class="banner">
      <span>课程管理</span>
      <a-button type="primary" @click="addCourse">添加课程</a-button>
    </div>
    <a-table :columns="columns" :data="dataList">
      <template #auditStatus="{ record }">
        {{ transformCourseAuditStatus(record?.auditStatus) }}
      </template>
      <template #status="{ record }">
        {{ transformCoursePublishStatus(record?.status) }}
      </template>
      <template #action="{ record }">
        <a-button type="text" @click="doPreview(record)">预览</a-button>

        <a-button type="text" @click="doAuditSuccess(record)"
          >审核通过
        </a-button>
        <a-button type="text" @click="doAuditFail(record)"
          >审核未通过
        </a-button>

        <a-button type="text">发布</a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CourseBase, QueryCoursePageDto, Service } from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const columns = [
  {
    title: "课程名称",
    dataIndex: "name",
    width: 300,
  },

  {
    title: "审核状态",
    slotName: "auditStatus",
  },
  {
    title: "发布状态",
    slotName: "status",
  },
  {
    title: "操作",
    slotName: "action",
  },
];

const queryCoursePageDto = ref<QueryCoursePageDto>({
  auditStatus: "202003",
  courseName: "",
  publishStatus: "",
});
const dataList = ref<CourseBase[]>([]);
const total = ref<number>(0);

onMounted(() => {
  loadData();
});

const router = useRouter();
const addCourse = () => {
  router.push("/add/course");
};

const loadData = () => {
  Service.listUsingPost(1, 10, queryCoursePageDto.value).then((res) => {
    if (res.code === 0) {
      dataList.value = res?.data.items;
      total.value = res?.data.counts;
    } else {
      message.error(res.message as string);
    }
  });
};

const doUpdate = (courseBase: CourseBase) => {
  console.log("点击的课程 id: ", courseBase.id);
  router.push({
    path: "/update/course",
    query: {
      id: courseBase.id,
    },
  });
};

const doDelete = (courseBase: CourseBase) => {
  console.log("点击的课程 id: ", courseBase.id);
  Service.deleteCourseUsingDelete(courseBase.id as any).then((res) => {
    if (res.code === 0) {
      console.log("删除课程结果： ", res);
      loadData();
    } else {
      message.error(res.message as string);
    }
  });
};

const doPreview = (courseBase: CourseBase) => {
  console.log("点击的课程 id: ", courseBase.id);
  router.push({
    path: "/course/preview",
    query: {
      id: courseBase.id,
    },
  });
};

const doAuditSuccess = async (courseBase: CourseBase) => {
  const res = await Service.commitAuditSuccessUsingPost(
    courseBase?.id as number
  );
  if (res.code === 0) {
    loadData();
  } else {
    message.error(res.message);
  }
};
const doAuditFail = async (courseBase: CourseBase) => {
  const res = await Service.commitAuditFailUsingPost(courseBase?.id as number);
  if (res.code === 0) {
    loadData();
  } else {
    message.error(res.message);
  }
};

// 方法转换课程审核状态码为文本描述
const transformCourseAuditStatus = (statusCode: string) => {
  const courseAuditStatusMap = {
    "202001": "审核未通过",
    "202002": "未提交",
    "202003": "已提交",
    "202004": "审核通过",
  } as any;
  return courseAuditStatusMap[statusCode] || "未知状态";
};

// 方法转换课程收费状态码为文本描述
const transformCourseChargeStatus = (statusCode: string) => {
  const courseChargeMap = {
    "201000": "免费",
    "201001": "收费",
  } as any;
  return courseChargeMap[statusCode] || "未知状态";
};

// 方法转换课程等级状态码为文本描述
const transformCourseLevel = (statusCode: string) => {
  const courseLevelMap = {
    "204001": "初级",
    "204002": "中级",
    "204003": "高级",
  } as any;
  return courseLevelMap[statusCode] || "未知等级";
};

// 方法转换课程发布状态码为文本描述
const transformCoursePublishStatus = (statusCode: string) => {
  const coursePublishStatusMap = {
    "203001": "未发布",
    "203002": "已发布",
    "203003": "下线",
  } as any;
  return coursePublishStatusMap[statusCode] || "未知状态";
};
</script>

<style scoped>
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #d9d9d9;
}
</style>
