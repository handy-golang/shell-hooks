import { getToken } from '@/utils/utils';
import { Encrypt } from '@/config';

export const uploadParam = {
  action: '/private/upload_file',
  headers: {
    'Auth-Token': getToken(),
    'Auth-Encrypt': Encrypt('/private/upload_file'),
  },
};
