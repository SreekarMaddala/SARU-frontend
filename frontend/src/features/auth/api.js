import { companyApi, BASE_URL } from "../../shared/api";

function getTokenFromResponse(data) {
  return data?.access_token || data?.token || data?.accessToken || null;
}

async function parseErrorResponse(res) {
  const err = await res.json().catch(() => ({}));
  const detail = err?.detail;
  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "string") return first;
    if (first?.msg) return first.msg;
  }
  if (detail && typeof detail === "object" && detail.msg) return detail.msg;
  return err?.message || "Login failed";
}

async function loginWithEndpoint(endpoint, email, password, bodyType = "json") {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  const options =
    bodyType === "form"
      ? {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ username: email, password }).toString(),
          signal: controller.signal,
        }
      : {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          signal: controller.signal,
        };

  let res;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, options);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Login request timed out. Check backend and try again.");
    }
    throw new Error("Unable to reach server. Check backend URL and CORS.");
  } finally {
    clearTimeout(timeoutId);
  }

  if (!res.ok) {
    throw new Error(await parseErrorResponse(res));
  }

  const data = await res.json();
  const token = getTokenFromResponse(data);
  if (!token) {
    throw new Error("Login succeeded but no token was returned");
  }

  localStorage.setItem("companyToken", token);
  return { success: true, token };
}

/**
 * Login a company user with form-encoded credentials
 */
export async function loginCompany(email, password) {
  // Try common backend contracts in order.
  const attempts = [
    ["/company/login", "form"], // OAuth2-style username/password
    ["/company/login", "json"], // JSON body on same endpoint
    ["/company/login-json", "json"], // Legacy JSON endpoint
  ];

  let lastError = null;
  for (const [endpoint, bodyType] of attempts) {
    try {
      return await loginWithEndpoint(endpoint, email, password, bodyType);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Login failed");
}

/**
 * Login a company user with JSON credentials
 */
export async function loginCompanyJSON(email, password) {
  return loginWithEndpoint("/company/login-json", email, password);
}

/**
 * Logout company user
 */
export function logoutCompany() {
  localStorage.removeItem("companyToken");
}

/**
 * Fetch current company profile
 */
export async function fetchCompanyProfile() {
  const response = await companyApi.get("/company/me");
  return response.data;
}

export default {
  loginCompany,
  loginCompanyJSON,
  logoutCompany,
  fetchCompanyProfile,
};

