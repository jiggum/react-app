import api from 'api';

export function get() {
  const params = {
    format: 'src',
    type: 'gif',
  };
  return api.get('/', { params });
}
