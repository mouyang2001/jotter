const increment = () => {
  return {
    type: "INCREMENT",
  };
};

const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

const counterActions = {
  increment,
  decrement,
};

export default counterActions;
