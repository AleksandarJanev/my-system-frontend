import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface RegisterSlice {
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
    responseMessage: string;
}

const initialState: RegisterSlice = {
    firstname: "", lastname: "", password: "",
    username: "", email: "", responseMessage: ""
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setDetails(state, action: PayloadAction<{ field: string; value: string }>){
            const { field, value } = action.payload;
            state[field] = value; // Dynamically update form field
        },
        resetForm(state) {
            state.username = "";
            state.password = "";
            state.email = "";
            state.firstname = "";
            state.lastname = "";
        },        setResponseMessage(state, action: PayloadAction<string>){
            state.responseMessage = action.payload
        }
    }
})

// export const {setUsername, setPassword, setFirstname, setLastname, setEmail} = registerSlice.actions;
export const { setDetails, resetForm, setResponseMessage } = registerSlice.actions;

export default registerSlice.reducer;