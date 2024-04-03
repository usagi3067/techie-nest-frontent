<template>
  <div id="LearningView">
    <div class="category">
      <a-menu show-collapse-button breakpoint="xl" @collapse="onCollapse">
        <!-- 大章节 -->
        <a-sub-menu v-for="chapter in teacherPlans" :key="chapter?.id">
          <template #title>
            <span>{{ chapter.planName }}</span>
          </template>

          <!-- 小节 -->
          <a-menu-item
            v-for="section in chapter.teachPlanTreeNodes"
            :key="section?.id"
            :disabled="
              !(section.teachPlanMedia && section.teachPlanMedia.mediaId)
            "
            @click="fetchVideo(section.id, section.teachPlanMedia?.mediaId)"
          >
            {{ section.planName }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="content">
      <video-player
        :src="url"
        :poster="imgUrl"
        :options="playerOptions"
      ></video-player>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { Message } from "@arco-design/web-vue";
import {
  BaseResponse_CoursePreviewDto_,
  BaseResponse_string_,
  CourseBaseInfoDto,
  CoursePreviewDto,
  LearningService,
  MediaService,
  Service,
  TeachPlanDto,
} from "../../../../generated";
import message from "@arco-design/web-vue/es/message";

const url = ref<string>("");
const imgUrl = ref<string>("");

const teacherPlans = ref<TeachPlanDto[]>([]);
const courseBase = ref<CourseBaseInfoDto>();

// 创建时调用方法
onMounted(() => {
  Service.retrieveCoursePreviewInfoUsingGet(Number(id.value)).then(
    (res: BaseResponse_CoursePreviewDto_) => {
      if (res.code !== 0) {
        message.error(res.message as string);
        return;
      }
      courseBase.value = res?.data?.courseBase;
      teacherPlans.value = res?.data?.teachPlans || [];
      MediaService.getPlayUrlByMediaIdUsingGet(
        firstVideoInfo.value?.mediaId as string
      ).then((res: BaseResponse_string_) => {
        if (res.code !== 0) {
          message.error(res.message as string);
          return;
        }
        url.value = "http://127.0.0.1:9000" + res?.data ?? "";
        imgUrl.value = "http://127.0.0.1:9000" + courseBase.value?.pic ?? "";
        console.log("url", url.value);
        console.log("imgUrl", imgUrl.value);
      });
    }
  );
});

const fetchVideo = (planId: number, mediaId: string) => {
  MediaService.getPlayUrlByMediaIdUsingGet(mediaId).then(
    (res: BaseResponse_string_) => {
      if (res.code !== 0) {
        message.error(res.message as string);
        return;
      }
      url.value = "http://127.0.0.1:9000" + res?.data ?? "";
      imgUrl.value = "http://127.0.0.1:9000" + courseBase.value?.pic ?? "";
      console.log("url", url.value);
      console.log("imgUrl", imgUrl.value);
    }
  );
};

const onCollapse = (val, type) => {
  const content = type === "responsive" ? "触发响应式收缩" : "点击触发收缩";
  Message.info({
    content,
    duration: 2000,
  });
};

// 计算属性来找到第一个视频及其ID
const firstVideoInfo = computed(() => {
  // 遍历所有教学计划
  for (const plan of teacherPlans.value) {
    // 如果教学计划有子节点
    if (plan.teachPlanTreeNodes) {
      // 遍历所有子节点
      for (const node of plan.teachPlanTreeNodes) {
        // 检查节点是否有teachPlanMedia，并且teachPlanMedia有mediaId
        if (node.teachPlanMedia && node.teachPlanMedia.mediaId) {
          // 返回找到的第一个视频的信息
          return {
            id: node.id,
            mediaId: node.teachPlanMedia.mediaId,
          };
        }
      }
    }
  }
  // 如果没有找到视频，返回undefined
  return undefined;
});

const playerOptions = {
  playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
  // autoplay: "any", // 如果true,浏览器准备好时开始回放。
  muted: true, // 默认情况下将会消除任何音频。
  loop: true, // 导致视频一结束就重新开始。
  preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
  language: "zh-CN",
  aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
  notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
  controls: true,
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true, // 全屏按钮
  },
};
const route = useRoute();
const id = computed(() => {
  console.log("课程id", route.query.id);
  return route.query.id;
});
</script>

<style scoped>
#LearningView {
  display: flex; /* 启用flex布局 */
  height: 100%; /* 设定高度，根据实际需要调整 */
}

.category {
  flex: 1; /* 分配剩余空间，这里与视频的比例可以通过flex的值调整来实现20% */
  max-width: 20%; /* 最大宽度限制为20% */
  height: 100%; /* 高度100% */
}

.content {
  flex: 4; /* 分配剩余空间，以实现80%的宽度比例 */
  height: 100%; /* 高度100% */
}
</style>
