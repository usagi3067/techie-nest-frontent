/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 新增课程基本信息
 */
export type AddCourseDto = {
    /**
     * 收费规则, 对应数据字典
     */
    charge: string;
    /**
     * 课程介绍
     */
    description?: string;
    /**
     * 课程等级
     */
    grade: string;
    /**
     * 课程大分类
     */
    mt: string;
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
    st: string;
    /**
     * 课程标签
     */
    tags?: string;
    /**
     * 教学模式（普通、 录播、 直播等）
     */
    teachMode: string;
    /**
     * 适用人群
     */
    users: string;
    /**
     * 有效期
     */
    validDays?: number;
    /**
     * 微信
     */
    wechat?: string;
};

