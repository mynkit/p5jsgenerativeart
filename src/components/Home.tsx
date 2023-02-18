import React from 'react'
import Grid from '@mui/material/Grid';

type HomeProps = {
  target: string;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ target, setTarget }) => {
  const imgClick = (target: string)  => {
    setTarget(target);
    window.history.replaceState(null,'',`/${target}`);
  }
  return (
    <div style={{padding: '17px'}}>
      <Grid container style={{height: '60px', textAlign: 'left'}}>
        <p style={{fontSize: '16pt', margin: '0', padding: '0', height: '100%', textAlign: 'center'}}>Generative Art</p>
      </Grid>
      <Grid container justifyContent='center' style={{columnGap: '20px', rowGap: '5px'}}>
        <img style={{width: '800px', maxWidth: '60%', cursor: 'pointer'}} src="/thumb/plankton1.png" alt="plankton1" onClick={()=>imgClick('plankton1')}/>
        <img style={{width: '800px', maxWidth: '60%', cursor: 'pointer'}} src="/thumb/plankton2.png" alt="plankton2" onClick={()=>imgClick('plankton2')}/>
      </Grid>
    </div>
  )
}

export default Home
