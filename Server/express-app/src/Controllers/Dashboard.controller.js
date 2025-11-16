import * as DashboardService from "../services/dashboard.service.js";
import { success } from "../utils/response.js";

export const summary = async (req, res, next) => {
  try {
    const data = await DashboardService.summary(req.user.id);
    return success(res, data);
  } catch (err) {
    next(err);
  }
};
