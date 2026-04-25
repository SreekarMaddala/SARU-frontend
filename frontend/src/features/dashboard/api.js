import { companyApi } from "../../shared/api";

/**
 * Fetch all feedback for the current company
 */
export async function fetchFeedbacks() {
  const response = await companyApi.get("/feedback");
  return response.data;
}

/**
 * Upload a CSV file with feedback data
 */
export async function uploadCSV(file) {
  const formData = new FormData();
  formData.append("file", file);
  const response = await companyApi.post("/feedback/upload_csv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

/**
 * Import feedback from Google Forms sheet
 */
export async function importGoogleForms(sheetId) {
  const response = await companyApi.post(
    `/feedback/import_google_forms?sheet_id=${encodeURIComponent(sheetId)}`
  );
  return response.data;
}

/**
 * Import feedback from unread emails
 */
export async function importEmails() {
  const response = await companyApi.post("/feedback/import_emails");
  return response.data;
}

/**
 * Import feedback from Twitter mentions
 */
export async function importTwitter(handle) {
  const response = await companyApi.post(
    `/feedback/import_twitter?handle=${encodeURIComponent(handle)}`
  );
  return response.data;
}

export default {
  fetchFeedbacks,
  uploadCSV,
  importGoogleForms,
  importEmails,
  importTwitter,
};

