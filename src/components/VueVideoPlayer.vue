<template>
  <video-player
    :url="url"
    :ponster="imgUrl"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
  >
  </video-player>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed, ref, defineEmits } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const videoPlayer = ref();

/**
 * 定义组件属性类型
 */
interface Props {
  url: string;
  imgUrl: string;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  url: () => "",
  imgUrl: () => "",
});

const playerOptions = {
  sources: [
    {
      src: props.url,
      type: "video/mp4",
    },
  ],
  poster: props.imgUrl,
  language: "zh-CN",
  aspectRatio: "16:9",
  fluid: true,
  loop: false,
  muted: false,
  autoplay: false,
  playbackRates: [0.7, 1.0, 1.5, 2.0],
  controlBar: {
    timeDivider: true,
    durationDisplay: true,
    remainingTimeDisplay: false,
    fullscreenToggle: true,
  },
};

const player = computed(() => {
  return videoPlayer.value.player;
});

const emit = defineEmits(["play", "pause", "canplay"]);
</script>

<style scoped></style>
