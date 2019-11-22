import { useTranslation } from "react-i18next";
import { ETLCodes } from "../locales/ETLCodes";
import { useCallback } from "react";
import { TOptions } from "i18next";

export const useTl = () => {
  const { t } = useTranslation();

  const tCode = useCallback(
    (code: ETLCodes, options?: TOptions<any> | string) => {
      return t(ETLCodes[code], options);
    },
    [t]
  );

  const tUnsafeCode = useCallback(
    (code: string | undefined, options?: TOptions<any> | string) => {
      if (code === undefined) return "";
      return t(code, options);
    },
    [t]
  );
  return {
    t: tCode,
    tUnsafe: tUnsafeCode
  };
};
