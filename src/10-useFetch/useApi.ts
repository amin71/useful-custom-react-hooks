import { API } from "assets/api/api";
import React, { useEffect, useState } from "react";
import { getCookie } from "utiles/cookieUtiles";

const useApi = (
  url = "",
  auto = false,
  dependency = [] as any[],
  method = "get"
) => {
  const [Response, setResponse] = useState({
    isLoading: false,
    data: undefined as any,
    error: undefined as any,
    success: false,
  });

  const fetcher = (route?: string) => {
    setResponse({ ...Response, isLoading: true });
    API[method](route || url, {
      params: { language: getCookie("language") },
    })
      .then((res) =>
        setResponse((prev) => ({ ...prev, data: res.data, success: true }))
      )
      .catch((err) =>
        setResponse((prev) => ({
          ...prev,
          error: err?.response?.data,
          success: false,
        }))
      )
      .finally(() => {
        setResponse((prev) => ({ ...prev, isLoading: false }));
      });
  };

  const mutation = (data?: any, onSuccess?: (a: any) => void) => {
    setResponse({ ...Response, isLoading: true });
    API[method](url, data, {
      params: { language: getCookie("language") },
    })
      .then((res) => {
        setResponse((prev) => ({ ...prev, data: res.data, success: true }));
        onSuccess?.(res);
      })
      .catch((err) =>
        setResponse((prev) => ({
          ...prev,
          error: err?.response?.data,
          success: false,
        }))
      )
      .finally(() => {
        setResponse((prev) => ({ ...prev, isLoading: false }));
      });
  };

  useEffect(() => {
    if (auto) fetcher();
  }, [auto, ...dependency]);

  return { ...Response, fetcher, mutation };
};

export default useApi;
