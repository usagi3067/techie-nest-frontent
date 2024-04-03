<template>
  <div id="CourseEditStep2View">
    <a-space style="line-height: 160px" direction="vertical" :fill="true">
      <!--        <a-row>-->
      <!--            <a-col :></a-col>-->
      <!--        </a-row>-->
      <a-button @click="addChapter">添加章节</a-button>
      <a-tree
        :data="treeData"
        :show-line="true"
        size="large"
        :selectable="true"
        :block-node="true"
        :animation="false"
        :expanded-keys="defaultExpandedKeys as string[]"
      >
        <template #title="{ key, title, icon, videoTitle, videoId }">
          <a-space>
            <div v-if="editingKey !== key" @click="() => editTitle(title, key)">
              {{ title }}
            </div>
            <a-input
              v-else
              :style="{ width: '320px' }"
              v-model="editableTitle"
              ref="titleInput"
              @blur="() => submitTitle(key, editableTitle)"
              @keyup.enter="() => submitTitle(key, editableTitle)"
            />
            <div v-if="icon">
              <a-button type="text" @click="unasscociate(key, videoId)">
                <icon-delete />
                {{ videoTitle }}
              </a-button>
            </div>
            <a-button type="text" @click="deletePlan(getPlanId(key))">
              <icon-delete />
              删除该计划
            </a-button>
          </a-space>
          <!-- 只有当当前节点正在被编辑时，才显示输入框 -->
        </template>
        <template #icon>
          <IconStar />
        </template>
        <template #extra="{ key }">
          <a-button
            v-if="isMajorChapter(key)"
            type="text"
            @click="() => onIconClick(key)"
          >
            新增小节
          </a-button>
          <a-button
            v-if="!isMajorChapter(key)"
            @click="handleClick(key)"
            type="text"
            >绑定视频
          </a-button>
          <a-modal
            v-model:visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            okText="绑定视频"
          >
            <a-table
              :columns="mediaColums"
              :data="mediaDataList"
              @row-click="getRowClickHandler"
            ></a-table>
          </a-modal>
        </template>
      </a-tree>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { computed, h, nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  MediaFiles,
  MediaService,
  SaveTeachPlanDto,
  Service,
  TeachPlanDto,
} from "../../../generated";
import { IconDriveFile } from "@arco-design/web-vue/es/icon";
import { QueryMediaParamsDto } from "../../../generated/models/QueryMediaParamsDto";
import message from "@arco-design/web-vue/es/message";
import { TreeNodeData } from "@arco-design/web-vue";

const deletePlan = async (planId: number) => {
  const res = await Service.deleteTeachPlanUsingDelete(planId);
  if (res.code == 0) {
    loadData();
  } else {
    message.error(res.message as string);
  }
};

const unasscociate = async (key: string, mediaId: string) => {
  const res = await Service.unAssociationMediaUsingDelete(
    mediaId,
    getPlanId(key)
  );
  if (res.code === 0) loadData();
  else message.error(res.message as string);
};

onMounted(() => {
  console.log("CourseEditStep2View mounted");
  loadData();
});

const isEditing = ref(false);

// 当前正在编辑的节点的 key
const editingKey = ref<string>("");

// 输入框的 ref
const titleInput = ref(null);

const editableTitle = ref("");

// 使用转换函数更新treeData
const treeData = ref<TreeNodeData[]>([]);

const defaultExpandedKeys = computed(() =>
  treeData.value.map((item) => item.key)
);

// 编辑标题的方法
function editTitle(title: string, key: string) {
  editingKey.value = key;
  editableTitle.value = title;
  // 在下一个 tick 中聚焦输入框
  nextTick(() => {
    titleInput.value.focus();
  });
}

const selectedKey = ref<string>();

const getRowClickHandler = async ({ id, filename }) => {
  console.log(id, filename);
  const query = {
    mediaId: id,
    fileName: filename,
    teachPlanId: getPlanId(selectedKey.value as string),
  };
  const res = await Service.associationMediaUsingPost(query);
  if (res.code === 0) {
    visible.value = false;
    loadData();
  } else {
    message.error(res.message);
  }
};

const mediaColums = [
  {
    title: "文件名称",
    dataIndex: "filename",
    width: 300,
  },
];

// 提交标题的方法
function submitTitle(key, title) {
  isEditing.value = false;
  console.log(key);
  //  title.value = editableTitle.value; // 更新标题
  const param = {
    courseId: route.query.id,
    grade: getGradeId(key),
    id: getPlanId(key),
    parentId: getParentId(key),
    planName: title,
  };
  Service.saveTeachPlanUsingPost(param).then((res) => {
    if (res.code === 0) {
      console.log("更新小节名称", res);
      loadData();
    } else message.error(res.message);
  });
  editingKey.value = "";
}

