/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_SearchPageResultDto_CourseIndex_ } from '../models/BaseResponse_SearchPageResultDto_CourseIndex_';
import type { CourseIndex } from '../models/CourseIndex';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * 课程搜索列表
     * @param grade
     * @param keywords
     * @param mt
     * @param pageNo 当前页号
     * @param pageSize 页面大小
     * @param sortField 排序字段
     * @param sortOrder 排序顺序 (默认升序)
     * @param st
     * @returns BaseResponse_SearchPageResultDto_CourseIndex_ OK
     * @throws ApiError
     */
    public static listUsingGet(
        grade?: string,
        keywords?: string,
        mt?: string,
        pageNo?: number,
        pageSize?: number,
        sortField?: string,
        sortOrder?: string,
        st?: string,
    ): CancelablePromise<BaseResponse_SearchPageResultDto_CourseIndex_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/search/course/list',
            query: {
                'grade': grade,
                'keywords': keywords,
                'mt': mt,
                'pageNo': pageNo,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'st': st,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 添加课程索引
     * @param courseIndex courseIndex
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUsingPost(
        courseIndex: CourseIndex,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/search/index/course',
            body: courseIndex,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
