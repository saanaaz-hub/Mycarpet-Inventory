import { supabaseServer } from '@/lib/supabaseClient'

export default async function PublicCarpet({ params }: { params: { publicId: string } }) {
  const supabase = supabaseServer()
  const { data: carpet } = await supabase.from('carpets').select('id, public_id, sku, title, description, origin, material, size_cm, year_estimated, condition, price_sek, currency, cover_image_url, public_notes').eq('public_id', params.publicId).single()
  if (!carpet) return <div className="p-6">Not found</div>
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{carpet.title ?? carpet.sku}</h1>
      <div className="text-sm text-gray-600">Origin: {carpet.origin} • Size: {carpet.size_cm} • Material: {carpet.material}</div>
      {carpet.cover_image_url && (<img src={carpet.cover_image_url} alt={carpet.title ?? ''} className="rounded-2xl w-full" />)}
      <p className="whitespace-pre-line">{carpet.description ?? ''}</p>
      {carpet.public_notes && (<div className="border rounded-2xl p-4"><b>Notes:</b> {carpet.public_notes}</div>)}
      <div className="border rounded-2xl p-4">
        <div className="text-sm text-gray-600">Interested?</div>
        <div className="text-sm">WhatsApp: 0704207608 • Email: info@mycarpet.se</div>
      </div>
    </div>
  )
}
