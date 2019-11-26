import { EReferentialTypes, ReferentialApi, ReferentialItemDto } from "../api";
import { apiConfiguration } from "../apiConfig";
import { useApiEffect } from "nsitools-react";
import { IOptionProps } from "@blueprintjs/core";
import { useMemo } from "react";

export const useReferential = (options: {
  referential: EReferentialTypes;
  withNull?: boolean;
  keepStringValue?: boolean;
}): [IOptionProps[], boolean] => {
  const referentialApi = useMemo(() => new ReferentialApi(apiConfiguration()), []);

  const [data, loading] = useApiEffect(() =>
    referentialApi.apiReferentialReferentialTypeGet({
      referentialType: options.referential
    })
  );

  const convertOptions = (item: ReferentialItemDto[]): IOptionProps[] => {
    const items = item
      ? item.map(i => ({
          label: "" + (i.displayValue ? i.displayValue : i.idValue),
          value: options.keepStringValue ? i.idValue! : +i.idValue!
        }))
      : [];

    if (options.withNull) {
      items.unshift({ value: null, label: "Select..." });
    }

    return items;
  };

  const list = data ? convertOptions(data.list) : [];

  return [list, loading];
};
