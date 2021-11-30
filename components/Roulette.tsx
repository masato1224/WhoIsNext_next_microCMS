import { useState, useEffect, useRef } from "react";
import { Member } from "../interfaces/index";
import { Wheel, WheelDataType } from "react-custom-roulette";
import { css } from "linaria";
import { styled } from "linaria/react";
import party from "party-js";

const styles = {
  root: css`
    & > div {
      max-width: 70vh;
      max-height: 70vh;
      margin: 0 auto;
      z-index: 10;
    }
  `,
  spinning: css`
    margin-top: 33px !important;
    border-bottom: 0px !important;
    /* from : https://www.ccs1981.jp/blog/css%E3%81%A7%E8%89%B2%E3%82%93%E3%81%AA%E3%82%82%E3%81%AE%E3%82%92%E8%99%B9%E8%89%B2%E3%81%AB%E5%85%89%E3%82%89%E3%81%9B%E3%82%8B/*/
    background: linear-gradient(to right, Magenta, yellow, Cyan, Magenta) 0%
      center/200%;
    animation: gaming 0.4s linear infinite;
    @keyframes gaming {
      0% {
        background-position-x: 20%;
      }
      100% {
        background-position-x: 200%;
      }
    }
  `,
  spinningBack: css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    animation: mood 11.35s linear;
    @keyframes mood {
      6% {
        background: rgba(0, 0, 0, 0.8);
      }
      94% {
        background: rgba(0, 0, 0, 0.8);
      }
      100% {
        background: rgba(255, 255, 255, 0);
      }
    }
  `
};

const Button = styled.div`
  /* from: https://jajaaan.co.jp/css/button/*/
  margin: 30px auto;
  width: 50vw;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.4;
  position: relative;
  padding: 0.5rem 2rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #fff;
  border-radius: 0.5rem;
  background-color: #d20010;
  border-bottom: 5px solid #9f000c;
  border-radius: 100vh;
  z-index: 10;
  &:hover {
    color: #fff;
    margin-top: 33px;
    border-bottom: 0px solid #9f000c;
    border-radius: 100vh;
  }
`;

const Roulette = ({ members }: { members: Member[] }) => {
  const [rouletteData, setRouletteData] = useState<WheelDataType[]>([]);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const voiceTxtElm = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setRouletteData(
      members.map((member) => {
        return {
          option: member.name,
          style: { backgroundColor: member.color }
        };
      })
    );
  }, [members]);

  useEffect(() => {
    // @ts-ignore
    const rec = new webkitSpeechRecognition();
    rec.continuous = false
    rec.interimResults = false
    rec.lang = "ja-JP";

    rec.onresult = (e:any) => {
      rec.stop()

      for (var i = e.resultIndex; i < e.results.length; i++) {
        if (!e.results[i].isFinal) continue;

        const { transcript } = e.results[i][0];
        console.log(transcript)
        voiceTxtElm.current!.innerHTML = transcript;
        if(['まわれ', '回れ'].includes(transcript)){
          !isSpinning && setIsSpinning(!isSpinning);
        }
      }
    }
    rec.onaudiostart = () => { 
      setIsVoiceActive(!isVoiceActive);
    }
    rec.onend = () => { rec.start(); }

    rec.start()
  }, []);

  useEffect(() => {
    isVoiceActive && (voiceTxtElm.current!.innerHTML = '準備OK...');
  }, [isVoiceActive]);


  return (
    <>
      <div className={styles.root}>
        <Wheel
          mustStartSpinning={isSpinning}
          onStopSpinning={() => {
            setIsSpinning(!isSpinning);
            party.confetti(party.Rect.fromScreen(), {
              count: 1000,
              shapes: ["square", "star"]
            });
          }}
          prizeNumber={Math.floor(Math.random() * rouletteData.length)}
          data={rouletteData}
          fontSize={20}
          textColors={["#FFF"]}
          outerBorderColor={"#DDD"}
          outerBorderWidth={5}
          radiusLineColor={"#fff"}
          radiusLineWidth={2}
          rotationTimeCoefficient={0.20}
        />
      </div>
      <Button
        className={isSpinning ? styles.spinning : ""}
        onClick={() => {
          !isSpinning && setIsSpinning(!isSpinning);
        }}
      >
        <span ref={voiceTxtElm}></span>
      </Button>
      <p className={isSpinning ? styles.spinningBack : ""}></p>
    </>
  );
};
export default Roulette;
