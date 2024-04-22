/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddCourseDto } from "../models/AddCourseDto";
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_CourseBaseInfoDto_ } from "../models/BaseResponse_CourseBaseInfoDto_";
import type { BaseResponse_CoursePreviewDto_ } from "../models/BaseResponse_CoursePreviewDto_";
import type { BaseResponse_CoursePublish_ } from "../models/BaseResponse_CoursePublish_";
import type { BaseResponse_List_CourseCategoryMenuDto_ } from "../models/BaseResponse_List_CourseCategoryMenuDto_";
import type { BaseResponse_List_CourseCategoryTreeDto_ } from "../models/BaseResponse_List_CourseCategoryTreeDto_";
import type { BaseResponse_List_CourseTeacher_ } from "../models/BaseResponse_List_CourseTeacher_";
import type { BaseResponse_List_TeachPlanDto_ } from "../models/BaseResponse_List_TeachPlanDto_";
import type { BaseResponse_PageResult_CourseBase_ } from "../models/BaseResponse_PageResult_CourseBase_";
import type { BindTeachPlanMediaDto } from "../models/BindTeachPlanMediaDto";
import type { EditCourseDto } from "../models/EditCourseDto";
import type { QueryCoursePageDto } from "../models/QueryCoursePageDto";
import type { SaveTeachPlanDto } from "../models/SaveTeachPlanDto";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_HomePageDisplayDto_ } from "../models/BaseResponse_HomePageDisplayDto_";

