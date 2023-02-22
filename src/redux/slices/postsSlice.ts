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
  console.log("getPosts");
  const res: any = await axios.get('https://jsonplaceholder.typicode.com/photos/');
  return res.data;
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder: any) => {
    builder.addCase(getPosts.pending, (state: initStateI) => {
      console.log("pending")
      state.isPostsLoading = true;
    })
    .addCase(getPosts.fulfilled, (state: initStateI, action: PayloadAction<postI[]>) => {
      console.log("fulfilled")
      state.isPostsLoading = false;
      state.posts = action.payload;
    })
    .addCase(getPosts.rejected, (state: initStateI, action: PayloadAction<postI[]>) => {
      state.isPostsLoading = false;
    })
  }
})

export default postsSlice.reducer;

// export const { getPosts } = postsSlice.actions;