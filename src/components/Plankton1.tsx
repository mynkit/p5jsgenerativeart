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
  penSpeed: number;
  pause: boolean;
  clear: boolean;
};

const Plankton1 = () => {
  const [penSpeed, setPenSpeed] = useState(1);
  const [penSpeedIndex, setPenSpeedIndex] = useState(0);
  const [pause, setPause] = useState(true);
  const [clear, setClear] = useState(true);
  const penSpeedList = [
    1, 5.25, 7.85, 9,
    10.5,
    12.6,
    15.6,
    Math.floor((20.85+0.3*Math.random()) * 100) / 100
  ];
  useEffect(() => {
    if(penSpeedIndex>=0 && penSpeedIndex<penSpeedList.length) {
      setPenSpeed(penSpeedList[penSpeedIndex])
    }else{
      console.log(`error.. penSpeedIndex: ${penSpeedIndex} is out of range.`);
    }
  }, [penSpeedIndex])

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
            if (penSpeedIndex>0) {
              setPenSpeedIndex(v=>v-1);
            }
          }}>
            <p style={{fontSize: '15pt', margin: '0px'}}>{'◁'}</p>
          </Grid>
          <Grid item xs={2.5} style={{textAlign: 'center'}} alignItems={'center'}>
            <p style={{fontSize: '20pt', margin: '0px'}}>{penSpeed}</p>
          </Grid>
          <Grid item xs={1} style={{textAlign: 'center', cursor: 'pointer'}} alignItems={'center'} onClick={()=>{
            if (penSpeedIndex<penSpeedList.length-1) {
              setPenSpeedIndex(v=>v+1);
            }
          }}>
            <p style={{fontSize: '15pt', margin: '0px'}}>{'▷'}</p>
          </Grid>
        </Grid>
      </Grid>
      <ReactP5Wrapper sketch={sketch} penSpeed={penSpeed} pause={pause} clear={clear}></ReactP5Wrapper>
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
  let alpha: number = 0;
  let time: number = 0;
  let penSpeed: number = 2;
  let sizeTras: number = p.min(width, height) / 1000;
  let pause: boolean = true;
  let clear: boolean = true;

  p.setup = () => {
    p.createCanvas(width, height);
    p.fill(0);
    p.strokeWeight(p.min(sizeTras, 1));
  };

  p.updateWithProps = (props: any) => {
    if (props.penSpeed) {
      penSpeed = props.penSpeed;
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
      alpha = 0;
      time = 0;
      pause = true;
      return;
    }
    if (pause) {return;}

    let acceleration = 1;

    if (penSpeed===1) {
      acceleration = 10;
    } else if (penSpeed<8) {
      acceleration = 3;
    } else if (penSpeed<15) {
      acceleration = 2;
    } else {
      acceleration = 1;
    }

    for (let i=0; i<acceleration; i++) {
      let centerX, centerY;
      let newX, newY;

      r += p.random(-0.1, 0.2)*0.1*penSpeed;
      theta += 0.1*penSpeed;
      centerX = width/2 + 0.1*(0.05*time*p.sin(time*0.1) + 0.001*time*p.sin(time*0.01));
      centerY = height/2 - 0.05*(0.1*2.*p.sqrt(p.sqrt(time/10))*p.abs(p.sin(time * 0.05)) + 0.001*time*p.cos(time*0.001));

      centerY += 0.01*time;

      // 回転
      centerX = width/2 + p.cos(alpha)*(centerX-width/2) - p.sin(alpha)*(centerY-height/2);
      centerY = height/2 + p.sin(alpha)*(centerX-width/2) + p.cos(alpha)*(centerY-height/2);

      alpha = time*0.0004;
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

export default Plankton1