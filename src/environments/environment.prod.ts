const PROTOCOL = 'https';
const DOMAIN = 'siddiqsons.urapptech.com';
const PORT = '';
const TransformedPort = PORT ? `:${PORT}` : '';

export const environment = {
  production: true,
  baseURL: `${PROTOCOL}://${DOMAIN}${TransformedPort}`,
  tenant: 'f835fb60-45c1-415b-b8ad-e7efbdfe9b86',
};
