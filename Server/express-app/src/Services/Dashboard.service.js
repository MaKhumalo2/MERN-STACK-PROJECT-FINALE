import pool from "../config/db.js";

export const summary = async (userId) => {
  const total = await pool.query(
    `SELECT SUM(calculated_co2) AS total FROM activities WHERE user_id = $1`,
    [userId]
  );

  const byCategory = await pool.query(
    `SELECT c.name, SUM(a.calculated_co2) AS total
     FROM activities a
     JOIN categories c ON c.id = a.category_id
     WHERE user_id = $1
     GROUP BY c.name`,
    [userId]
  );

  return {
    total: total.rows[0].total || 0,
    categories: byCategory.rows,
  };
};
