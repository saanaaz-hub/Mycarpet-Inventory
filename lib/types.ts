export type CarpetStatus =
  | 'received' | 'in_photography' | 'in_restoration' | 'in_inventory'
  | 'reserved' | 'on_consignment' | 'in_transit' | 'delivered' | 'returned' | 'archived'

export interface Carpet {
  id: string
  sku: string
  public_id: string
  title?: string
  description?: string
  origin?: string
  material?: string
  size_cm?: string
  year_estimated?: number
  condition?: string
  price_sek?: number
  currency?: string
  owner?: string
  tags: string[]
  status: CarpetStatus
  location_id?: string
  cover_image_url?: string
  public_notes?: string
  private_notes?: string
  created_at: string
  updated_at: string
}
