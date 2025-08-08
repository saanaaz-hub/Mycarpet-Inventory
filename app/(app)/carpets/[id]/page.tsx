import { supabaseServer } from '@/lib/supabaseClient'
import Link from 'next/link'

export default async function CarpetDetail({ params }: { params: { id: string } }) {
  const supabase = supabaseServer()
  const { data: carpet } = await supabase.from('carpets').select('*').eq('id', params.id).single()
  if (!carpet) return <div className="p-6">Not found</div>
  const publicUrl = `${process.env.APP_BASE_URL}/c/${carpet.public_id}`
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{carpet.sku} – {carpet.title}</h1>
        <div className="flex gap-3">
          <a className="underline" href={`/api/qr?t=${encodeURIComponent(publicUrl)}`} target="_blank">Download QR</a>
          <Link className="underline" href={`/c/${carpet.public_id}`} target="_blank">View Public</Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-gray-500">Status</div>
          <div className="font-medium">{carpet.status}</div>
          <div className="mt-3 text-sm text-gray-500">Location</div>
          <div className="font-medium">{carpet.location_id ?? '—'}</div>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-gray-500">Private notes</div>
          <p className="text-sm whitespace-pre-line">{carpet.private_notes ?? ''}</p>
        </div>
      </div>
    </div>
  )
}
