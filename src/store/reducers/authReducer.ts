import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "store"
import { User, Session } from "@supabase/supabase-js"

interface IAuthState {
  session: Session | null
  user: User | null
  isLoggedIn: boolean
}

const initialState: IAuthState = {
  session: null,
  user: null,
  isLoggedIn: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ session: Session; user: User }>) {
      const { session, user } = action.payload
      state.session = session
      state.user = user
      state.isLoggedIn = true
    },
    resetUser(state) {
      state.isLoggedIn = false
      state.session = null
      state.user = null
    },
  },
})

export const selectUser = (state: AppState) => state.auth.user
export const selectSession = (state: AppState) => state.auth.session

export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer
