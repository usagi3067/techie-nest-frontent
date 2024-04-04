<template>
  <div id="CourseEditStep1View">
    <a-space style="line-height: 160px" direction="vertical" :fill="true">
      <a-form :model="form" label-align="left">
        <a-form-item field="name" label="课程标题">
          <a-input v-model="form.name" placeholder="请输入课程名称" />
        </a-form-item>
        <!--        <a-form-item field="tags" label="课程标签">-->
        <!--          <a-input v-model="form.tags" placeholder="请输入课程标签" />-->
        <!--        </a-form-item>-->
        <a-form-item field="tags" label="标签">
          <a-input-tag
            allowClear
            v-model="form.tags"
            placeholder="请选择标签并敲击回车键"
          />
        </a-form-item>
        <a-form-item field="selectedPath" label="课程分类">
          <a-cascader
            v-model="selectedPath"
            :path-mode="true"
            :options="options"
            expand-trigger="hover"
            :style="{ width: '320px' }"
            placeholder="Please select ..."
            @change="handleCascaderChange"
          >
            <template #image>
              <img width="100%" :src="`http://127.0.0.1:9000${form.pic}`" alt />
            </template>
          </a-cascader>
        </a-form-item>
        <a-form-item field="description" label="课程简介">
          <a-textarea
            placeholder="请输入课程简介， 不超过 5000字"
            :max-length="{ length: 5000, errorOnly: true }"
            allow-clear
            show-word-limit
            v-model="form.description"
          />
        </a-form-item>
        <a-form-item field="description" label="预备知识">
          <a-textarea
            placeholder="请输入预备知识， 不超过 500字"
            :max-length="{ length: 500, errorOnly: true }"
            allow-clear
            show-word-limit
            v-model="form.description"
          />
        </a-form-item>
        <a-form-item field="pic" label="课程图片" :limit="1">
          <a-upload
            list-type="picture-card"
            @success="handleSuccess"
            action="http://127.0.0.1:1234/api/media/upload/course-file"
            :file-list="fileList"
            image-preview
            name="file-data"
          />
        </a-form-item>
        <a-form-item field="charge" label="课程类型">
          <a-radio-group v-model="form.isFree">
            <a-radio :value="1">免费</a-radio>
            <a-radio :value="0">收费</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="price" label="现价">
          <a-input-number
            v-model="form.price"
            :style="{ width: '320px' }"
            placeholder="Please Enter"
          />
        </a-form-item>
        <a-form-item field="oringalPrice" label="现价">
          <a-input-number
            v-model="form.originalPrice"
            :style="{ width: '320px' }"
            placeholder="Please Enter"
          />
        </a-form-item>
        <a-form-item field="qq" label="QQ">
          <a-input v-model="form.qq" placeholder="请输入qq号" />
        </a-form-item>
        <a-form-item field="wechat" label="微信号">
          <a-input v-model="form.wechat" placeholder="请输入微信号" />
        </a-form-item>
        <a-form-item field="phone" label="手机号">
          <a-input v-model="form.phone" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item field="validDays" label="有效期">
          <a-input-number
            v-model="form.validDays"
            :style="{ width: '320px' }"
            placeholder="Please Enter"
          />
        </a-form-item>
      </a-form>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, defineExpose } from "vue";
import {
  CourseBaseInfoDto,
  CourseCategoryTreeDto,
  EditCourseDto,
  Service,
} from "../../../generated";
import { useRoute, useRouter } from "vue-router";
import { FileItem } from "@arco-design/web-vue";
import { CascaderOption } from "element-plus";
import message from "@arco-design/web-vue/es/message";

const treeData = ref<CourseCategoryTreeDto[]>([]);
const router = useRouter();

let form = ref<CourseBaseInfoDto>({});
const fileList = ref<FileItem[]>([]);
const selectedPath = ref<string[]>([]);
const route = useRoute();
const updatePage = route.path.includes("update");

onMounted(() => {
  loadData();
});

// 监听form中mt和st的变化，并更新selectedPath数组
watch(
  () => [form.value.mainCategory, form.value.subCategory],
  (newValues) => {
    // 只有当mt和st都有值时，才更新selectedPath
    if (newValues[0] && newValues[1]) {
      selectedPath.value = [newValues[0], newValues[1]];
    }
    console.log("当前选中的路径:", selectedPath.value);
  }
);

const loadData = async () => {
  // 加载课程分类
  Service.queryTreeNodesUsingGet().then((res) => {
    if (res.code === 0 && res.data?.length) {
      treeData.value = res.data;
      options.value = transformData(res.data);
    } else {
      message.error(res.message as string);
    }
  });

  const id = route.query.id;
  console.log(id);
  if (!id) {
    return;
  }
  const res = await Service.getCourseBaseByIdUsingGet(id as any);
  if (res.code === 0) {
    console.log("加载课程数据：", res.data);
    form.value = res?.data ?? {};
    fileList.value = [
      {
        uid: "-1",
        name: "default.png",
        url: form.value.pic,
      },
    ];
  } else {
    message.error(res.message as string);
  }
};

const transformData = (data: CourseCategoryTreeDto[]): CascaderOption[] => {
  return data.map((item: CourseCategoryTreeDto) => ({
    value: item.id,
    label: item.name,
    children: item.childrenTreeNode
      ? transformData(item.childrenTreeNode)
      : undefined,
  }));
};

const saveData = async () => {
  if (updatePage) {
    const res = await Service.updateCourseBaseUsingPut(
      form.value as EditCourseDto
    );
    if (res.code === 0) {
      console.log("更新课程基本信息", res.data);
      return res.data;
    } else {
      message.error(res.message);
    }
  } else {
    const res = await Service.addCourseBaseUsingPost(
      form.value as EditCourseDto
    );
    console.log("添加课程基本信息", res);
    // 添加 res.id 到路由
    router.push({ query: { ...router.currentRoute.value.query, id: res.id } });
    return res;
  }
};

defineExpose({
  saveData,
});

const options = ref();

const handleCascaderChange = (value: string[]) => {
  form.value.mainCategory = value[0];
  form.value.subCategory = value[1];
  console.log("选择的分类", value);
};
const handleSuccess = (fileItem: FileItem) => {
  form.value.pic = "http://127.0.0.1:9000" + fileItem.response.url;
  console.log("上传成功, 路径为", form.value.pic);
};
</script>

<style scoped>
#CourseEditStep1View {
  margin-left: 300px;
  margin-right: 300px;
}
</style>
