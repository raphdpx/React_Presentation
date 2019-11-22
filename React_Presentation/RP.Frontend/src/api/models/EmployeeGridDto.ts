// tslint:disable
// eslint-disable
/**
 * PaulExpress API v1.0
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
/**
 *
 * @export
 * @interface EmployeeGridDto
 */
export interface EmployeeGridDto {
  /**
   *
   * @type {number}
   * @memberof EmployeeGridDto
   */
  employeeId?: number;
  /**
   *
   * @type {string}
   * @memberof EmployeeGridDto
   */
  firstName?: string | null;
  /**
   *
   * @type {string}
   * @memberof EmployeeGridDto
   */
  lastName?: string | null;
  /**
   *
   * @type {string}
   * @memberof EmployeeGridDto
   */
  phoneNumber?: string | null;
  /**
   *
   * @type {string}
   * @memberof EmployeeGridDto
   */
  email?: string | null;
}

export function EmployeeGridDtoFromJSON(json: any): EmployeeGridDto {
  return EmployeeGridDtoFromJSONTyped(json, false);
}

export function EmployeeGridDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmployeeGridDto {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    employeeId: !exists(json, "employeeId") ? undefined : json["employeeId"],
    firstName: !exists(json, "firstName") ? undefined : json["firstName"],
    lastName: !exists(json, "lastName") ? undefined : json["lastName"],
    phoneNumber: !exists(json, "phoneNumber") ? undefined : json["phoneNumber"],
    email: !exists(json, "email") ? undefined : json["email"]
  };
}

export function EmployeeGridDtoToJSON(value?: EmployeeGridDto | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    employeeId: value.employeeId,
    firstName: value.firstName,
    lastName: value.lastName,
    phoneNumber: value.phoneNumber,
    email: value.email
  };
}
