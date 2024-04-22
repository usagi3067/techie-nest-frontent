<template>
  <div id="CourseManagementView">
    <div class="banner">
      <span>媒资管理</span>
      <a-button type="primary" @click="handleClick">上传文件</a-button>
      <a-modal
        v-model:visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        okText="添加文件"
      >
        <template #title> 点击按钮上传文件</template>
        <div>
          <a-table
            class="dataList"
            :data="fileList"
            :columns="columnsFile"
            border
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
          >
            <template #size="{ record }">{{ record.file.size }}</template>
            <template #percent="{ record }">
              <a-progress
                :percent="record.percent / 100"
                :style="{ width: '50%' }"
              />
            </template>
          </a-table>

          <a-upload
            action="#"
            :accept="'video/*'"
            @change="handleChange"
            :auto-upload="false"
            :default-file-list="fileList"
            :on-before-upload="handleBeforeUpload"
          />
        </div>
      </a-modal>
    </div>
    <a-table :columns="columns" :data="dataList">
      <template #auditStatus="{ record }">
        {{ transformCourseAuditStatus(record?.auditStatus) }}
      </template>
      <template #action>
        <a-button type="text">预览</a-button>
        <a-button type="text">删除</a-button>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  CourseBase,
  MediaFiles,
  MediaService,
  QueryCoursePageDto,
  Service,
} from "../../../generated";
import { useRouter } from "vue-router";
import { QueryMediaParamsDto } from "../../../generated/models/QueryMediaParamsDto";
import { FileItem } from "@arco-design/web-vue";

const fileList = ref<FileItem[]>([]);

const columnsFile = [
  {
    title: "文件名",
    dataIndex: "name",
  },
  {
    title: "大小",
    slotName: "size",
  },
  {
    title: "进度",
    slotName: "percent",
  },
];

// 文档后缀名列表
const msDocumentSuffix: string[] = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".pdf",
];
// 音/视频后缀名列表
const audioVideoSuffix: string[] = [".mp3", ".wma", ".avi", ".mp4"];
import message from "@arco-design/web-vue/es/message";

const handleBeforeUpload = (file: FileItem) => {
  let validSuffix = msDocumentSuffix.concat(audioVideoSuffix);
  let filename = file.name;
  let index = filename?.lastIndexOf(".") as number;
  let suffix = filename?.substr(index) as string;

  const isValid = validSuffix.indexOf(suffix) !== -1;
  if (!isValid) {
    message.error(`上传媒资文件只能是 ${validSuffix.toString()} 格式！`);
  }
  return isValid;
};

const handleChange = (newFileList: FileItem[], fileItem: FileItem) => {
  console.log("handleChange...");

  fileList.value = newFileList;
  console.log("当前选中的文件{}", fileItem.file);
  let file = fileItem.file as File;
  uploadByPieces({
    file,
    pieceSize: 5, //分片大小
    success: (data) => {
      fileItem.percent = (data.num / data.chunkCount) * 100;
      console.log("success::" + data);
    },
    error: (e) => {
      console.log(fileItem, newFileList);
      // 出错了可以从列表中删除吧
      // fileItemList.forEach((n,i) => { if(n.uid == fileItem.uid){
      //   fileItemList.splice(i,1)
      // } })
      console.log("error::" + "视频分片上传失败");
    },
  });
};

import CryptoJS from "crypto-js";

