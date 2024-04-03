<template>
  <a-image
    width="300"
    height="200"
    :src="urlPre + pic"
    :title="name"
    footer-position="outer"
    :preview="false"
    @click="openCourse"
  />
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

/**
 * 定义组件属性类型
 */
interface Props {
  id: number;
  pic?: string;
  name?: string;
  handleChange: (v: string) => void;
}

const urlPre = "http://file.dango1123.top";
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  id: () => 132,
  pic: () => "/mediafiles/2024/03/28/46061c068f698a2895cc004a1978aff9.jpeg",
  name: () => "浙江大学翁恺教你C语言程序设计！C语言基础入门！",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const openCourse = () => {
  console.log(`Clicked image ID: ${props.id}`);
  // router.push({ path: "/courseDetail", query: { id: props.id } });
  router.push({ path: "/course/detail", query: { id: props.id } });
};
</script>

<style scoped></style>
