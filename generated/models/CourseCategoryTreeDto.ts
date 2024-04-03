/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CourseCategoryTreeDto = {
    /**
     * 子节点
     */
    childrenTreeNode?: Array<CourseCategoryTreeDto>;
    /**
     * 分类id
     */
    id?: string;
    /**
     * 是否叶子
     */
    isLeaf?: number;
    /**
     * 是否显示
     */
    isShow?: number;
    /**
     * 分类名称
     */
    name?: string;
    /**
     * 排序字段
     */
    orderBy?: number;
    /**
     * 父分类id
     */
    parentId?: string;
};

