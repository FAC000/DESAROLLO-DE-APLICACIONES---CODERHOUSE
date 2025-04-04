import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            user: null,
            token: null,
            localId: null,
            imageCamera: null,
            name: null,
        }
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.value.user = payload.email;
            state.value.token = payload.idToken;
            state.value.localId = payload.localId;
            state.value.name = payload.name;
        },
        clearUser: (state) => {
            state.value.user = null;
            state.value.token = null;
            state.value.localId = null;
            state.value.name = null;
        },
        setCameraImage: (state, { payload }) => {
            state.value.imageCamera = payload;
        },

        updateUserProfile: (state, { payload }) => {
            if (payload.name) state.value.name = payload.name;
            if (payload.imageCamera) {
                state.value.imageCamera = payload.imageCamera;
            }
        }

    }
});

export const { setUser, clearUser, setCameraImage, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
