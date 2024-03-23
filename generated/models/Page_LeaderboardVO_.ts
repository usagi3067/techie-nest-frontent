/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LeaderboardVO } from './LeaderboardVO';
import type { OrderItem } from './OrderItem';

export type Page_LeaderboardVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<LeaderboardVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

