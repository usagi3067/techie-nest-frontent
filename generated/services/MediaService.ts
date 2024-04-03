/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_PageResult_MediaFiles_ } from '../models/BaseResponse_PageResult_MediaFiles_';
import type { BaseResponse_string_ } from '../models/BaseResponse_string_';
import type { BaseResponse_UploadFileResultDto_ } from '../models/BaseResponse_UploadFileResultDto_';
import type { QueryMediaParamsDto } from '../models/QueryMediaParamsDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';


export class MediaService {

    /**
     * 媒资列表查询接口
     * @param queryMediaParamsDto queryMediaParamsDto
     * @param pageNo 当前页号
     * @param pageSize 页面大小
     * @param sortField 排序字段
     * @param sortOrder 排序顺序 (默认升序)
     * @returns BaseResponse_PageResult_MediaFiles_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUsingPost(
        queryMediaParamsDto: QueryMediaParamsDto,
        pageNo?: number,
        pageSize?: number,
        sortField?: string,
        sortOrder?: string,
    ): CancelablePromise<BaseResponse_PageResult_MediaFiles_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/media/files',
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            body: queryMediaParamsDto,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 预览文件
     * @param mediaId mediaId
     * @returns BaseResponse_string_ OK
     * @throws ApiError
     */
    public static getPlayUrlByMediaIdUsingGet(
        mediaId: string,
    ): CancelablePromise<BaseResponse_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/media/open/preview/{mediaId}',
            path: {
                'mediaId': mediaId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 分块文件上传前检查
     * @param chunk chunk
     * @param fileMd5 fileMd5
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static checkChunkUsingPost(
        chunk: number,
        fileMd5: string,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/media/upload/check-chunk',
            query: {
                'chunk': chunk,
                'fileMd5': fileMd5,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 文件上传前检查
     * @param fileMd5 fileMd5
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static checkFileUsingPost(
        fileMd5: string,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/media/upload/check-file',
            query: {
                'fileMd5': fileMd5,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传文件
     * @param fileData
     * @param folder folder
     * @param objectName objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @throws ApiError
     */
    public static uploadUsingGet(
        fileData?: Blob,
        folder?: string,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/media/upload/course-file',
            query: {
                'folder': folder,
                'objectName': objectName,
            },
            formData: {
                'file-data': fileData,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传文件
     * @param fileData
     * @param folder folder
     * @param objectName objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @throws ApiError
     */
    public static uploadUsingHead(
        fileData?: Blob,
        folder?: string,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/media/upload/course-file',
            query: {
                'folder': folder,
                'objectName': objectName,
            },
            formData: {
                'file-data': fileData,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 上传文件
     * @param folder
     * @param fileData
     * @param objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadUsingPost(
        folder?: string,
        fileData?: Blob,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/media/upload/course-file',
            formData: {
                'folder': folder,
                'file-data': fileData,
                'objectName': objectName,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传文件
     * @param fileData
     * @param folder folder
     * @param objectName objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadUsingPut(
        fileData?: Blob,
        folder?: string,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_ | any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/media/upload/course-file',
            query: {
                'folder': folder,
                'objectName': objectName,
            },
            formData: {
                'file-data': fileData,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传文件
     * @param fileData
     * @param folder folder
     * @param objectName objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @throws ApiError
     */
    public static uploadUsingDelete(
        fileData?: Blob,
        folder?: string,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/media/upload/course-file',
            query: {
                'folder': folder,
                'objectName': objectName,
            },
            formData: {
                'file-data': fileData,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 上传文件
     * @param fileData
     * @param folder folder
     * @param objectName objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @throws ApiError
     */
    public static uploadUsingOptions(
        fileData?: Blob,
        folder?: string,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/media/upload/course-file',
            query: {
                'folder': folder,
                'objectName': objectName,
            },
            formData: {
                'file-data': fileData,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 上传文件
     * @param fileData
     * @param folder folder
     * @param objectName objectName
     * @returns BaseResponse_UploadFileResultDto_ OK
     * @throws ApiError
     */
    public static uploadUsingPatch(
        fileData?: Blob,
        folder?: string,
        objectName?: string,
    ): CancelablePromise<BaseResponse_UploadFileResultDto_> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/media/upload/course-file',
            query: {
                'folder': folder,
                'objectName': objectName,
            },
            formData: {
                'file-data': fileData,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * 合并文件分块
     * @param chunkTotal chunkTotal
     * @param fileMd5 fileMd5
     * @param fileName fileName
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static mergeChunksUsingPost(
        chunkTotal: number,
        fileMd5: string,
        fileName: string,
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/media/upload/merge-chunks',
            query: {
                'chunkTotal': chunkTotal,
                'fileMd5': fileMd5,
                'fileName': fileName,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 上传文件分块
     * @param chunk chunk
     * @param file file
     * @param fileMd5 fileMd5
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadChunkUsingPost(
        formData: FormData, // 使用 FormData 作为参数
    ): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/media/upload/upload-chunk',
            body: formData,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
