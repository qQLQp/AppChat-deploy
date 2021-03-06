import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios, { setAuthToken } from '../../config/axios';

const keyStorage = 'accessToken';
export const findFriend = createAsyncThunk(
  'friend/find-friend',
  async (phone) => {
    if (localStorage[keyStorage]) {
      setAuthToken(localStorage[keyStorage]);
    }
    try {
      const res = await instanceAxios.post('/friend/find-friend', phone);
      return res.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem(keyStorage);
    }
  }
);

export const addFriend = createAsyncThunk(
  'friend/add-friend',
  async (phone) => {
    if (localStorage[keyStorage]) {
      setAuthToken(localStorage[keyStorage]);
    }
    try {
      const res = await instanceAxios.post('friend/add-friend', phone);
      return res.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem(keyStorage);
    }
  }
);

export const getListFriend = createAsyncThunk('friend/get-friend', async () => {
  if (localStorage[keyStorage]) {
    setAuthToken(localStorage[keyStorage]);
  }
  try {
    const res = await instanceAxios.get('/friend/get-friend');
    return res.data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem(keyStorage);
  }
});

export const getListMessage = createAsyncThunk(
  'friend/get-message',
  async (roomId) => {
    if (localStorage[keyStorage]) {
      setAuthToken(localStorage[keyStorage]);
    }
    try {
      const res = await instanceAxios.get('/friend/get-message/' + roomId);
      return res.data;
    } catch (error) {
      console.log(error);
      localStorage.removeItem(keyStorage);
    }
  }
);

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friends: [],
    messages: [],
  },
  reducers: {
    pushMessage(state, action) {
      state.messages = action.payload.reverse();
    },
  },
  extraReducers: {
    [findFriend.fulfilled]: (state, action) => {},

    [addFriend.fulfilled]: (state, action) => {},

    [getListFriend.fulfilled]: (state, action) => {
      if (action.payload) {
        if (action.payload.success) {
          state.friends = action.payload.data;
        }
      }
    },
    
    [getListMessage.fulfilled]: (state, action) => {
      if (action.payload) {
        if (action.payload.success) {
          state.messages = action.payload.data.messages.reverse();
        } else {
          console.log('Get client fail!');
        }
      }
    },
  },
});

const friendReducer = friendSlice.reducer;

export const { pushMessage } = friendSlice.actions;

export default friendReducer;
