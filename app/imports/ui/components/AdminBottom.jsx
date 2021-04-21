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
              <Image src="https://www.awnexinc.com/wp-content/uploads/Panda-Express-Kilgore.jpg" width='315px'height="188px"
                rounded/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://www.fastfoodmenuprices.com/wp-content/uploads/2020/10/Subway-Menu.jpg" width='315px' height="188px" rounded/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://static01.nyt.com/images/2017/11/18/business/00xp-starbucks1/00xp-starbucks1-superJumbo.jpg" width='315px' height="188px" rounded />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://www.rewindandcapture.com/wp-content/uploads/2018/08/Jamba-Juice.jpg" width='315px' height="188px" rounded/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default AdminBottom;
