import {configureStore} from "@reduxjs/toolkit"
import authreducer from "./auth"
export const store=configureStore({
    reducer:{
        auth:authreducer
    }
})

