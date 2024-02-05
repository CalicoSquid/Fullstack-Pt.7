const error = (setMessage, error) => {
  setMessage((prev) => ({
    ...prev,
    error,
  }));
  setTimeout(() => {
    setMessage({
      error: null,
      success: null,
    });
  }, 5000);
};

const success = (setMessage, success) => {
  setMessage((prev) => ({
    ...prev,
    success,
  }));
  setTimeout(() => {
    setMessage({
      error: null,
      success: null,
    });
  }, 5000);
};

export default { error, success };
