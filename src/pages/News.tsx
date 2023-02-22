import { Box, Button, Container, Typography } from "@mui/material";
import Grid from '@mui/material/Grid'; // Grid version 1
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/slices/postsSlice";
import { postI } from "../models/post";
import { RootState } from "../redux/store";




const News: React.FC = () => {

  const dispatch = useDispatch();

  const [visions, setVisions] = useState(3);
  const { posts, isPostsLoading } = useSelector((state: RootState) => state.posts)

  const [availablePosts, setAvailablePosts] = useState<postI[]>([]);

  const handleAddPosts = () => {
    setVisions(visions + 3);
  }

  useEffect(() => {
    setAvailablePosts(posts.slice(0, visions));
    // setAvailablePosts(posts)
  }, [posts, visions]);

  // console.log("availablePosts", availablePosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [])

  return (
    <section style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "20px" }}>
      <Grid container spacing={3} sx={{ p: 3 }}>
        {isPostsLoading || !availablePosts ?
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h4" sx={{ textAlign: "center" }}>Loading...</Typography>
            </Box>
          </Grid>
          :
          availablePosts?.map((post) => {
            return (
              <Grid item lg={4} xl={3} xs={12} sm={6}>
                <Paper elevation={4} sx={{ borderRadius: 3 }}>
                  <img style={{ width: "100%", height: "300px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    src={post.url}
                    alt="post"
                  />
                  <Box sx={{ p: 2, pt: 1 }}>
                    <Typography variant="h5" sx={{ fontSize: "22px" }}>
                      {post.title}
                    </Typography>
                    <Button sx={{ mt: 1 }} variant="contained">Follow</Button>
                  </Box>
                </Paper>
              </Grid>
            )
          })
        }

      </Grid>
      <Button onClick={handleAddPosts} size="large" variant="outlined">Show more</Button>
    </section >
  )
}

export default News;