const uploadByPieces = ({ file, pieceSize = 2, success, error }: any) => {
  // 上传过程中用到的变量
  let fileMD5 = ""; // md5加密文件的标识
  const chunkSize = pieceSize * 1024 * 1024; // 分片大小
  const chunkCount = Math.ceil(file.size / chunkSize); // 总片数
  console.log("分片大小： ", chunkSize);
  console.log("总片数： ", chunkCount);

  //得到某一片的分片
  const getChunkInfo = (file, currentChunk, chunkSize) => {
    let start = currentChunk * chunkSize;
    let end = Math.min(file.size, start + chunkSize);
    console.log(Object.prototype.toString.call(file));
    let chunk = file.slice(start, end);
    return chunk;
  };

  // 第一步
  const readFileMD5 = () => {
    //得到第一片和最后一片
    const startChunk = getChunkInfo(file, 0, chunkSize);
    const endChunk = getChunkInfo(file, chunkCount - 1, chunkSize);
    //对第一片进行转码然后md5加密，网上很多是直接对整个文件转码加密得到标识，但是我发现大文件尤其是几个G的文件会崩溃，所以我是先分片然后取第一片加密
    let fileRederInstance = new FileReader();
    fileRederInstance.readAsBinaryString(file);
    fileRederInstance.addEventListener("load", (e) => {
      let fileBolb = (e.target as any).result;
      fileMD5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(fileBolb)).toString();
      // 上传前提交注册 - 参数
      const params = {
        fileMd5: fileMD5,
      };
      // 上传前提交注册 - 接口调用
      MediaService.checkFileUsingPost(params.fileMd5)
        .then((res) => {
          if (res.code == 0) {
            readChunkMD5(0);
          } else {
            message.error(res.message);
          }
        })
        .catch((err) => error(err));
    });
  };

  // 针对每个分片文件进行上传处理
  const readChunkMD5 = async (num: number) => {
    if (num <= chunkCount - 1) {
      //得到当前需要上传的分片文件
      const chunk = getChunkInfo(file, num, chunkSize);
      // 上传分块前检查
      await MediaService.checkChunkUsingPost(num, fileMD5).then(async (res) => {
        if (res.code === 0 && res.data === false) {
          // 分块上传
          let fetchForm = new FormData();
          fetchForm.append("file", chunk);
          fetchForm.append("fileMd5", fileMD5);
          fetchForm.append("chunk", String(num));
          console.log("--------", fetchForm);
          await MediaService.uploadChunkUsingPost(fetchForm)
            .then(async (res) => {
              // 上传成功
              success({ num, chunkCount, state: "uploading" });
              if (res.code == 0) {
                readChunkMD5(num + 1);
              }
            })
            .catch((err) => {
              error(err);
            });
        } else if (res.code === 0 && res.data === true) {
          success({ num, chunkCount, state: "uploading" });
          readChunkMD5(num + 1);
        } else {
          message.error(res.message + "123");
        }
      });
    } else {
      // 上传结束请求合并
      // 提交合并
      MediaService.mergeChunksUsingPost(chunkCount, fileMD5, file?.name)
        .then((res) => {
          if (res.code === 0) {
            // 合并成功了
            success({ num, chunkCount, state: "success" });
          } else {
            message.error(res.message + "1234");
          }
        })
        .catch((err) => {
          error(err);
        });
    }
  };

  readFileMD5(); // 开始执行代码
};

const columns = [
  {
    title: "文件名称",
    dataIndex: "filename",
    width: 300,
  },

  // {
  //   title: "类型",
  //   slotName: "type",
  // },
  {
    title: "上传时间",
    dataIndex: "createDate",
  },
  {
    title: "审核状态",
    slotName: "auditStatus",
  },
  {
    title: "操作",
    slotName: "action",
  },
];
onMounted(() => {
  loadData();
});

// 方法转换课程审核状态码为文本描述
const transformCourseAuditStatus = (statusCode: string) => {
  const courseAuditStatusMap = {
    "100001": "审核未通过",
    "100002": "未提交",
    "100003": "已提交",
    "100004": "审核通过",
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

// eslint-disable-next-line no-undef
const queryMediaParamsDto = ref<QueryMediaParamsDto>({
  filename: "",
  fileType: "",
});

const dataList = ref<MediaFiles[]>([]);
const total = ref<number>(0);
const loadData = () => {
  MediaService.listUsingPost(queryMediaParamsDto.value, 1, 10).then((res) => {
    if (res.code === 0) {
      dataList.value = res?.data.items;
      total.value = res?.data.counts;
    } else message.error(res.message);
  });
};

const router = useRouter();

const doUpdate = (courseBase: CourseBase) => {
  console.log("点击的课程 id: ", courseBase.id);
  router.push({
    path: "/update/course",
    query: {
      id: courseBase.id,
    },
  });
};

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
  loadData();
};
const handleCancel = () => {
  visible.value = false;
  loadData();
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
