/*
  Uses Vite environment variables
  https://vitejs.dev/guide/env-and-mode.html
*/
const env = import.meta.env.MODE;

let envApiUrl = '';

if (env === 'production') {
	envApiUrl = `https://${import.meta.env.VITE_DOMAIN_PROD}`;
} else if (env === 'staging') {
	envApiUrl = `https://${import.meta.env.VITE_DOMAIN_STAG}`;
} else {
	envApiUrl = `http://${import.meta.env.VITE_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
export const appName = process.env.VITE_APP_NAME;
