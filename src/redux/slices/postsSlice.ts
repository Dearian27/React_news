import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { postParams } from "../../models/post";



type initStateParams = {
 posts: postParams[];
 isPostsLoading: boolean;
} 

const initialState: initStateParams = {
  posts: [],
  isPostsLoading: false,
}

export const getPosts: any = createAsyncThunk("/getPosts", async () => { //!fix
  const res: any = await axios.get('https://jsonplaceholder.typicode.com/photos/');
  return res.data;
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    deletePost: (state: initStateParams, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(getPosts.pending, (state: initStateParams) => {
      state.isPostsLoading = true;
    })
    .addCase(getPosts.fulfilled, (state: initStateParams, action: PayloadAction<postParams[]>) => {
      state.isPostsLoading = false;
      state.posts = action.payload;
    })
    .addCase(getPosts.rejected, (state: initStateParams, action: PayloadAction<postParams[]>) => {
      state.isPostsLoading = false;
    })
  }
})

export default postsSlice.reducer;

export const { deletePost } = postsSlice.actions;