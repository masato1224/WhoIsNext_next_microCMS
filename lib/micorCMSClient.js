import { createClient } from "microcms-js-sdk";

export const getClient = () => {
  return createClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY
  });
};
