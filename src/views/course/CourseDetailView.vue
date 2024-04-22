<template>
  <div id="CourseDetailView">
    <a-space class="breadcrumb" direction="vertical" fill>
      <a-breadcrumb :style="{ fontSize: `22px` }">
        <a-breadcrumb-item
          >{{ courseBase?.mainCategoryName }}
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ courseBase?.subCategoryName }}</a-breadcrumb-item>
      </a-breadcrumb>
      <div
        :style="{
          background: '#fff',
          padding: '24px',
          minHeight: '200px',
          borderRadius: '20px',
        }"
      >
        <a-row class="grid-demo" align="center">
          <a-col :span="12">
            <div>
              <a-image
                width="600"
                height="400"
                :src="courseBase?.pic"
                footer-position="outer"
                :preview="false"
                style="border-radius: 70px"
              />
            </div>
          </a-col>
          <a-col :span="12">
            <div>
              <p>{{ courseBase?.name }}</p>
            </div>
            <div>
              <span v-if="courseBase?.isFree === 1" style="color: green">
                免费</span
              >
              <span v-else-if="courseBase?.isFree === 0" style="color: orange"
                >收费</span
              >
              <div>
                <a-button @click="handleClick">立即参加</a-button>
                <a-modal
                  :visible="visible"
                  @ok="handleOk"
                  @cancel="handleCancel"
                  okText="支付完成"
                  cancelText="退出"
                  unmountOnClose
                >
                  <template #title> {{ courseBase?.name }}</template>
                  <div v-if="courseBase?.isFree === 1">
                    <p>
                      欢迎加入本课程！无论您是刚刚发现这门课程，还是已经是我们的学习伙伴，我们都期待与您一起探索知识的旅程。
                      <a-button @click="addCourseTable">立即参加</a-button>
                    </p>
                  </div>
                  <div v-else-if="showPay">
                    <p>
                      本课程为收费课程，您需要购买后才能参加学习。点击下方按钮购买课程。
                      支付过程不要关闭该页面， 支付成功后请点击下方支付完成。
                    </p>
                    <del>原价： {{ courseBase?.originalPrice }}</del>
                    <p>现价： {{ courseBase?.price }}</p>
                    <span>点击下方支付方式生成支付二维码</span>
                    <a-image
                      :src="qrcode"
                      width="200"
                      height="200"
                      alt="请选择支付方式生成支付二维码"
                    />
                    <a-space size="large">
                      <a-radio value="radio" @change="pay">支付宝支付</a-radio>
                      <a-radio
                        value="disabled radio"
                        :default-checked="true"
                        disabled
                        >微信支付
                      </a-radio>
                    </a-space>
                  </div>
                </a-modal>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  AddOrderDto,
  BaseResponse_ChooseCourseDto_,
  BaseResponse_CourseBaseInfoDto_,
  BaseResponse_CoursePublish_,
  BaseResponse_CourseTablesDto_,
  BaseResponse_List_TeachPlanDto_,
  BaseResponse_PayRecordDto_,
  ChooseCourseDto,
  CourseBaseInfoDto,
  LearningService,
  PayRecordDto,
  PayService,
  Service,
  TeachPlanDto,
} from "../../../generated";

const route = useRoute();
const id = computed(() => route.query.id);
import { useRouter } from "vue-router";
import store from "@/store";
import message from "@arco-design/web-vue/es/message";
import CourseStatusEnum from "@/enum/CourseStatusEnum";

const router = useRouter();

const teachPlan = ref<TeachPlanDto[]>([]);
const courseBase = ref<CourseBaseInfoDto>();

const urlPre = "http://file.dango1123.top";

const visible = ref(false);

const handleClick = () => {
  console.log(route.path);
  if (route.path.includes("/preview")) {
    console.log("是预览页面");
    router.push({ path: "/preview/learning", query: { id: id.value } });
    return;
  }
  visible.value = true;
  console.log(".........", id.value);
  LearningService.getLearningStatusUsingPost(Number(id.value)).then(
    (res: BaseResponse_CourseTablesDto_) => {
      if (res.code !== 0) {
        message.error(res.message as string);
        // 返回登录页面并设置重定向包括?后面的参数
        router.push({
          path: "/user/login",
          query: { redirect: router.currentRoute.value.fullPath },
        });
        return;
      }
      console.log("学习状态： ", res.data);
      if (res?.data?.learnStatus === CourseStatusEnum.SUCCESS) {
        router.push({ path: "/learning", query: { id: id.value } });
      } else if (res?.data?.learnStatus === CourseStatusEnum.NEED_PAY) {
        showPay.value = true;
        showFree.value = false;
      } else {
        // 已过期需要申请续期或重新支付
        // console.log("该课程已过期请进入选课列表申请续期或重新支付");
        message.info("该课程已过期请进入选课列表申请续期或重新支付");
        showPay.value = true;
        showFree.value = false;
      }
    }
  );
};
const handleCancel = () => {
  visible.value = false;
};

