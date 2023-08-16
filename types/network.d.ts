interface MetaLink {
  url: string | null
  label: string
  active: boolean
}

interface Meta {
  current_page: number
  from: number
  last_page: number
  links: MetaLink[]
  path: string
  per_page: number
  to: number
  total: number
}

interface PayloadLink {
  first: string
  last: string
  next: string
  prev: string | null
}

interface NetworkResponse<T = unknown> {
  alias: string
  data: T
  links: PayloadLink
  meta: Meta
  title: string
}

interface NetworkFilter {
  key: string
  value: string
}

interface RequestPayload<T = unknown> {
  slug?: string
  include?: T
  per_page?: number | string
  page?: number | string
  additional?: string
  sort?: string
  filters?: NetworkFilter[]
  bounds?: any
}
