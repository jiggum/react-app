/* external */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* internal */
import { compose } from 'general/util/fp';
import { Collapse, message, Button } from 'antd';
import PropTypes from 'prop-types';

/* feature */
import { ExamplePropTypes } from './Example.reducer';
import mapDispatchToProps from './Example.thunk';
import './Example.css';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      onPending: false,
    };
    this.showPendingMessage = this.showPendingMessage.bind(this);
    this.hidePendingMessage = this.hidePendingMessage.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  async componentWillMount() {
    if (this.props.posts.length > 0) return;
    this.setState({ onPending: true });
    try {
      await this.props.getPosts({
        page: this.state.page,
      });
    } catch (error) {
    }
    this.setState({ onPending: false });
  }

  componentDidMount() {
    if (this.state.onPending) {
      this.showPendingMessage();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.onPending && nextState.onPending) {
      this.showPendingMessage();
    }
    if (this.state.onPending && !nextState.onPending && this.hideMessage) {
      this.hidePendingMessage();
    }
  }

  showPendingMessage() {
    if (this.hideMessage) this.hideMessage();
    this.hideMessage = message.loading('불러오는중..', 0);
  }

  hidePendingMessage() {
    if (!this.hideMessage) return;
    this.hideMessage();
    delete this.hideMessage;
  }

  async onChangePage(page) {
    if (this.state.onPending) return;
    this.setState({ onPending: true });
    try {
      await this.props.getPosts({
        page,
      });
      this.setState({
        page,
        onPending: false,
      });
    } catch (error) {
      this.setState({ onPending: false });
    }
  }

  render() {
    return (
      <div>
        <div className="Example__content">
          <Collapse bordered={false}>
            {this.props.posts
              .map(post => (
                <Collapse.Panel
                  header={post.title}
                  key={post.id}
                >
                  <span dangerouslySetInnerHTML={{ __html: post.content }} />
                </Collapse.Panel>
              ))}
          </Collapse>
        </div>
        <Button onClick={() => this.onChangePage(this.state.page + 1)}>
          Add Posts
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const posts = state.example.get('posts').toJS();
  return {
    posts,
  };
};

Example.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(ExamplePropTypes.post).isRequired,
};

Example.defaultPropTypes = {
};

export const ExampleView = Example;

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ExampleView);
