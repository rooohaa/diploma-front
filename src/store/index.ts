import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/authReducer"
import personReducer from "./reducers/personReducer"

const store = configureStore({
  reducer: {
    // reducer which handles auth state
    auth: authReducer,

    // reducer which handles person state (personal-info)
    person: personReducer,
  },
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
