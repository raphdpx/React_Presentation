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

/**
 *
 * @export
 * @enum {string}
 */
export enum ETextSearchType {
  NUMBER_0 = 0,
  NUMBER_1 = 1,
  NUMBER_2 = 2,
  NUMBER_3 = 3,
  NUMBER_4 = 4
}

export function ETextSearchTypeFromJSON(json: any): ETextSearchType {
  return ETextSearchTypeFromJSONTyped(json, false);
}

export function ETextSearchTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ETextSearchType {
  return json as ETextSearchType;
}

export function ETextSearchTypeToJSON(value?: ETextSearchType | null): any {
  return value as any;
}
