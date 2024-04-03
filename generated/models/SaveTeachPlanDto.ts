/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 保存或新增课程计划的 dto
 */
export type SaveTeachPlanDto = {
    /**
     * 课程标识
     */
    courseId?: number;
    /**
     * 课程发布标识
     */
    coursePubId?: number;
    /**
     * 层级
     */
    grade?: number;
    /**
     * 教学计划id
     */
    id?: number;
    /**
     * 是否支持试学或预览（试看）
     */
    isPreview?: string;
    /**
     * 课程类型:1视频、2文档
     */
    mediaType?: string;
    /**
     * 课程计划父级Id
     */
    parentId?: number;
    /**
     * 课程计划名称
     */
    planName?: string;
};

