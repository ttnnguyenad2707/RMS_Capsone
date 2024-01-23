import { configureStore } from "@reduxjs/toolkit";
 import userReducer from './UserSlice'

const rootReducer = {
  // counter : tên đặt tự do nó sẽ tương ứng với state sẽ truy cập ở component
  //counterReducer : import Reducer từ CounterSlice
  //  counter : counterReducer,
  user: userReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
