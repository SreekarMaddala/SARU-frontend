import { companyApi, BASE_URL } from "../../shared/api";

function getTokenFromResponse(data) {
  return data?.access_token || data?.token || data?.accessToken || null;
}

async function parseErrorResponse(res) {
  const err = await res.json().catch(() => ({}));
  return err.detail || err.message || "Login failed";
}

async function loginWithEndpoint(endpoint, email, password) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

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
  try {
    // Preferred endpoint in current backend contract.
    return await loginWithEndpoint("/company/login", email, password);
  } catch (error) {
    // Backward-compat fallback used by older backend builds.
    return loginWithEndpoint("/company/login-json", email, password).catch(
      () => {
        throw error;
      }
    );
  }
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

