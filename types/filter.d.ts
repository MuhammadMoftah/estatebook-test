type OptionalKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type Stores = Record<StoreType, FilterDescriptor>

type StoreType = 'project' | 'developer' | 'blog' | 'unit' | 'neighbourhood'

interface FilterPayload {
  id: number
  key: ProjectFilterKey
  value: number | string | (number | string)[]
  multiple: boolean
  store: Stores
}
interface FilterDescriptor {
  name: string
  filters: FilterPayload[]
  rawFilter: string
}
interface FilterStoreActions {
  set(
    payload: OptionalKey<FilterPayload, 'multiple'>,
    store: StoreType
  ): Promise<void> | void
  get(
    key: string,
    store: StoreType
  ): Promise<FilterPayload> | FilterPayload | Promise<null> | null
  getAll(store: StoreType): Promise<FilterPayload[]> | FilterPayload[]
  getRawFilter(store: StoreType, prefix?: string): string
  has(key: string, store: StoreType): Promise<boolean> | boolean
  replace(
    key: string,
    store: StoreType,
    payload: Partial<Omit<FilterPayload, 'id' | 'key'>>
  ): Promise<void> | void
  remove(key: string, store: StoreType): Promise<void> | void
  toLocal(store?: StoreType): Promise<void> | void
  load(): Promise<void> | void
  [key: symbol]: (...args: any[]) => Promise<unknown> | unknown
}
