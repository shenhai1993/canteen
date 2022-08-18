import { request } from '@umijs/max';

export async function login(params: { username: string; password: string }) {
  return request('auth/login', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function me() {
  return request('auth/me', {
    method: 'POST',
  });
}

export async function logout() {
  return request('auth/logout', {
    method: 'POST',
  });
}

export async function exportExcel(params:{timeSlot_id: string,company_id: string}) {
  return request('export/export_excel_demo', {
    method: 'POST',
    responseType: 'blob',
    data: {
      ...params,
    },
  });
}

export async function importExcel(formData:any) {
  return request('export/import_excel_demo', {
    method: 'POST',
    headers:{
      'Content-Type':'multipart/form-data'
    },
    data: formData
  });
}
