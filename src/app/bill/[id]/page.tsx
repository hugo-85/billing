import Bill from "@/app/components/bill/Bill";

export default async function BillPage({ params }: { params: { id: string } }) {
  const resp = await fetch(process.env.URL + `/api/bill?id=${params.id}`);
  const data = await resp.json();

  return <Bill billData={data} />;
}
