/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOrderDto } from '../models/AddOrderDto';
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_PayRecordDto_ } from '../models/BaseResponse_PayRecordDto_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';


export class PayService {

    /**
     * 生成支付二维码
     * @param addOrderDto addOrderDto
     * @returns BaseResponse_PayRecordDto_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static generatePayCodeUsingPost(
        addOrderDto: AddOrderDto,
    ): CancelablePromise<BaseResponse_PayRecordDto_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders/generatepaycode',
            body: addOrderDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询支付结果
     * @param payNo payNo
     * @returns BaseResponse_PayRecordDto_ OK
     * @throws ApiError
     */
    public static payresultUsingGet(
        payNo?: string,
    ): CancelablePromise<BaseResponse_PayRecordDto_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/payresult',
            query: {
                'payNo': payNo,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 接收支付结果通知
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static receivenotifyUsingPost(): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders/receivenotify',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 扫码下单接口
     * @param payNo payNo
     * @returns BaseResponse_boolean_ OK
     * @throws ApiError
     */
    public static requestpayUsingGet(
        payNo?: string,
    ): CancelablePromise<BaseResponse_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/requestpay',
            query: {
                'payNo': payNo,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
