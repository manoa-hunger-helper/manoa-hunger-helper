import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the UserHome page. */
class UserHomeBottom extends React.Component {
  render() {
    return (
      <div className ="Landing-bottom">
        <Grid>
          <Grid.Row columns="four">
            <Grid.Column>
              <Image src="https://tse3.mm.bing.net/th?id=OIP.pLvuddj1wTpV5xeAM110KQHaEK&pid=Api&P=0&w=268&h=152" size="large"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://tse1.mm.bing.net/th?id=OIP.NJ8KFzeiR-_m-_6z-o0sUwHaEK&pid=Api&P=0&w=323&h=183" size="large"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://tse2.mm.bing.net/th?id=OIP.iUjwKwwiR9RQYc1v8nwCCgHaD4&pid=Api&P=0&w=350&h=185" size="large"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="https://tse2.mm.bing.net/th?id=OIP.fIm3TWSqIzwZVdU1JBY2rQHaEK&pid=Api&P=0&w=361&h=204" size="large"/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default UserHomeBottom;
