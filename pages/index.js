import Layout from "../components/layout";
import NaviBar from "../components/NaviBar";
import Buttons from "../components/Buttons";
import NameCard from "../components/NameCard";
import { useAppState } from "../fooks/useAppState";
import { useEffect, useState } from "react";
import { createClient } from "microcms-js-sdk"; //ES6

export default function IndexPage() {
  // TODO: メンバー情報は他で持った方がよさそう
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const client = createClient({
      serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN, // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
      apiKey: process.env.NEXT_PUBLIC_API_KEY
    });
    const fetchData = async () => {
      const result = await client.get({
        endpoint: "members",
        queries: { fields: "name,color" }
      });
      setMembers(result.contents);
    };
    fetchData();
  }, []);

  const [name, style, chooseMember] = useAppState(members);

  return (
    <Layout>
      <div className="App">
        <NaviBar appName="Who's Next?" />
        <Buttons startOnClick={() => chooseMember()} />
        <NameCard color={style} name={name} />
      </div>
    </Layout>
  );
}
