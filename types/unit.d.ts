interface Unit {
  id: number
  title: string
  slug: string
  slugs: Slug
  price: number
  bedroom: number
  bathroom: number
  area: number | string
  address: string
  description: string
  short_description: string
  status: string
  lat: number
  lng: number
  likes_count: number
  keywords: string
  duration: number
  type: string
  sale_type: string
  flag: string
  min_month_payment: number | string
  min_down_payment: number | string
  main_image: string
  images: string[]
  city: string
  favorite: boolean
  developer: Developer
  project: Project
  agent: Agent
  UnitType: UnitType
  state: State
  amenities: Amenity[]
  videos: Video[]
  landmarks: Landmark[]
  payment_type: 'cash' | 'installments' | 'leasing'
}

interface Slug {
  ar: string
  en: string
}

interface Agent {
  id: number
  name: string
  mail: string
  about: string
  mobile: string
  units_count: any
  projects_count: any
  resale_count: number
  avatar: string
  company: Company
}

interface Company {
  id: number
  name: string
  description: string
  mobile: string
  address: string
  mail: string
  logo: any
  image: any
  agent_count: any
  total_resales_number: number
  project_count: any
}

interface State {
  id: number
  name: string
  slug: string
  type: string
  status: string
  image: string
  units_count: any
  coords: Coord2[]
  videos: any[]
  images: string[]
  min_down_payment: number
  min_month_payment: number
  min_start_price: number
}

type UnitAllowedInclude =
  | 'developer'
  | 'developerCount'
  | 'project'
  | 'projectCount'
  | 'agent'
  | 'agentCount'
  | 'unitType'
  | 'unitTypeCount'
  | 'amenities'
  | 'state'
  | 'stateCount'
  | 'city'
  | 'cityCount'
  | 'agent.company'
  | 'landmarks'
  | 'landmarksCount'
  | 'videos'
  | 'videosCount'
