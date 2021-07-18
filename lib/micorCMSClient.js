import { createClient } from "microcms-js-sdk"; //ES6

export const getClient = () => {
  return createClient({
    serviceDomain: process.env.SERVICE_DOMAIN, // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
    apiKey: process.env.API_KEY
  });
};
