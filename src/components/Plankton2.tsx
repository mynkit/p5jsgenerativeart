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

type MySketchProps = SketchProps & {
  yFreq: number;
  pause: boolean;
  clear: boolean;
};

const Plankton2 = () => {
  const [yFreq, setYFreq] = useState(1.5);
  const [yFreqIndex, setYFreqIndex] = useState(2);
  const [pause, setPause] = useState(true);
  const [clear, setClear] = useState(true);
  const yFreqList = [
    0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4,
    4.5, 5, 6, 7, 8,
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
        {/* 初期化 */}
        <Grid container alignItems={'center'} style={{padding: '15px', textAlign: 'center', position: 'absolute', top: '0px', left: '0px', width: '0'}}>
          <Grid item xs={1} alignItems={'center'} style={{textAlign: 'center', cursor: 'pointer'}} onClick={()=>{
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
  );
}

const sketch: Sketch<MySketchProps> = (p: P5CanvasInstance<MySketchProps>) => {
  let width: number = p.windowWidth;
  let height: number = p.windowHeight;
  let x: number = width / 2;
  let y: number = height / 2;
  let r: number = 0;
  let theta: number = 0;
  let time: number = 0;
  let penSpeed: number = 0.01;
  let yFreq: number = 1.5;
  let sizeTras: number = p.min(width, height) / 1400;
  let pause: boolean = true;
  let clear: boolean = true;

  p.setup = () => {
    p.createCanvas(width, height);
    p.fill(0);
    p.strokeWeight(p.min(sizeTras, 1));
  };

  p.updateWithProps = (props: any) => {
    if (props.yFreq) {
      yFreq = props.yFreq;
      penSpeed = p.min(1, 1 / yFreq);
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

    for (let i=0; i<5; i++) {
      let centerX, centerY;
      let newX, newY;

      r += p.random(-0.1, 0.2)*penSpeed;
      theta += 0.1*penSpeed;
      centerX = width/2 + 400.*p.sin(time*0.1) + 0.001*time*p.sin(time*0.001);
      centerY = height/2 + 20.*p.sqrt(p.sqrt(time/10))*p.sin(time * 0.1 * yFreq);

      time += 1*penSpeed;

      newX = centerX + 1*r*p.cos(theta);
      newY = centerY + 1*r*p.sin(theta)*0.5;

      // サイズ調整
      newX = width/2 + (newX - width/2) * sizeTras;
      newY = height/2 + (newY - height/2) * sizeTras;

      p.line(x, y, newX, newY);

      x = newX;
      y = newY;
    }
    
  }
}

export default Plankton2