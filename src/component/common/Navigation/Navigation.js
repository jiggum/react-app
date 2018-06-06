/* external */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import PropTypes from 'prop-types';

/* internal */
import { compose } from 'general/util/fp';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.getCurrent = this.getCurrent.bind(this);
  }

  getCurrent() {
    const { pathname } = this.props.location;
    if (pathname.startsWith('/example')) return 'example';
    return '';
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.getCurrent()]}
        mode="horizontal"
      >
        <Menu.Item key="home">
          <Link to="/home">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="example">
          <Link to="/example">
            Example
          </Link>
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
        </Menu.Item>
        <Menu.SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

Navigation.propTypes = {
  location: PropTypes.any.isRequired,
};

export default compose(
  withRouter,
)(Navigation);
