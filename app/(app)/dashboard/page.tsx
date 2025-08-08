import { supabaseServer } from "@/lib/supabaseClient"

export default async function Dashboard() {
  const supabase = supabaseServer()
  const { data: counts } = await supabase.rpc('carpet_counts_by_status')
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {counts?.map((c: any) => (
          <div key={c.status} className="border rounded-2xl p-4">
            <div className="text-sm text-gray-500">{c.status}</div>
            <div className="text-2xl font-bold">{c.count}</div>
          </div>
        )) || <div>No data yet</div>}
      </div>
    </div>
  )
}
