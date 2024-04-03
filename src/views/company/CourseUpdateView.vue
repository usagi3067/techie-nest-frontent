<template>
  <div id="CourseUpdateView">
    <a-space direction="vertical" class="dango1" fill>
      <a-steps changeable :current="current" @change="setCurrent">
        <a-step description="This is a description">课程信息</a-step>
        <a-step description="This is a description">课程大纲</a-step>
      </a-steps>
      <a-space
        style="line-height: 160px"
        direction="vertical"
        class="dango2"
        fill
      >
        <CourseEditStep1View v-if="current === 1" ref="courseEditStep1" />
        <CourseEditStep2View v-if="current === 2" />
        <a-space size="large" fill align="center" class="footer">
          <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
            <IconLeft />
            Back
          </a-button>
          <a-button type="primary" v-if="current < 2" @click="onNext">
            Next
            <IconRight />
          </a-button>
          <a-button type="primary" v-if="current == 2" @click="onComplete">
            完成
            <IconRight />
          </a-button>
        </a-space>
      </a-space>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import {
  AddCourseDto,
  CourseCategoryTreeDto,
  Service,
} from "../../../generated";
import MdEditor from "@/components/MdEditor.vue";

import { useRoute, useRouter } from "vue-router";
import CourseEditStep1View from "@/views/company/CourseEditStep1View.vue";
import CourseEditStep2View from "@/views/company/CourseEditStep2View.vue";

const route = useRoute();
const courseEditStep1 = ref(null);

const updatePage = route.path.includes("update");

let formCourse = ref<AddCourseDto>();

const current = ref(1);
const onPrev = () => {
  current.value = Math.max(current.value - 1);
};

const router = useRouter();
const onNext = async () => {
  if (current.value === 1) {
    console.log("当前是第一步");
    const data = courseEditStep1.value?.saveData();
  }
  current.value = Math.min(current.value + 1);
};

const onComplete = () => {
  router.push("/company/course");
};

const setCurrent = (index: number) => {
  current.value = index;
};

const options = ref();

const fileList = ref([]);

const courseId = ref(0);
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

#CourseUpdateView .footer {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
