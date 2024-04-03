<template>
  <div id="MyCourseView">
    <div class="user-detail">1234</div>
    <div class="my-course-table">
      <h2>已加入课程：</h2>
      <div style="display: flex; flex-wrap: wrap; gap: 16px">
        <a-card
          v-for="course in courseList"
          :key="course.courseId"
          hoverable
          :style="{ width: '360px' }"
          @click="handleCardClick(course.courseId)"
        >
          <template #cover>
            <div
              :style="{
                height: '204px',
                overflow: 'hidden',
              }"
            >
              <!-- 使用 course.pic 作为图片源，如果不存在则使用默认图片 -->
              <img
                :style="{ width: '100%', transform: 'translateY(-20px)' }"
                :alt="course.courseName"
                :src="
                  course.pic ||
                  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp'
                "
              />
            </div>
          </template>
          <a-card-meta :title="course.courseName">
            <template #description>
              <!-- 可以在这里添加课程的其他信息，如 courseType, validTimeStart 等 -->
              Course Type: {{ course.courseType }} <br />
              Start Date: {{ course.validTimeStart }}
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  BaseResponse_PageResult_CourseTables_,
  CourseTables,
  LearningService,
} from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();

onMounted(() => {
  console.log("MyCourseView mounted");
  LearningService.mycoursetableUsingGet().then(
    (res: BaseResponse_PageResult_CourseTables_) => {
      if (res.code === 0) {
        console.log("mycoursetableUsingGet", res);
        courseList.value = res.data.items as CourseTables[];
      } else message.error(res.message as string);
    }
  );
});

const courseList = ref<CourseTables[]>([]);
const urlPre = "http://file.dango1123.top";

const handleCardClick = (courseId: number) => {
  console.log("Clicked course ID: ", courseId);
  router.push({ path: "/courseDetail", query: { id: courseId } });
};
</script>

<style scoped>
#MyCourseView {
  display: flex; /* 启用flex布局 */
  height: 100%; /* 设定高度，根据实际需要调整 */
}

.user-detail {
  flex: 1; /* 分配剩余空间，这里与视频的比例可以通过flex的值调整来实现20% */
  max-width: 20%; /* 最大宽度限制为20% */
  height: 100%; /* 高度100% */
}

.my-course-table {
  flex: 4; /* 分配剩余空间，以实现80%的宽度比例 */
  height: 100%; /* 高度100% */
}
</style>
