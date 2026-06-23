// Counter.jsx
// Reading state with useSelector, updating with useDispatch.

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addBy, reset } from "./counterSlice";

function Counter() {
  // READ: pick the value from the store. Re-renders only when it changes.
  const value = useSelector((state) => state.counter.value);

  // UPDATE: get dispatch, then send actions.
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default Counter;

// The loop: dispatch(action) -> reducer updates store -> selectors re-render.
