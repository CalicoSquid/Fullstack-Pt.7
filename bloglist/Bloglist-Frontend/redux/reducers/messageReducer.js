import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    error: null,
    success: null,
  },
  reducers: {
    setError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    setSuccess(state, action) {
      return {
        ...state,
        success: action.payload,
      };
    },
    reset(state, action) {
      return {
        ...state,
        success: null,
        error: null,
      };
    },
  },
});

export const { setError, setSuccess, reset } = messageSlice.actions;

export const resetMessage = () => {
  console.log("fired");
  return async (dispatch) => {
    setTimeout(() => {
      console.log("reset");
      dispatch(reset());
    }, 5000);
  };
};

export const setMessage = (action) => {
  const { error, success } = action.payload;
  if (error) {
    setError(error);
  } else if (success) {
    setSuccess(success);
  }
};

export default messageSlice.reducer;
