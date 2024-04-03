/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_CourseTablesDto_ } from "../models/BaseResponse_CourseTablesDto_";
import type { ChooseCourseDto } from "../models/ChooseCourseDto";
import type { PageResult_CourseTables_ } from "../models/PageResult_CourseTables_";
import type { RestResponse_string_ } from "../models/RestResponse_string_";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { BaseResponse_ChooseCourseDto_ } from "../models/BaseResponse_ChooseCourseDto_";
import {
  BaseResponse_PageResult_CourseTables_,
  BaseResponse_string_,
} from "../../generated";

export class AuthService {
  public static userLoginUsingPost(
    client_id?: string,
    client_secret?: string,
    grant_type?: string,
    username?: string,
    scope?: string
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/auth/oauth/token",
      query: {
        client_id,
        client_secret,
        grant_type,
        username,
        scope,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
