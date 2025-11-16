import * as ActivityService from "../services/activity.service.js";
import { success } from "../utils/response.js";

export const logActivity = async (req, res, next) => {
  try {
    const data = await ActivityService.logActivity(req.user.id, req.body);
    return success(res, data, "Activity logged");
  } catch (err) {
    next(err);
  }
};

export const listActivities = async (req, res, next) => {
  try {
    const data = await ActivityService.listActivities(req.user.id);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};
