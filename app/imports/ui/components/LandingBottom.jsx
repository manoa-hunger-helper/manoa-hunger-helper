import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class LandingBottom extends React.Component {
  render() {
    const gridStyle = { marginTop: '0px', marginBottom: '0px' };
    return (
      <div className="landing-bottom">
        <Grid style={gridStyle}>
          <Grid.Row columns="seven">
            <Grid.Column>
              <Image src="/images/IMG_0067.JPG" size="small" circular/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/IMG_0120.JPG" size="small" circular/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/IMG_2270.jpg" size="small" circular />
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/IMG_4781.JPG" size="small" circular/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/IMG_1110.jpg" size="small" circular/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/IMG_4979.jpg" size="small" circular/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/IMG_4769.jpg" size="small" circular/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LandingBottom;
