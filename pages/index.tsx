import dynamic from "next/dynamic";
import NaviBar from "../components/NaviBar";
import { getClient } from "../lib/micorCMSClient";
import { Member } from "../interfaces/index";

const Roulette = dynamic(() => import("../components/Roulette"), {
  ssr: false,
});

export default function IndexPage({members}:{members:Member[]}) {
  return (
    <>
      <div className="App">
        <NaviBar appName="πγγΎγγοΌγγ¨ε«γΌγπ" />
        <Roulette members={members} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res: { contents: [] } = await getClient().get({
    endpoint: "members",
    queries: { fields: "name,color", limit: 50 },
  });
  const members = res.contents;
  return { props: { members: members } };
}
