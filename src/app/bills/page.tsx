import Bills from "../components/bills/Bills";

export default async function BillsPage() {
  //   const res = await fetch(process.env.URL + `/api/bills?page=0`, {cache: "no-store",});
  const res = await fetch(process.env.URL + `/api/bills?page=0`, {
    next: { tags: ["bills-tag"] },
  });
  const data = await res.json();

  return <Bills initialData={data} />;
}
