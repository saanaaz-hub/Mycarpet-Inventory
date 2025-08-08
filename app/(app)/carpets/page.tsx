import Link from 'next/link'
import { supabaseServer } from '@/lib/supabaseClient'

export default async function CarpetsPage() {
  const supabase = supabaseServer()
  const { data } = await supabase.from('carpets').select('*').order('created_at', { ascending: false }).limit(200)
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Carpets</h1>
        <a href="/api/export?entity=carpets" className="underline">Export CSV</a>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {data?.map((c: any) => (
          <Link key={c.id} href={`/carpets/${c.id}`} className="border rounded-2xl p-3">
            <div className="text-sm text-gray-500">{c.sku}</div>
            <div className="font-semibold">{c.title ?? 'Untitled'}</div>
            <div className="text-xs">Status: {c.status}</div>
          </Link>
        )) || <div>No carpets yet</div>}
      </div>
    </div>
  )
}
