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
  projects: Project[]
  amenities: Amenity[]
  units: any[]
}

interface Project {
  sdcs: any[]
  id: number
  name: string
  slug: string
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
  flag: string
  videos: Video[]
  payment_method: string
  installment_years: number
  coords: Coord[]
  phases: any[]
  master_layouts: any[]
}

interface FullImagesDaum {
  id: number
  image: string
}

interface Video {
  id: number
  project_id: number
  url: string
  created_at: string
  updated_at: string
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
  logo: string
}

type DeveloperFilterKey =
  | 'name'
  | 'id'
  | 'units.unitType.id'
  | 'units.in_location'

type DeveloperAllowedInclude =
  | 'projects'
  | 'projectsCount'
  | 'amenities'
  | 'amenitiesCount'
  | 'units'
  | 'unitsCount'
  | 'units.unitType'
  | 'units.state'
  | 'units.project'
  | 'units.agent'
