import { createSlice } from '@reduxjs/toolkit';
import apiClient from '../../utilities/apiClient';
import { ThunkApp, DataLogin } from '../../utilities/types.d';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    setLogin: (_state, action) => {
      const login = action.payload;

      localStorage.setItem('token', login.strToken);

      return login.idUser;
    },
  },
});

export const createLoginThunk =
  (data: DataLogin): ThunkApp =>
  (dispatch) => {
    return apiClient.post('/LoginEmailCommand', data).then((res) => dispatch(setLogin(res.data)));
  };

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
