<template>
  <a-image
    :width="props.width"
    :height="props.height"
    :src="pic"
    :title="name"
    footer-position="outer"
    :preview="false"
    @click="openCourse"
  >
    <template #description></template>
    <template #extra>
      <div class="actions actions-outer">
        <a-tooltip>
          <span class="action">🔥{{ count }}</span>
        </a-tooltip>
      </div>
    </template>
  </a-image>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { BaseResponse_CoursePublish_, Service } from "../../generated";

const router = useRouter();

/**
 * 定义组件属性类型
 */
interface Props {
  id: number;
  handleChange: (v: string) => void;
  width: number;
  height: number;
}

const pic = ref<string>("");
const name = ref<string>("error...");

const visible2 = ref(false);
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  loadData();
});

const count = ref<number>(0);
const tags = ref<string[]>([]);

const loadData = async () => {
  await Service.getCoursepublishUsingGet(props.id).then(
    (res: BaseResponse_CoursePublish_) => {
      if (res.code === 0) {
        console.log(res.data);
        pic.value = res.data?.pic ?? "";
        name.value = res.data?.name ?? "";
        count.value = res.data?.countStudy ?? 0;
      }
    }
  );
};
const openCourse = () => {
  console.log(`Clicked image ID: ${props.id}`);
  // router.push({ path: "/courseDetail", query: { id: props.id } });
  router.push({ path: "/course/detail", query: { id: props.id } });
};
</script>

<style scoped>
.actions {
  display: flex;
  align-items: center;
}

.action {
  padding: 5px 4px;
  font-size: 14px;
  margin-left: 12px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
}

.action:first-child {
  margin-left: 0;
}

.action:hover {
  background: rgba(0, 0, 0, 0.5);
}

.actions-outer {
  .action {
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
