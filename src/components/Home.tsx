import React from 'react'
import Grid from '@mui/material/Grid';

type HomeProps = {
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
}

const randint = (min: number, max: number) => {
  return Math.floor( Math.random() * (max + 1 - min) ) + min;
}

const Home: React.FC<HomeProps> = ({ setTarget }) => {
  const imgClick = (target: string)  => {
    setTarget(target);
    window.history.replaceState(null,'',`/${target}`);
  }
  return (
    <div style={{padding: '17px'}}>
      <p style={{fontSize: '16pt', margin: '0', padding: '0', height: '100%', textAlign: 'left'}}>Generative Art</p>
      <Grid container justifyContent='left' alignItems='center' style={{columnGap: '0px'}}>
        <p style={{fontSize: '10pt', margin: '0', paddingTop: '10px', paddingBottom: '10px', height: '100%', textAlign: 'left'}}>
          made by
        </p>
        <a href='https://keita-miyano.async-studio.com/' target="_blank" rel="noopener noreferrer" style={{height: '30px'}}>
          <img src='/logo/logo_keitamiyano_rgb_1-5.png' height='100%'></img>
        </a>
      </Grid>
      <Grid container justifyContent='center' style={{columnGap: '20px', rowGap: '5px'}}>
        <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer'}} src={`/thumb/plankton1-${randint(1,2)}.png`} alt="plankton1" onClick={()=>imgClick('plankton1')}/>
        <img style={{width: '600px', maxWidth: '60%', cursor: 'pointer'}} src={`/thumb/plankton2-${randint(1,2)}.png`} alt="plankton2" onClick={()=>imgClick('plankton2')}/>
      </Grid>
    </div>
  )
}

export default Home
