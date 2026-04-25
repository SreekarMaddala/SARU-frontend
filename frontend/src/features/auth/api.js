import { companyApi, BASE_URL } from "../../shared/api";

/**
 * Login a company user with form-encoded credentials
 */
export async function loginCompany(email, password) {
  const res = await fetch(`${BASE_URL}/company/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Login failed");
  }

  const data = await res.json();
  const token = data.access_token;
  localStorage.setItem("companyToken", token);
  return { success: true, token };
}

/**
 * Login a company user with JSON credentials
 */
export async function loginCompanyJSON(email, password) {
  const res = await fetch(`${BASE_URL}/company/login-json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Login failed");
  }

  const data = await res.json();
  const token = data.access_token;
  localStorage.setItem("companyToken", token);
  return { success: true, token };
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

