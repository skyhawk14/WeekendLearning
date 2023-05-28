import { createSlice, nanoid } from '@reduxjs/toolkit'

const createHuman = (name) => ({
    id: nanoid(),
    name,
    tasks:[]
})
export const humanSlice = createSlice({
    name: 'humans',
    initialState: [createHuman("Steve"),createHuman("Stephen")],
    reducers: {
        add(state, action) {
            return state.push(createHuman(action.payload))
        }
    }
})