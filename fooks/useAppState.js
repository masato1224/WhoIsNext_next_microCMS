import { useState } from "react";
import { useConditionalTimeout } from "beautiful-react-hooks";

export const useAppState = (members) => {
  const [member, setMember] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isSlowDown, setIsSlowDown] = useState(false);

  // 高速ルーレット
  // 2秒間回る
  useConditionalTimeout(
    () => {
      //ループを止める
      clearInterval(intervalId);
      // 遅いルーレットを始める
      setIntervalId(
        setInterval(() => {
          setMember(chooseMemberRandomly(members));
        }, 700)
      );
      // フラグを立てる
      setIsSlowDown(true);
      setIsStarted(false);
    },
    2000,
    isStarted
  );

  useConditionalTimeout(
    () => {
      stopToChoose(intervalId, setIsStarted);
      setIsSlowDown(false);
    },
    3000,
    isSlowDown
  );

  const chooseMember = startToChoose(
    setIntervalId,
    setMember,
    setIsStarted,
    members
  );

  return [member.name, member.style, chooseMember];
};

function startToChoose(setIntervalId, setMember, setIsStarted, members) {
  return () => {
    setIntervalId(
      setInterval(() => {
        setMember(chooseMemberRandomly(members));
      }, 300)
    );
    // TODO: idで指定しているところもっと上手くできないか？テストが書きにくい
    document.getElementById("startButton").disabled = true;
    document.getElementById("nameCard").classList.remove("selected");
    setIsStarted(true);
  };
}

function stopToChoose(intervalId, setIsStarted) {
  clearInterval(intervalId);
  // TODO: idで指定しているところもっと上手くできないか？テストが書きにくい
  document.getElementById("startButton").disabled = false;
  document.getElementById("nameCard").classList.add("selected");
  setIsStarted(false);
}

export function chooseMemberRandomly(members) {
  if (!members) {
    return { name: "", style: { backgroundColor: "#ffffff" } };
  }
  const member =
    members[Math.floor(Math.random() * Math.floor(members.length))];
  return { name: member.name, style: { backgroundColor: member.color } };
}
