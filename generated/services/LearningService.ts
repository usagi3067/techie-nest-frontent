/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_CourseTablesDto_ } from '../models/BaseResponse_CourseTablesDto_';
import type { ChooseCourseDto } from '../models/ChooseCourseDto';
import type { PageResult_CourseTables_ } from '../models/PageResult_CourseTables_';
import type { RestResponse_string_ } from '../models/RestResponse_string_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
import {BaseResponse_ChooseCourseDto_} from "../models/BaseResponse_ChooseCourseDto_";
import {BaseResponse_PageResult_CourseTables_, BaseResponse_string_} from "../../generated";

export class LearningService {

    /**
     * 查询学习资格
     * @param courseId courseId
     * @returns BaseResponse_CourseTablesDto_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getLearningStatusUsingPost(
        courseId: number,
    ): CancelablePromise<BaseResponse_CourseTablesDto_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/learning/choosecourse/learnstatus/{courseId}',
            path: {
                'courseId': courseId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加选课
     * @param courseId courseId
     * @returns BaseResponse_ChooseCourseDto_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addChooseCourseUsingPost(
        courseId: number,
    ): CancelablePromise<BaseResponse_ChooseCourseDto_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/learning/choosecourse/{courseId}',
            path: {
                'courseId': courseId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 我的课程表
     * @param courseType
     * @param expiresType
     * @param page
     * @param size
     * @param sortType
     * @param startIndex
     * @param userId
     * @returns BaseResponse_PageResult_CourseTables_ OK
     * @throws ApiError
     */
    public static mycoursetableUsingGet(
        courseType?: string,
        expiresType?: string,
        page?: number,
        size?: number,
        sortType?: string,
        startIndex?: number,
        userId?: string,
    ): CancelablePromise<BaseResponse_PageResult_CourseTables_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/learning/mycoursetable',
            query: {
                'courseType': courseType,
                'expiresType': expiresType,
                'page': page,
                'size': size,
                'sortType': sortType,
                'startIndex': startIndex,
                'userId': userId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }


    /**
     * 获取视频
     * @param courseId courseId
     * @param mediaId mediaId
     * @param teachPlanId teachPlanId
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static getvideoUsingGet(
        courseId: number,
        mediaId: string,
        teachPlanId: number,
    ): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/learning/open/learn/getvideo/{courseId}/{teachPlanId}/{mediaId}',
            path: {
                'courseId': courseId,
                'mediaId': mediaId,
                'teachPlanId': teachPlanId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
