import pool from "../config/db.js";

export const logActivity = async (userId, { category_id, quantity }) => {
  const factor = await pool.query(
    `SELECT value_per_unit FROM emission_factors WHERE category_id = $1`,
    [category_id]
  );

  if (factor.rows.length === 0) throw new Error("Invalid category");

  const co2 = quantity * factor.rows[0].value_per_unit;

  const result = await pool.query(
    `INSERT INTO activities (user_id, category_id, quantity, calculated_co2)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, category_id, quantity, co2]
  );

  return result.rows[0];
};

export const listActivities = async (userId) => {
  const result = await pool.query(
    `SELECT a.*, c.name AS category
     FROM activities a
     JOIN categories c ON c.id = a.category_id
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};
