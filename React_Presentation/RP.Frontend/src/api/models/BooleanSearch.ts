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
import {
  EBooleanSearchTypes,
  EBooleanSearchTypesFromJSON,
  EBooleanSearchTypesFromJSONTyped,
  EBooleanSearchTypesToJSON,
  ECriteriaType,
  ECriteriaTypeFromJSON,
  ECriteriaTypeFromJSONTyped,
  ECriteriaTypeToJSON
} from "./";

/**
 *
 * @export
 * @interface BooleanSearch
 */
export interface BooleanSearch {
  /**
   *
   * @type {ECriteriaType}
   * @memberof BooleanSearch
   */
  typeOfCriteria?: ECriteriaType;
  /**
   *
   * @type {EBooleanSearchTypes}
   * @memberof BooleanSearch
   */
  searchMode?: EBooleanSearchTypes;
  /**
   *
   * @type {boolean}
   * @memberof BooleanSearch
   */
  value?: boolean | null;
  /**
   *
   * @type {boolean}
   * @memberof BooleanSearch
   */
  secondaryValue?: boolean | null;
  /**
   *
   * @type {Array<string>}
   * @memberof BooleanSearch
   */
  readonly availableSearchTypes?: Array<string> | null;
  /**
   *
   * @type {string}
   * @memberof BooleanSearch
   */
  readonly currentSearchType?: string | null;
  /**
   *
   * @type {boolean}
   * @memberof BooleanSearch
   */
  manualSearch?: boolean;
}

export function BooleanSearchFromJSON(json: any): BooleanSearch {
  return BooleanSearchFromJSONTyped(json, false);
}

export function BooleanSearchFromJSONTyped(json: any, ignoreDiscriminator: boolean): BooleanSearch {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    typeOfCriteria: !exists(json, "typeOfCriteria") ? undefined : ECriteriaTypeFromJSON(json["typeOfCriteria"]),
    searchMode: !exists(json, "searchMode") ? undefined : EBooleanSearchTypesFromJSON(json["searchMode"]),
    value: !exists(json, "value") ? undefined : json["value"],
    secondaryValue: !exists(json, "secondaryValue") ? undefined : json["secondaryValue"],
    availableSearchTypes: !exists(json, "availableSearchTypes") ? undefined : json["availableSearchTypes"],
    currentSearchType: !exists(json, "currentSearchType") ? undefined : json["currentSearchType"],
    manualSearch: !exists(json, "manualSearch") ? undefined : json["manualSearch"]
  };
}

export function BooleanSearchToJSON(value?: BooleanSearch | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    typeOfCriteria: ECriteriaTypeToJSON(value.typeOfCriteria),
    searchMode: EBooleanSearchTypesToJSON(value.searchMode),
    value: value.value,
    secondaryValue: value.secondaryValue,
    manualSearch: value.manualSearch
  };
}
