import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

export interface Pagination {
  page: number
  pageSize: number
  total: number
}
export interface FirebasePagination {
  page: number
  limit: number
  startAfter?: QueryDocumentSnapshot<DocumentData>
}
