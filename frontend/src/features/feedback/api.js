import { companyApi } from "../../shared/api";

/**
 * Fetch all feedback entries
 */
export async function getAllFeedback() {
  const response = await companyApi.get("/feedback");
  return response.data;
}

/**
 * Submit new feedback
 */
export async function submitFeedback(feedbackData) {
  const response = await companyApi.post("/feedback", feedbackData);
  return response.data;
}

/**
 * Get feedback by ID
 */
export async function getFeedbackById(id) {
  const response = await companyApi.get(`/feedback/${id}`);
  return response.data;
}

/**
 * Delete feedback by ID
 */
export async function deleteFeedback(id) {
  const response = await companyApi.delete(`/feedback/${id}`);
  return response.data;
}

export default {
  getAllFeedback,
  submitFeedback,
  getFeedbackById,
  deleteFeedback,
};

