import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppState } from "store"
import { IPerson } from "~/types/person"

interface IPersonState {
  person: IPerson | null
}

const initialState: IPersonState = {
  person: null,
}

const personalInfoSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPersonalInfo(
      state,
      { payload: { person } }: PayloadAction<{ person: IPerson }>
    ) {
      state.person = person
    },
    resetPersonalInfo(state) {
      state.person = null
    },
  },
})

export const selectPersonalInfo = (state: AppState) => state.person.person

export const { setPersonalInfo, resetPersonalInfo } = personalInfoSlice.actions
export default personalInfoSlice.reducer