export class Service {
  /**
   * 课程新增接口
   * @param addCourseDto addCourseDto
   * @returns BaseResponse_CourseBaseInfoDto_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addCourseBaseUsingPost(
    addCourseDto: AddCourseDto
  ): CancelablePromise<BaseResponse_CourseBaseInfoDto_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/course",
      body: addCourseDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 修改课程基本信息
   * @param editCourseDto editCourseDto
   * @returns BaseResponse_CourseBaseInfoDto_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateCourseBaseUsingPut(
    editCourseDto: EditCourseDto
  ): CancelablePromise<BaseResponse_CourseBaseInfoDto_ | any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/content/course",
      body: editCourseDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询所有大分类
   * @returns BaseResponse_List_CourseCategoryMenuDto_ OK
   * @throws ApiError
   */
  public static queryAllMtUsingGet(): CancelablePromise<BaseResponse_List_CourseCategoryMenuDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/course-category/allMt",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询大分类下的小分类
   * @param id id
   * @returns BaseResponse_List_CourseCategoryMenuDto_ OK
   * @throws ApiError
   */
  public static queryAllStUsingGet(
    id: string
  ): CancelablePromise<BaseResponse_List_CourseCategoryMenuDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/course-category/allSt/{id}",
      path: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询课程分类树
   * @returns BaseResponse_List_CourseCategoryTreeDto_ OK
   * @throws ApiError
   */
  public static queryTreeNodesUsingGet(): CancelablePromise<BaseResponse_List_CourseCategoryTreeDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/course-category/tree-nodes",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程查询接口
   * @param pageNo 当前页号
   * @param pageSize 页面大小
   * @param req req
   * @param sortField 排序字段
   * @param sortOrder 排序顺序 (默认升序)
   * @returns BaseResponse_PageResult_CourseBase_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listUsingPost(
    pageNo?: number,
    pageSize?: number,
    req?: QueryCoursePageDto,
    sortField?: string,
    sortOrder?: string
  ): CancelablePromise<BaseResponse_PageResult_CourseBase_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/course/list",
      query: {
        pageNo: pageNo,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
      body: req,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取课程发布信息
   * @param courseId courseId
   * @returns BaseResponse_CoursePreviewDto_ OK
   * @throws ApiError
   */
  public static getCoursePublishUsingGet(
    courseId: number
  ): CancelablePromise<BaseResponse_CoursePreviewDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/course/whole/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 删除课程
   * @param courseId courseId
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static deleteCourseUsingDelete(
    courseId: number
  ): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/content/course/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * 根据课程id查询课程信息
   * @param id id
   * @returns BaseResponse_CourseBaseInfoDto_ OK
   * @throws ApiError
   */
  public static getCourseBaseByIdUsingGet(
    id: number
  ): CancelablePromise<BaseResponse_CourseBaseInfoDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/course/{id}",
      path: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询师资列表
   * @param courseId courseId
   * @returns BaseResponse_List_CourseTeacher_ OK
   * @throws ApiError
   */
  public static listUsingGet(
    courseId: number
  ): CancelablePromise<BaseResponse_List_CourseTeacher_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/courseTeacher/list/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 审核未通过
   * @param courseId courseId
   * @param content content
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static commitAuditFailUsingPost(
    courseId: number,
    content?: string
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/courseaudit/commit/fail/{courseId}",
      path: {
        courseId: courseId,
      },
      body: content,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 审核通过
   * @param courseId courseId
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static commitAuditSuccessUsingPost(
    courseId: number
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/courseaudit/commit/success/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 提交审核
   * @param courseId courseId
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static commitAuditUsingPost(
    courseId: number
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/courseaudit/commit/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程预览页面
   * @param courseId courseId
   * @returns BaseResponse_CoursePreviewDto_ OK
   * @throws ApiError
   */
  public static previewUsingGet(
    courseId: number
  ): CancelablePromise<BaseResponse_CoursePreviewDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/coursepreview/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程发布
   * @param courseId courseId
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static coursepublishUsingPost(
    courseId: number
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/coursepublish/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取课程信息预览
   * @param courseId courseId
   * @returns BaseResponse_CoursePreviewDto_ OK
   * @throws ApiError
   */
  public static retrieveCoursePreviewInfoUsingGet(
    courseId: number
  ): CancelablePromise<BaseResponse_CoursePreviewDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/open/course/whole/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询课程发布信息
   * @param courseId courseId
   * @returns BaseResponse_CoursePublish_ OK
   * @throws ApiError
   */
  public static getCoursepublishUsingGet(
    courseId: number
  ): CancelablePromise<BaseResponse_CoursePublish_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/r/coursepublish/{courseId}",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程计划参加或修改
   * @param saveTeachPlanDto saveTeachPlanDto
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static saveTeachPlanUsingPost(
    saveTeachPlanDto: SaveTeachPlanDto
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/teach-plan",
      body: saveTeachPlanDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程计划和媒资信息绑定
   * @param bindTeachPlanMediaDto bindTeachPlanMediaDto
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static associationMediaUsingPost(
    bindTeachPlanMediaDto: BindTeachPlanMediaDto
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/teach-plan/association/media",
      body: bindTeachPlanMediaDto,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程计划解除媒资信息绑定
   * @param mediaId mediaId
   * @param teachPlanId teachPlanId
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static unAssociationMediaUsingDelete(
    mediaId: string,
    teachPlanId: number
  ): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/content/teach-plan/association/media/{teachPlanId}/{mediaId}",
      path: {
        mediaId: mediaId,
        teachPlanId: teachPlanId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * 查询课程计划树形列表
   * @param courseId courseId
   * @param id courseId
   * @returns BaseResponse_List_TeachPlanDto_ OK
   * @throws ApiError
   */
  public static getTreeNodesUsingGet(
    courseId: number
  ): CancelablePromise<BaseResponse_List_TeachPlanDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/teach-plan/{courseId}/tree-nodes",
      path: {
        courseId: courseId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 课程计划删除
   * @param teachPlanId teachPlanId
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static deleteTeachPlanUsingDelete(
    teachPlanId: number
  ): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/content/teachPlan/{teachPlanId}",
      path: {
        teachPlanId: teachPlanId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * 课程查询接口
   * @param pageNo 当前页号
   * @param pageSize 页面大小
   * @param req req
   * @param sortField 排序字段
   * @param sortOrder 排序顺序 (默认升序)
   * @returns BaseResponse_PageResult_CourseBase_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static listByAdminUsingPost(
    pageNo?: number,
    pageSize?: number,
    req?: QueryCoursePageDto,
    sortField?: string,
    sortOrder?: string
  ): CancelablePromise<BaseResponse_PageResult_CourseBase_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/content/admin/course/list",
      query: {
        pageNo: pageNo,
        pageSize: pageSize,
        sortField: sortField,
        sortOrder: sortOrder,
      },
      body: req,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询主页展示数据
   * @returns BaseResponse_HomePageDisplayDto_ OK
   * @throws ApiError
   */
  public static displayUsingGet(): CancelablePromise<BaseResponse_HomePageDisplayDto_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/content/course/index",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
