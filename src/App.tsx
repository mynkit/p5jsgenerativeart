import React, { useEffect, useState } from "react";
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps,
  Sketch
} from "react-p5-wrapper";
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type MySketchProps = SketchProps & {
  penSpeed: number;
};

const App = () => {
  const [penSpeed, setPenSpeed] = useState(3);
  
  return (
    <div className="App">
      <Grid style={{position: 'fixed', width: '500px', maxWidth: '100%', height: '100vh'}}>
        <Grid container alignItems={'center'} style={{padding: '10px', textAlign: 'center', position: 'absolute', bottom: '0px'}}>
        <Grid item xs={12-3.5} />
          <Grid item xs={1} style={{textAlign: 'center'}} onClick={()=>{
            if (penSpeed>1) {
              setPenSpeed(v=>v-0.5);
            }
          }}>
            <ArrowBackIcon/>
          </Grid>
          <Grid item xs={1.5} alignItems={'center'}>
            <p style={{fontSize: '15pt'}}>{penSpeed}</p>
          </Grid>
          <Grid item xs={1} alignItems={'center'} onClick={()=>{
            setPenSpeed(v=>v+0.5);
          }}>
            <ArrowForwardIcon/>
          </Grid>
        </Grid>
      </Grid>
      <ReactP5Wrapper sketch={sketch} penSpeed={penSpeed}></ReactP5Wrapper>
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

  p.setup = () => {
    p.createCanvas(width, height);
    p.fill(0);
    p.strokeWeight(p.min(sizeTras, 1));
  };

  p.updateWithProps = (props: any) => {
    if (props.penSpeed) {
      penSpeed = props.penSpeed;
    }
  };

  p.draw = () => {
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

export default App;