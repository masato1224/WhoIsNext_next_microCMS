import Layout from "../components/layout";
import NaviBar from "../components/NaviBar";
import Buttons from "../components/Buttons";
import NameCard from "../components/NameCard";
import { useAppState } from "../fooks/useAppState";
import { useEffect } from "react";

export default function IndexPage() {
  // TODO: メンバー情報は他で持った方がよさそう
  const [name, style, chooseMember] = useAppState();

  useEffect(() => {}, []);
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
