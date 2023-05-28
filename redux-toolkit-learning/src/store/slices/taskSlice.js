import { createSlice, nanoid } from '@reduxjs/toolkit'
const createTask = (title) => ({
    id: nanoid(),
    title,
    complete: false,
    assignedTo: ''
})
const initialState = [
    createTask('First task'),
    createTask()
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        add(state, action) {
            state.push(createTask(action.payload))
        }
    }
})
