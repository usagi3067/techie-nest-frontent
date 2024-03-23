/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_LeaderboardVO_ } from '../models/BaseResponse_Page_LeaderboardVO_';
import type { LeaderboardQueryRequest } from '../models/LeaderboardQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LeaderboardControllerService {

    /**
     * listLeaderboardByPage
     * @param leaderboardQueryRequest leaderboardQueryRequest
     * @returns BaseResponse_Page_LeaderboardVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listLeaderboardByPageUsingPost(
        leaderboardQueryRequest: LeaderboardQueryRequest,
    ): CancelablePromise<BaseResponse_Page_LeaderboardVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/leaderboard/list/page',
            body: leaderboardQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
