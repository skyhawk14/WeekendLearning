import { configureStore } from "@reduxjs/toolkit"
import { taskSlice } from "./slices/taskSlice"
import { humanSlice } from "./slices/humanSlice"
console.log(taskSlice)
const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
        humans: humanSlice.reducer
    }
})
export { store }