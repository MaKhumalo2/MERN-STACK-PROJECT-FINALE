import pool from "./config/db.js";
import { hashPassword } from "./utils/hash.js";

const createAdmin = async () => {
  const name = "Admin";
  const email = "admin@example.com";
  const password = await hashPassword("admin123");

  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );

  console.log("Admin user created!");
  process.exit();
};

createAdmin();
