import { companyApi } from "../../shared/api";

/**
 * Fetch all feedback entries
 */
export async function getAllFeedback() {
  const response = await companyApi.get("/feedback/");
  return response.data;
}

/**
 * Submit new feedback (single item via bulk endpoint)
 */
export async function submitFeedback(feedbackData) {
  const payload = Array.isArray(feedbackData) ? feedbackData : [feedbackData];
  const response = await companyApi.post("/feedback/bulk", payload);
  return response.data;
}

/**
 * Get feedback by ID
 * NOTE: backend route not implemented yet
 */
export async function getFeedbackById(id) {
  throw new Error("GET /feedback/:id is not implemented in backend");
}

/**
 * Delete feedback by ID
 * NOTE: backend route not implemented yet
 */
export async function deleteFeedback(id) {
  throw new Error("DELETE /feedback/:id is not implemented in backend");
}

export default {
  getAllFeedback,
  submitFeedback,
  getFeedbackById,
  deleteFeedback,
};