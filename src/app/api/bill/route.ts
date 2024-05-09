import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/configs/db";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const [result] = await pool.query(`SELECT * FROM BILLS WHERE id= ${id}`);

  let bill = result[0];

  const [result2] = await pool.query(
    `SELECT * FROM DETAILS WHERE id_bill= ${id}`
  );

  bill["details"] = result2;

  return NextResponse.json(bill);
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  const {
    createdAt,
    deliveryDate,
    hour,
    name,
    note,
    phone,
    state,
    sign,
    details,
  } = data;

  const [result] = await pool.query("INSERT INTO bills SET ?", {
    createdAt,
    name,
    phone,
    hour,
    sign,
    note,
    state,
    delivery_date: deliveryDate,
  });

  const id = result.insertId;

  let insertSql = "";
  details.forEach((d: any) => {
    if (insertSql === "")
      insertSql = `(${id}, '${d.details}', ${d.price}, ${d.quantity})`;
    else
      insertSql =
        insertSql + `, (${id}, '${d.details}', ${d.price}, ${d.quantity})`;
  });

  await pool.query(
    `INSERT INTO details (id_bill, detail, price, quantity) VALUES ${insertSql}`
  );

  return NextResponse.json({ id });
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const data = await req.json();

    let columns = Object.entries(data)
      .filter((e) => e[0] !== "details")
      .map((e) => {
        return (
          (e[0] === "deliveryDate" ? "delivery_date" : e[0]) + "='" + e[1] + "'"
        );
      })
      .join(",");

    if (columns.length > 0) {
      const UpdateBillQuery = `UPDATE BILLS SET ${columns} WHERE id=${id}`;

      console.log(UpdateBillQuery);

      await pool.query(UpdateBillQuery);
    }

    let insertSql = "";

    const details = data?.details;
    if (details) {
      await pool.query(`DELETE FROM DETAILS WHERE id_bill= ${id}`);

      details.forEach((d: any) => {
        //const d = details[i];
        if (insertSql === "")
          insertSql = `(${id}, '${d.details}', ${d.price}, ${d.quantity})`;
        else
          insertSql =
            insertSql + `, (${id}, '${d.details}', ${d.price}, ${d.quantity})`;
      });

      const resp = await pool.query(
        `INSERT INTO details (id_bill, detail, price, quantity) VALUES ${insertSql}`
      );
    }

    return NextResponse.json({ id });
  } catch (e: any) {
    return new Response(e.message, {
      status: 500,
    });
  }
}
