import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RiTimer2Line } from 'react-icons/ri';
import { connect } from 'react-redux';
import { getNextBtnClick, getTimer, handleDisableBtns } from '../Redux/Action';
import '../Style/Timer.css';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 30,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const timerInterval = 1000;

    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }), () => {
        const { timer } = this.state;
        const { resetTimer } = this.props;
        dispatch(getTimer(timer));

        if (timer === 0) {
          clearInterval(this.timer);
          dispatch(handleDisableBtns(true));
        }

        if (resetTimer) {
          this.setState({ timer: 30 });
          dispatch(getNextBtnClick(false));
        }
      });
    }, timerInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { timer } = this.state;
    return (
      <div className="conteinerTimer">
        <RiTimer2Line className="timer" size={ 35 } />
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
