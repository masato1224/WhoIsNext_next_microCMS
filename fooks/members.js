import { createClient } from "microcms-js-sdk"; //ES6

const client = createClient({
  serviceDomain: "spin-the-wheel", // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
  apiKey: "0a190dff-5ca5-42f8-aee9-27e33ed059cb"
});

export const fetchMembers = () => {
  client.get({
    endpoint: "members",
    queries: { fields: "name,color" }
  });
};
