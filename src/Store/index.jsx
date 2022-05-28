import { configureStore } from "@reduxjs/toolkit";
import auth from "./LoginSlice";
import result from "./ResultSlice";

export default configureStore({
  reducer: {
    auth,
    result,
  },
});
