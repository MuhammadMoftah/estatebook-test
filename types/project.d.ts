interface Project {
  sdcs: any[]
  id: number
  name: string
  slug: string
  slugs: Slug
  description: string
  address: string
  duration: string
  min_month_payment: string
  min_down_payment: string
  start_price: string
  start_delivery: string
  favorite: boolean
  logo: string
  images: string[]
  full_images_data: FullImagesDaum[]
  developer: Developer
  location: Location
  units: any[]
  amenities: Amenity[]
  unit_types: UnitType[]
  flag: string
  roads: Road[]
  landmarks: Landmark[]
  videos: Video[]
  payment_method: string
  installment_years: number
  coords: Coord2[]
  phases: any[]
  master_layouts: any[]
  delivery_year: string
}

interface FullImagesDaum {
  id: number
  image: string
}

interface Developer {
  id: number
  name: string
  description: string
  slug: string
  mobile: any
  email: any
  website: any
  address: string
  status: string
  projects_count: number
  resale_count: number
  logo: string
  cover_image: string
}

interface Location {
  id: number
  name: string
  slug: string
  type: string
  status: string
  image: string
  units_count: any
  coords: Coord[]
  videos: any[]
  images: any
  min_down_payment: number
  min_month_payment: number
  min_start_price: number
}

interface Coord {
  lat: number
  lng: number
}

interface Amenity {
  id: number
  name: string
  slug: string
  description: string
  status: string
  links: Link[]
  logo: string
}

interface Link {
  id: number
  type: string
  link: string
}

interface UnitType {
  id: number
  name: string
  slug: string
  status: string
  icon: string
}

interface Road {
  id: number
  name: string
  distance: string
}

interface Landmark {
  id: number
  title: string
  lat: string
  lng: string
  icon: any
}

interface Video {
  id: number
  project_id: number
  url: string
  created_at: string
  updated_at: string
}

interface Coord2 {
  lat: number
  lng: number
}

type ProjectFilterKey =
  | 'name'
  | 'location_id'
  | 'units.id'
  | 'id'
  | 'developer_id'
  | 'flag'
  | 'price_range'
  | 'duration_range'
  | 'down_payment_range'
  | 'month_payment_range'
  | 'new_project'

type ProjectAllowedInclude =
  | 'developer'
  | 'developerCount'
  | 'location'
  | 'locationCount'
  | 'amenities'
  | 'amenitiesCount'
  | 'unitTypes'
  | 'unitTypesCount'
  | 'units'
  | 'unitsCount'
  | 'roads'
  | 'roadsCount'
  | 'landmarks'
  | 'landmarksCount'
  | 'phases'
  | 'phasesCount'
