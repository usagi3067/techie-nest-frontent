/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UploadFileResultDto = {
    /**
     * 审核意见
     */
    auditMind?: string;
    /**
     * 审核状态
     */
    auditStatus?: string;
    /**
     * 存储目录
     */
    bucket?: string;
    /**
     * 修改时间
     */
    changeDate?: string;
    /**
     * 上传时间
     */
    createDate?: string;
    /**
     * 文件id
     */
    fileId?: string;
    /**
     * 存储路径
     */
    filePath?: string;
    /**
     * 文件大小
     */
    fileSize?: number;
    /**
     * 文件类型（图片、文档，视频）
     */
    fileType?: string;
    /**
     * 文件名称
     */
    filename?: string;
    /**
     * 文件id,md5值
     */
    id?: string;
    /**
     * 讲师ID
     */
    lecturerId?: number;
    /**
     * 讲师名称
     */
    lecturerName?: string;
    /**
     * 备注
     */
    remark?: string;
    /**
     * 状态,1:正常，0:不展示
     */
    status?: string;
    /**
     * 标签
     */
    tags?: string;
    /**
     * 媒资文件访问地址
     */
    url?: string;
    /**
     * 上传人
     */
    username?: string;
};

