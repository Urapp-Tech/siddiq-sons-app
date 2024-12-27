import { environment } from './environment';

export const API_PATHS = {
  loginUser() {
    const url = new URL(
      `/api/v1/admin/back-office-user/login`,
      environment.baseURL
    );
    return url.toString();
  },

  getCabins(tenant: string, branch: string, page = 0, size = 10, search = '') {
    const url = new URL(`/api/v1/admin/cabin/list`, environment.baseURL);
    url.searchParams.append('tenant', tenant);
    url.searchParams.append('branch', branch);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    if (search) url.searchParams.append('search', search.toString());
    return url.toString();
  },

  addCabin() {
    const url = new URL(`/api/v1/admin/cabin/create`, environment.baseURL);
    return url.toString();
  },
};
