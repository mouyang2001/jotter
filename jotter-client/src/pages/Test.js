import React from 'react'

import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from "react-redux";

import counterActions from '../redux/actions/counterActions';

export default function Test() {

  // to call from combined reducer you need to use state.*name of reducer
  const counter = useSelector((state) => state.test.counter);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(counterActions.increment());
  }

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div>
      <h1>Welcome to the testing area</h1>
      <h1>Counter: {counter} </h1>
      <Button onClick={increment}>INCREMENT</Button>
      <Button onClick={decrement}>DECREMENT</Button>
      <p>This example utilizes redux actions and reducers to alter state</p>
    </div>
  );
}
