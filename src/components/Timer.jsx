import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTimer, handleDisableBtns } from '../Redux/Action';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const { resetTimer, dispatch } = this.props;
    const timerInterval = 1000;

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        dispatch(getTimer(timer));
        console.log(resetTimer);
        if (timer === 0) {
          clearInterval(this.timer);
          dispatch(handleDisableBtns(true));
        }
        if (resetTimer) this.setState({ timer: 30 });
      });
    }, timerInterval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <h1>{ timer }</h1>
      </div>
    );
  }
}

Timer.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (store) => ({
  resetTimer: store.player.nextBtnClick,
});

export default connect(mapStateToProps)(Timer);
