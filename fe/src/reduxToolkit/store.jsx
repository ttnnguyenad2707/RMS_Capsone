import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import houseReducer from "./HouseSlice";
import utilsReducer from "./UtilSlice";
import defaultUtilReducer from "./UtilSliceDefault"
const rootReducer = {
  // counter : tên đặt tự do nó sẽ tương ứng với state sẽ truy cập ở component
  //counterReducer : import Reducer từ CounterSlice
  //  counter : counterReducer,
  user: userReducer,
  house: houseReducer,
  utilOther: utilsReducer,
  defaultUtil: defaultUtilReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
