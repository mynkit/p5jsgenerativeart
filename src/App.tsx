import p5 from 'p5';
import { ReactP5Wrapper } from 'react-p5-wrapper';

const App = () => {
  return (
    <div className="App">
      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
    </div>
  );
}

const sketch = (p: p5) => {
  let width: number;
  let height: number;
  let x: number;
  let y: number;
  let r: number;
  let theta: number;
  let alpha: number;
  let time: number;
  let penSpeed: number;
  let sizeTras: number;

  p.setup = () => {
    width = p.windowWidth;
    height = p.windowHeight;
    console.log(width, height);
    p.createCanvas(width, height);
    p.fill(0);
    x = width / 2;
    y = height / 2;
    r = 0;
    theta = 0;
    alpha = 0;
    time = 0;
    penSpeed = 1.5;
    sizeTras = p.min(width, height) / 1000;
    p.strokeWeight(p.min(sizeTras, 1));
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