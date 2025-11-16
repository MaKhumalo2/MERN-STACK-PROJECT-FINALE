import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const register = async ({ name, email, password }) => {
  const hashed = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashed]
  );

  return result.rows[0];
};

export const login = async ({ email, password }) => {
  const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (user.rows.length === 0) throw new Error("User not found");

  const valid = await comparePassword(password, user.rows[0].password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.rows[0].id, email: user.rows[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token };
};
