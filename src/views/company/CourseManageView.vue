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
        <a-button type="text" @click="doUpdate(record)">编辑</a-button>
        <a-button type="text" @click="doDelete(record)">删除</a-button>
        <a-button type="text" @click="doPreview(record)">预览</a-button>
        <a-popconfirm content="预览是否确定无误？ 点击确认提交审核">
          <a-button
            type="text"
            @click="doAudit(record)"
            :disabled="record?.auditStatus == '202003'"
            >提交审核
          </a-button>
        </a-popconfirm>
        <a-popconfirm content="课程发布后，将在网站上公开">
          <a-button
            type="text"
            :disabled="
              record?.status == '203002' || record?.auditStatus != '202004'
            "
            @click="duPublish(record)"
            >发布
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  BaseResponse_PageResult_CourseBase_,
  CourseBase,
  QueryCoursePageDto,
  Service,
} from "../../../generated";
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
onMounted(() => {
  loadData();
});

const router = useRouter();
const addCourse = () => {
  router.push("/add/course");
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

const queryCoursePageDto = ref<QueryCoursePageDto>({
  auditStatus: "",
  courseName: "",
  publishStatus: "",
});
const dataList = ref<CourseBase[]>([]);
const total = ref<number>(0);
const loadData = () => {
  Service.listUsingPost(1, 10, queryCoursePageDto.value).then(
    (res: BaseResponse_PageResult_CourseBase_) => {
      if (res.code === 0) {
        dataList.value = res?.data?.items ?? [];
        total.value = res?.data?.counts ?? 0;
      } else message.error(res.message as string);
    }
  );
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
    } else message.error(res.message as string);
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

const duPublish = (courseBase: CourseBase) => {
  console.log("点击的课程 id: ", courseBase.id);
  Service.coursepublishUsingPost(courseBase.id as any).then((res) => {
    if (res.code === 0) {
      console.log("发布课程成功");
      loadData();
    } else message.error(res.message);
  });
};

const doAudit = async (courseBase: CourseBase) => {
  const res = await Service.commitAuditUsingPost(courseBase?.id as number);
  if (res.code === 0) loadData();
  else message.error(res.message);
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
