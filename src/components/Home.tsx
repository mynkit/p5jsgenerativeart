import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type HomeProps = {
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex1: React.Dispatch<React.SetStateAction<number>>;
  setIndex2: React.Dispatch<React.SetStateAction<number>>;
  setIndex3: React.Dispatch<React.SetStateAction<number>>;
}

const randint = (min: number, max: number) => {
  return Math.floor( Math.random() * (max + 1 - min) ) + min;
}

const Home: React.FC<HomeProps> = ({ setTarget, setStart, setIndex1, setIndex2, setIndex3 }) => {
  const [randints, setRandints] = useState([1,1,1]);
  const imgClick = (target: string)  => {
    setTarget(target);
    setStart(true);
    window.history.replaceState(null,'',`/${target}`);
  }
  const reload = () => {
    setRandints([
      randint(1,3),
      randint(1,3),
      randint(1,3),
    ]);
  }
  useEffect(() => {
    reload();
  }, [])
  useEffect(() => {
    switch (randints[0]) {
      case 1:
        setIndex1(0);
        break;
      case 2:
        setIndex1(5);
        break;
      case 3:
        setIndex1(6);
        break;      
    }
    switch (randints[1]) {
      case 1:
        setIndex2(2);
        break;
      case 2:
        setIndex2(7);
        break;
      case 3:
        setIndex2(3);
        break;      
    }
    switch (randints[2]) {
      case 1:
        setIndex3(1);
        break;
      case 2:
        setIndex3(4);
        break;
      case 3:
        setIndex3(5);
        break;      
    }
  }, [randints])
  return (
    <>
      <Grid style={{position: 'relative', width: '100%', maxWidth: '100%', height: '100%'}}>
        {/* 初期化 */}
        <Grid container alignItems={'center'} style={{paddingTop: '15px', paddingLeft: '15px', paddingRight: '15px', textAlign: 'center', position: 'absolute', top: '0px', right: '0px', width: '750px', maxWidth: '100%'}}>
          <Grid item xs={11} style={{zIndex: '0'}}/>
          <Grid item xs={1} style={{textAlign: 'center', cursor: 'pointer'}} alignItems={'center'} onClick={()=>{
            reload();
          }}>
            <RestartAltIcon fontSize="large"/>
          </Grid>
        </Grid>
      </Grid>
      <div style={{padding: '17px'}}>
        <Grid container justifyContent='left' alignItems='center' style={{columnGap: '10px'}}>
          {/* <img src='/logo/profile400.jpg' height='35px'/> */}
          <p style={{fontSize: '16pt', margin: '0', padding: '0', height: '100%', textAlign: 'left'}}>Generative Art</p>
        </Grid>
        <Grid container justifyContent='left' alignItems='center' style={{columnGap: '0px'}}>
          <p style={{fontSize: '10pt', margin: '0', paddingTop: '10px', paddingBottom: '10px', height: '100%', textAlign: 'left'}}>
            made by
          </p>
          <a href='https://keita-miyano.async-studio.com/' target="_blank" rel="noopener noreferrer" style={{height: '30px', zIndex: '10'}}>
            <img src='/logo/logo_keitamiyano_rgb_1-5.png' height='100%'/>
          </a>
        </Grid>
        <Grid container justifyContent='center'>
          <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer', margin: '5px'}} src={`/thumb/plankton1-${randints[0]}.png`} alt="plankton1" onClick={()=>imgClick('plankton1')}/>
          <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer', margin: '5px'}} src={`/thumb/plankton2-${randints[1]}.png`} alt="plankton2" onClick={()=>imgClick('plankton2')}/>
        </Grid>
        <Grid container justifyContent='center'>
          <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer', margin: '5px'}} src={`/thumb/plankton3-${randints[2]}.png`} alt="plankton3" onClick={()=>imgClick('plankton3')}/>
        </Grid>
      </div>
    </>
  )
}

export default Home
