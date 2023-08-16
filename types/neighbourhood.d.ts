interface Neighbourhood {
  id: number
  name: string
  slug: string
  type: string
  status: string
  image: string
  units_count: number
  coords: Coord[]
  videos: Video[]
  images: string[]
  min_down_payment: number
  min_month_payment: number
  min_start_price: number
  projects_count: number
}

interface Coord {
  lat: number
  lng: number
}

interface Video {
  id: number
  location_id: number
  url: string
  created_at: string
  updated_at: string
}

interface NeighbourhoodAllowedInclude {}
