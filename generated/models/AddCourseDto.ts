/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 新增课程基本信息
 */
export type AddCourseDto = {
    /**
     * 课程介绍
     */
    description?: string;
    /**
     * 是否收费
     */
    isFree: number;
    /**
     * 课程大分类
     */
    mainCategory: string;
    /**
     * 课程名称
     */
    name: string;
    /**
     * 课程原价
     */
    originalPrice: number;
    /**
     * 手机号
     */
    phone?: string;
    /**
     * 课程封面
     */
    pic: string;
    /**
     * 预备知识
     */
    preKnowledge?: string;
    /**
     * 课程价格
     */
    price: number;
    /**
     * qq
     */
    qq?: string;
    /**
     * 课程小分类
     */
    subCategory: string;
    /**
     * 课程标签
     */
    tags?: Array<string>;
    /**
     * 有效期
     */
    validDays?: number;
    /**
     * 微信
     */
    wechat?: string;
};

