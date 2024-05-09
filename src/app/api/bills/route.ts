import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/configs/db";

// export const revalidate = 10;

const mapDateOperators = {
  is: "=",
  after: ">",
  before: "<",
};

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") || "0");
  const filter = url.searchParams.has("filter")
    ? JSON.parse(url.searchParams.get("filter") || "")
    : null;
  const offset = 10 * page;
  const sortField = url.searchParams.has("sortField")
    ? JSON.parse(url.searchParams.get("sortField") || "")
    : { field: "id", sort: "desc" };

  let query = "";
  let where = "";
  if (!filter)
    query = `SELECT * FROM bills ORDER BY ${sortField.field} ${sortField.sort} LIMIT ${offset},10`;
  else {
    const {
      field,
      operator,
      value,
    }: { field: string; operator: string; value: string } = filter;

    if (field !== "createdAt" && field !== "delivery_date") {
      if (operator === "contains") where = `WHERE ${field} like '%${value}%'`;
      else where = `WHERE ${field} = ${value}`;
    } else {
      const date = value.substring(0, 10);
      const mapOperator =
        mapDateOperators[operator as keyof typeof mapDateOperators];
      where = `WHERE str_to_date(${field}, '%Y-%m-%d') ${mapOperator} str_to_date('${date}', '%Y-%m-%d')`;
    }

    query = `SELECT * FROM bills ${where} ORDER BY ${sortField.field} ${sortField.sort} LIMIT ${offset},10`;
  }

  const query2 = `SELECT count(*) total from bills ${where}`;

  const [resultRows] = await pool.query(query);
  const [resultTotal] = await pool.query(query2);

  const data = {
    rows: resultRows,
    total: resultTotal[0].total,
  };

  return NextResponse.json(data);
}
