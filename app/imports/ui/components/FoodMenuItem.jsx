import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class FoodMenuItem extends React.Component {
  render() {
    let strvegan = 'true';
    let strdrink = true;
    let strdessert = true;
    if (!this.props.foodmenu.vegan) strvegan = 'false';
    if (!this.props.foodmenu.drink) strdrink = 'false';
    if (!this.props.foodmenu.dessert) strdessert = 'false';
    return (
      <Table.Row>
        <Table.Cell>{this.props.foodmenu.name}</Table.Cell>
        <Table.Cell>{this.props.foodmenu.vendor}</Table.Cell>
        <Table.Cell><Image src={this.props.foodmenu.image} size='small'/></Table.Cell>
        <Table.Cell>{this.props.foodmenu.price}</Table.Cell>
        <Table.Cell>{strvegan}</Table.Cell>
        <Table.Cell>{strdrink}</Table.Cell>
        <Table.Cell>{strdessert}</Table.Cell>
        <Table.Cell>
          <Link to={`/editMyMenu/${this.props.foodmenu._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// <Link to={`/edit/${this.props.vendor._id}`}>Edit</Link>

// Require a document to be passed to this component.
FoodMenuItem.propTypes = {
  foodmenu: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(FoodMenuItem);
