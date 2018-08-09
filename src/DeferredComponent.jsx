import React from 'react';
import PropTypes from 'prop-types';


class DeferredComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Component: null, loading: true };
  }
  componentDidMount() {
    this.loadComponent();
  }
  async loadComponent() {
    const Component = await this.props.importFunction();
    this.setState({ loading: false, Component: Component.default });
  }

  render() {
    const props = this.props;
    const { loading, Component } = this.state;
    if (loading) {
      return this.props.loadingComponent || null
    }
    return (<Component {...props} />);
  }
}

DeferredComponent.propTypes = {
  importFunction: PropTypes.func.isRequired,
};


export default DeferredComponent;
