import React, { useState, useEffect } from 'react';
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps,
  Sketch
} from "react-p5-wrapper";
import Grid from '@mui/material/Grid';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type MySketchProps = SketchProps & {
  penSpeed: number;
  pause: boolean;
  clear: boolean;
};

type Props = {
  start: boolean;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  index: number;
}

const Plankton3: React.FC<Props> = ({ start, setTarget, index }) => {
  const [pause, setPause] = useState(!start);
  const [clear, setClear] = useState(!start);
  const [yFreq, setYFreq] = useState(2.5);
  const [yFreqIndex, setYFreqIndex] = useState(index);
  const yFreqList = [
    2, 2.5, 3, 4, 5, 6
  ];
  useEffect(() => {
    if(yFreqIndex>=0 && yFreqIndex<yFreqList.length) {
      setYFreq(yFreqList[yFreqIndex])
    }else{
      console.log(`error.. yFreqIndex: ${yFreqIndex} is out of range.`);
    }
  }, [yFreqIndex])
  return (
    <div>
      <Grid style={{position: 'fixed', width: '100%', maxWidth: '100%', height: '100%'}}>
        {/* ホーム画面に戻る */}
        <Grid container alignItems={'center'} style={{padding: '15px', textAlign: 'center', position: 'absolute', top: '0px', left: '0px', width: '0', zIndex: '10'}}>
          <Grid item xs={1} alignItems={'center'} style={{textAlign: 'center', cursor: 'pointer'}} onClick={()=>{
            setTarget('');
            window.history.replaceState(null,'',`/`);
          }}>
            <ArrowBackIcon fontSize="large"/>
          </Grid>
        </Grid>
        {/* 初期化 */}
        <Grid container alignItems={'center'} style={{padding: '15px', textAlign: 'center', position: 'absolute', top: '0px', right: '0px', width: '750px', maxWidth: '100%'}}>
          <Grid item xs={11} />
          <Grid item xs={1} style={{textAlign: 'center', cursor: 'pointer'}} alignItems={'center'} onClick={()=>{
            setClear(true);
            setPause(true);
          }}>
            <RestartAltIcon fontSize="large"/>
          </Grid>
        </Grid>
        {/* 再生停止制御 */}
        <Grid container alignItems={'center'} style={{padding: '15px', textAlign: 'center', position: 'absolute', bottom: '0px', left: '0px', width: '0', zIndex: '10', marginBottom: '20px'}}>
          <Grid item xs={1} alignItems={'center'} style={{textAlign: 'center', cursor: 'pointer'}} onClick={()=>{
            if(pause){setClear(false);}
            setPause(v=>!v);
          }}>
            {pause ? <PlayArrowIcon fontSize="large"/> : <PauseIcon fontSize="large"/>}
          </Grid>
        </Grid>
        {/* 処理速度変更 */}
        <Grid container alignItems={'center'} style={{padding: '15px', textAlign: 'center', position: 'absolute', bottom: '0px', right: '0px', width: '750px', maxWidth: '100%', marginBottom: '25px'}}>
          <Grid item xs={12-4.5} />
          <Grid item xs={1} style={{textAlign: 'center', cursor: 'pointer'}} onClick={()=>{
            if (yFreqIndex>0) {
              setYFreqIndex(v=>v-1);
            }
          }}>
            <p style={{fontSize: '15pt', margin: '0px'}}>{'◁'}</p>
          </Grid>
          <Grid item xs={2.5} style={{textAlign: 'center'}} alignItems={'center'}>
            <p style={{fontSize: '20pt', margin: '0px'}}>{yFreq}</p>
          </Grid>
          <Grid item xs={1} style={{textAlign: 'center', cursor: 'pointer'}} alignItems={'center'} onClick={()=>{
            if (yFreqIndex<yFreqList.length-1) {
              setYFreqIndex(v=>v+1);
            }
          }}>
            <p style={{fontSize: '15pt', margin: '0px'}}>{'▷'}</p>
          </Grid>
        </Grid>
      </Grid>
      <ReactP5Wrapper sketch={sketch} yFreq={yFreq} pause={pause} clear={clear}></ReactP5Wrapper>
    </div>
  )
}

const sketch: Sketch<MySketchProps> = (p: P5CanvasInstance<MySketchProps>) => {
  let width: number = p.windowWidth;
  let height: number = p.windowHeight;
  let x: number = width / 2;
  let y: number = height / 2;
  let r: number = 0;
  let theta: number = 0;
  let time: number = 0;
  let penSpeed: number = 1;
  let yFreq: number = 1.5;
  let sizeTras: number = p.min(width, height) / 1050;
  let pause: boolean = true;
  let clear: boolean = true;

  p.setup = () => {
    p.createCanvas(width, height);
    p.fill(0);
    p.strokeWeight(p.min(sizeTras, 1)*0.5);
  };

  p.updateWithProps = (props: any) => {
    if (props.yFreq) {
      yFreq = props.yFreq;
      penSpeed = p.min(1, p.sqrt(1 / yFreq));
    }
    if (props.pause!==undefined) {
      pause = props.pause;
    }
    if (props.clear!==undefined) {
      clear = props.clear;
    }
  };

  p.draw = () => {
    if (clear) {
      p.clear(255, 255, 255, 255);
      x = width / 2;
      y = height / 2;
      r = 0;
      theta = 0;
      time = 0;
      pause = true;
      return;
    }
    if (pause) {return;}

    for (let i=0; i<100; i++) {
      let centerX, centerY;
      let newX, newY;

      r += p.random(-0.01, 0.03)*penSpeed;
      theta += 0.025*penSpeed;
      centerX = width/2 + 3*110.*p.sin(time*0.1*yFreq);
      centerY = height/2 + 3*5.*(p.sqrt(time*0.008)*(p.cos(time*0.5)));

      time += 0.25*penSpeed;

      newX = centerX + r*p.cos(theta)*0.5;
      newY = centerY + r*p.sin(theta)*0.5;

      // サイズ調整
      newX = width/2 + (newX - width/2) * sizeTras;
      newY = height/2 + (newY - height/2) * sizeTras;

      p.line(x, y, newX, newY);

      x = newX;
      y = newY;
    }
    
  }
}

export default Plankton3