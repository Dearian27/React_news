import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { postI } from "../../models/post";



interface initStateI {
 posts: postI[];
 isPostsLoading: boolean;
} 

const initialState: initStateI = {
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
    deletePost: (state: initStateI, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(getPosts.pending, (state: initStateI) => {
      state.isPostsLoading = true;
    })
    .addCase(getPosts.fulfilled, (state: initStateI, action: PayloadAction<postI[]>) => {
      state.isPostsLoading = false;
      state.posts = action.payload;
    })
    .addCase(getPosts.rejected, (state: initStateI, action: PayloadAction<postI[]>) => {
      state.isPostsLoading = false;
    })
  }
})

export default postsSlice.reducer;

export const { deletePost } = postsSlice.actions;