const pay = () => {
  LearningService.addChooseCourseUsingPost(courseBase.value?.id as any).then(
    (res: BaseResponse_ChooseCourseDto_) => {
      console.log("加入选课成功： ", res);
      if (res?.data?.learnStatus === CourseStatusEnum.SUCCESS) {
        // 正常
        // 开始学习
        console.log("开始学习");
        router.push({ path: "/learning", query: { id: id.value } });
      } else if (res?.data?.learnStatus === CourseStatusEnum.NEED_PAY) {
        console.log("该课程是收费课程， 正在生成支付二维码");
        // 需要购买课程
        var good = {
          goodsId: res?.data?.courseId,
          goodsType: "60201",
          goodsName: res?.data?.courseName,
          goodsPrice: res?.data?.coursePrice,
        };
        var goodArray = [good];
        addOrderDto.value = {
          totalPrice: res.data?.coursePrice,
          orderType: "60201",
          orderName: res.data?.courseName,
          orderDescrip: "购买课程:" + res.data?.courseName,
          orderDetail: "",
          orderCourseId: res.data?.courseId,
          outBusinessId: String(res.data?.id),
        };
        addOrderDto.value.orderDetail = JSON.stringify(goodArray);
        PayService.generatePayCodeUsingPost(addOrderDto.value).then(
          (res: BaseResponse_PayRecordDto_) => {
            console.log("支付二维码： ", res);
            if (res && res?.data?.qrcode) {
              qrcode.value = res.data?.qrcode;
              payNo.value = res.data?.payNo;
            }
          }
        );
      } else {
        // 已过期需要申请续期或重新支付
        console.log("该课程已过期请进入选课列表申请续期或重新支付");
      }
    }
  );
};
const qrcode = ref<string>("");
const payNo = ref<number>();

const handleOk = async () => {
  const res = await PayService.payresultUsingGet(payNo.value);
  if (res.code === 0) {
    message.success("支付成功， 正在跳转到学习页面");
    router.push({ path: "/learning", query: { id: id.value } });
  } else {
    message.error(res?.message as string);
  }
};

const showFree = ref(false);
const showPay = ref(false);

const addOrderDto = ref<AddOrderDto>({
  totalPrice: undefined,
  orderType: "60201",
  orderName: "",
  orderCourseId: undefined,
  orderDescrip: "购买课程:" + "",
  orderDetail: "",
  outBusinessId: undefined,
});

const addCourseTable = () => {
  LearningService.addChooseCourseUsingPost(courseBase.value?.id as any).then(
    (res: BaseResponse_ChooseCourseDto_) => {
      if (res.code === 0) {
        console.log("加入课程结果： ", res);
        console.log(res.data?.learnStatus);
        if (res?.data?.learnStatus === CourseStatusEnum.SUCCESS) {
          // 正常
          // 开始学习
          console.log("开始学习");
          router.push({ path: "/learning", query: { id: id.value } });
        } else if (res?.data?.learnStatus === CourseStatusEnum.NEED_PAY) {
          // 需要购买课程
          console.log("需要购买课程");
        } else message.error(res.message as string);
      }
    }
  );
};

onMounted(() => {
  loadData();
});

const loadData = async () => {
  console.log("取课程发布信息中...", Number(id.value));
  const res: BaseResponse_CoursePublish_ =
    await Service.getCoursepublishUsingGet(Number(id.value));
  if (res.code !== 0) {
    message.error(res.message as string);
    return;
  }
  console.log(res.data);
  courseBase.value = {
    id: res.data?.id as number,
    description: res.data?.description ?? "",
    isFree: res.data?.isFree as number,
    lecturerId: res.data?.lecturerId as number,
    lecturerName: res?.data?.lecturerName as string,
    mainCategory: res?.data?.mainCategory as string,
    mainCategoryName: res?.data?.mainCategoryName as string,
    name: res?.data?.name as string,
    originalPrice: res?.data?.originalPrice as number,
    price: res?.data?.price as number,
    pic: res?.data?.pic as string,
    subCategory: res?.data?.subCategory as string,
    subCategoryName: res?.data?.subCategoryName as string,
    tags: JSON.parse(res?.data?.tags as string) as string[],
    validDays: res?.data?.validDays as number,
  };

  teachPlan.value = JSON.parse(res.data?.teachPlan as string);
  // Service.getTreeNodesUsingGet(id.value as any).then(
  //   (res: BaseResponse_List_TeachPlanDto_) => {
  //     if (res.code === 0) teachPlan.value = res.data;
  //     else message.error(res.data as string);
  //   }
  // );
};
</script>

<style scoped>
.videos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 控制间隔 */
}

#CourseDetailView .breadcrumb {
  margin-top: 20px;
}
</style>
