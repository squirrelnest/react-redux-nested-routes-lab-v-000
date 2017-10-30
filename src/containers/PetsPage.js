import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchPets } from '../actions';
import PetsNew from './PetsNew';
import PetsShow from './PetsShow';
import PetsList from '../components/PetsList';

class PetsPage extends Component {

  componentDidMount() {
    this.props.fetchPets();
  }

  render() {

    const PetsPage = ({ match, pets }) =>
      <div>
        <PetsList pets={pets} />
        <Switch>
          <Route path={`${match.url}/pets/new`} component={PetsNew} />
          <Route path={`${match.url}/pets/:petId`} component={PetsShow}/>
          <Route exact path={match.url} render={() => (
            <div>
              <h3>Please select a Pet from the list.</h3>
              <PetsList pets={pets} />
            </div>
          )}/>
        </Switch>
      </div>;

    return (
      <div>
        <h1>Pets Page</h1>
        <div>{PetsPage}</div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    pets: state.pets
  };
}

export default connect(mapStateToProps, { fetchPets })(PetsPage);
