import { createPool } from "mysql2/promise";

let pool: any = null;

if (!pool)
  pool = createPool({
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    port: parseInt(process.env.DB_PORT || ""),
    database: process.env.DB_DATABASE || "",
  });

export { pool };
