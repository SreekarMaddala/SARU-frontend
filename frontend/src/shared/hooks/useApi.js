import { useMemo } from "react";
import { createApiInstance } from "../api";

/**
 * Hook to get an API instance with the given token key and login path.
 * @param {string} tokenKey - localStorage key for the token
 * @param {string} loginPath - redirect path on 401
 */
export function useApi(tokenKey, loginPath = "/") {
  return useMemo(
    () => createApiInstance(tokenKey, loginPath),
    [tokenKey, loginPath]
  );
}

export default useApi;

