import NaviBar from "../components/NaviBar";
import Buttons from "../components/Buttons";
import NameCard from "../components/NameCard";
import { useAppState } from "../hooks/useAppState";
import { getClient } from "../lib/micorCMSClient";

export default function IndexPage({ data }) {
  const [name, style, chooseMember] = useAppState(data);
  return (
    <>
      <div className="App">
        <NaviBar appName="🌝 Who's Next? 🌝" />
        <Buttons startOnClick={() => chooseMember()} />
        <NameCard color={style} name={name} />
      </div>
    </>
  );
}

// リクエストごとに呼び出されます。
export async function getServerSideProps() {
  // 外部APIからデータを取得します。
  const res = await getClient().get({
    endpoint: "members",
    queries: { fields: "name,color", limit: 50 }
  });
  const data = res.contents;
  // データをprops経由でページに渡します。
  return { props: { data } };
}
