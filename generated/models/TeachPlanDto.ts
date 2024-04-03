/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TeachPlanMedia } from './TeachPlanMedia';

export type TeachPlanDto = {
    /**
     * 课程id
     */
    courseId?: number;
    /**
     * 课程发布id
     */
    coursePubId?: number;
    /**
     * 章节及课程时介绍
     */
    description?: string;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 层级
     */
    grade?: number;
    /**
     * 课程计划id
     */
    id?: number;
    /**
     * 状态（0正常  1删除）
     */
    isDelete?: number;
    /**
     * 是否支持试学或预览（试看）
     */
    isPreview?: string;
    /**
     * 媒体类型:1视频、2文档
     */
    mediaType?: string;
    /**
     * 排序
     */
    orderBy?: number;
    /**
     * 课程计划父级Id
     */
    parentId?: number;
    /**
     * 课程计划名称
     */
    planName?: string;
    /**
     * 开始时间
     */
    startTime?: string;
    /**
     * 媒资信息
     */
    teachPlanMedia?: TeachPlanMedia;
    /**
     * 小章节list
     */
    teachPlanTreeNodes?: Array<TeachPlanDto>;
    /**
     * 时长 单位时:分:秒
     */
    timeLength?: string;
};

