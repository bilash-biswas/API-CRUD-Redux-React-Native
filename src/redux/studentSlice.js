import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    students : [],
    loading : false,
    error : null,
};

const studentSlice = createSlice({
    name : "student",
    initialState,
    reducers : {
        setStudents : (state, action) => {
            console.log("Updating Redux Store:", action.payload);  // Debugging
            state.students = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading : (state, action) => {
            state.loading = action.payload;
        },
        setError : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    },
});

export const { setStudents, setLoading, setError } = studentSlice.actions;
export default studentSlice.reducer;