const visible = ref(false);

const mediaDataList = ref<MediaFiles[]>([]);
const mediaTotal = ref<number>(0);

const queryMediaParamsDto = ref<QueryMediaParamsDto>({
  filename: "",
  fileType: "001002",
});

const handleClick = (key: string) => {
  selectedKey.value = key;
  visible.value = true;
  MediaService.listUsingPost(queryMediaParamsDto.value, 1, 10).then((res) => {
    if (res.code === 0) {
      mediaDataList.value = res?.data.items;
      mediaTotal.value = res?.data.counts;
    } else message.error(res.message);
  });
};
const handleOk = () => {
  visible.value = false;
  loadData();
};
const handleCancel = () => {
  visible.value = false;
  loadData();
};
const route = useRoute();

const teachPlanDtos = ref<TeachPlanDto[]>([]);

const loadData = async () => {
  const id = Number(route.query.id);
  console.log(id);
  if (!id) {
    return;
  }

  const res = await Service.getTreeNodesUsingGet(Number(id));
  console.log("loadData..., res ", res);
  if (res.code === 0) {
    teachPlanDtos.value = res.data;
    treeData.value = convertToTreeData(teachPlanDtos.value);
  } else message.error(res.message);
};

// 定义转换函数
const convertToTreeData = (teachPlanDtos: TeachPlanDto[]) => {
  return teachPlanDtos.map((node) => {
    // 基础节点结构
    const treeNode = {
      title: node.planName,
      key: `${node.grade}-${node.id}-${node.parentId}`,
    };

    // 如果有子节点，递归调用转换函数
    if (node.teachPlanTreeNodes && node.teachPlanTreeNodes.length > 0) {
      treeNode.children = convertToTreeData(node.teachPlanTreeNodes);
    } else if (node.teachPlanMedia && node.teachPlanMedia.mediaId) {
      // 如果有媒体信息，添加图标
      console.log("有媒体信息", node.teachPlanMedia);
      treeNode.icon = () => h(IconDriveFile);
      treeNode.videoTitle = node.teachPlanMedia.mediaFileName;
      treeNode.videoId = node.teachPlanMedia.mediaId;
    }

    return treeNode;
  });
};

const saveTeachPlanDto = ref<SaveTeachPlanDto>({
  /**
   * 课程标识
   */
  courseId: undefined,
  /**
   * 课程发布标识
   */
  coursePubId: undefined,
  /**
   * 层级
   */
  grade: undefined,
  /**
   * 教学计划id
   */
  id: undefined,
  /**
   * 是否支持试学或预览（试看）
   */
  isPreview: undefined,
  /**
   * 课程类型:1视频、2文档
   */
  mediaType: undefined,
  /**
   * 课程计划父级Id
   */
  parentId: undefined,
  /**
   * 课程计划名称
   */
  planName: undefined,
});

const onIconClick = (key: string) => {
  console.log("onIconClick", key);
  const param = {
    courseId: Number(route.query.id),
    grade: 2,
    parentId: getPlanId(key),
    planName: "新的小节名称， 可点击修改",
  };
  Service.saveTeachPlanUsingPost(param).then((res) => {
    if (res.code === 0) {
      console.log("新增小节", res);
      loadData();
    } else message.error(res.message);
  });
};

const addChapter = () => {
  const param = {
    courseId: Number(route.query.id),
    grade: 1,
    parentId: 0,
    planName: "新的章节名称， 可点击修改",
  };
  Service.saveTeachPlanUsingPost(param).then((res) => {
    if (res.code === 0) {
      console.log("新增小节", res);
      loadData();
    } else message.error(res.message);
  });
};

const isMajorChapter = (key: string) => {
  // 分割 key 字符串来获取 grade 部分
  const grade = key.split("-")[0];
  // 判断 grade 是否等于 "1"（大章节的标识）
  return grade === "1";
};

const getPlanId = (key: string) => {
  // 分割 key 字符串来获取 grade 部分
  return Number(key.split("-")[1]);
};

const getGradeId = (key: string) => {
  // 分割 key 字符串来获取 grade 部分
  return key.split("-")[0];
};

const getParentId = (key: string) => {
  // 分割 key 字符串来获取 grade 部分
  return key.split("-")[2];
};

// 定义类型守卫
function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}
</script>

<style scoped>
#CourseEditStep2View {
  margin-left: 300px;
  margin-right: 300px;
}
</style>
