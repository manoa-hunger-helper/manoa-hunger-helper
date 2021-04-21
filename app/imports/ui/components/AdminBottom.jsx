import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AdminBottom extends React.Component {
  render() {
    const gridStyle = { marginTop: '0px', marginBottom: '0px' };
    return (
      <div className="landing-bottom">
        <Grid style={gridStyle}>
          <Grid.Row columns="four">
            <Grid.Column>
              <Image src="https://www.awnexinc.com/wp-content/uploads/Panda-Express-Kilgore.jpg" width='315px'height="227px" size="big" rounded/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://www.fastfoodmenuprices.com/wp-content/uploads/2020/10/Subway-Menu.jpg" width='315px' height="227px" size="big" rounded/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://static01.nyt.com/images/2017/11/18/business/00xp-starbucks1/00xp-starbucks1-superJumbo.jpg" size="big" width='315px' height="227px" rounded />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://photos.prnewswire.com/prnfull/20150915/266814" size="big" width='315px' height="227px" rounded/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminBottom;
