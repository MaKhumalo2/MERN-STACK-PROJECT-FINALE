import * as AuthService from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const register = async (req, res, next) => {
  try {
    const data = await AuthService.register(req.body);
    return success(res, data, "User registered");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await AuthService.login(req.body);
    return success(res, data, "Login successful");
  } catch (err) {
    next(err);
  }
};
