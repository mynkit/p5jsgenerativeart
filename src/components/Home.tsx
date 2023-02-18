import React from 'react'
import Grid from '@mui/material/Grid';

type HomeProps = {
  setTarget: React.Dispatch<React.SetStateAction<string>>;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}

const randint = (min: number, max: number) => {
  return Math.floor( Math.random() * (max + 1 - min) ) + min;
}

const Home: React.FC<HomeProps> = ({ setTarget, setStart }) => {
  const imgClick = (target: string)  => {
    setTarget(target);
    setStart(true);
    window.history.replaceState(null,'',`/${target}`);
  }
  return (
    <div style={{padding: '17px'}}>
      <Grid container justifyContent='left' alignItems='center' style={{columnGap: '10px'}}>
        {/* <img src='/logo/profile400.jpg' height='35px'/> */}
        <p style={{fontSize: '16pt', margin: '0', padding: '0', height: '100%', textAlign: 'left'}}>Generative Art</p>
      </Grid>
      <Grid container justifyContent='left' alignItems='center' style={{columnGap: '0px'}}>
        <p style={{fontSize: '10pt', margin: '0', paddingTop: '10px', paddingBottom: '10px', height: '100%', textAlign: 'left'}}>
          made by
        </p>
        <a href='https://keita-miyano.async-studio.com/' target="_blank" rel="noopener noreferrer" style={{height: '30px'}}>
          <img src='/logo/logo_keitamiyano_rgb_1-5.png' height='100%'/>
        </a>
      </Grid>
      <Grid container justifyContent='center'>
        <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer', margin: '5px'}} src={`/thumb/plankton1-${randint(1,3)}.png`} alt="plankton1" onClick={()=>imgClick('plankton1')}/>
        <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer', margin: '5px'}} src={`/thumb/plankton2-${randint(1,3)}.png`} alt="plankton2" onClick={()=>imgClick('plankton2')}/>
      </Grid>
      <Grid container justifyContent='center'>
        <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer', margin: '5px'}} src={`/thumb/plankton3-${randint(1,3)}.png`} alt="plankton3" onClick={()=>imgClick('plankton3')}/>
      </Grid>
    </div>
  )
}

export default Home
