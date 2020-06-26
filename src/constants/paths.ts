export const Path = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  DASHBOARD: '/dashboard',
  LIST_TO_WATCH: '/dashboard/to-watch',
  LIST_WATCHED: '/dashboard/watched',
  SEARCH: '/dashboard/search',
  SEARCH_PARAM: (query: string) => `/dashboard/search?query=${query}`,
  SEARCH_RESULT: (id: string = ':id') => `/dashboard/search/${id}`,
  FEATURES: '/dashboard/features',
};
