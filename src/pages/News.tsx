import { Alert, Box, Button, Container, Snackbar, Typography } from "@mui/material";
import Grid from '@mui/material/Grid'; // Grid version 1
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/slices/postsSlice";
import { postI } from "../models/post";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";




const News: React.FC = () => {

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const [visions, setVisions] = useState(12);
  const { posts, isPostsLoading } = useSelector((state: RootState) => state.posts)

  const [availablePosts, setAvailablePosts] = useState<postI[]>([]);

  const [alert, setAlert] = useState<boolean>(false);

  const handleAddPosts = () => {
    setVisions(visions + 12);
  }

  const handlePostClick = () => {
    setAlert(true);
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  useEffect(() => {
    setAvailablePosts(posts.slice(0, visions));
  }, [posts, visions]);


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
              <Grid item key={post.id} lg={4} xl={3} xs={12} sm={6}>
                <Paper elevation={4} sx={{ borderRadius: 3 }}>
                  <img style={{ width: "100%", height: "300px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    src={post.url}
                    alt="post"
                  />
                  <Box sx={{ p: 2, pt: 1 }}>
                    <Typography variant="h5" sx={{ fontSize: "22px" }}>
                      {post.title}
                    </Typography>
                    <Button onClick={handlePostClick} sx={{ mt: 1 }} variant="contained">{t("follow")}</Button>
                  </Box>
                </Paper>
              </Grid>
            )
          })
        }

      </Grid>
      <Button onClick={handleAddPosts} size="large" variant="outlined">{t("showMore")}</Button>
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose} sx={{ position: "fixed", ml: "50%", transform: "translateX(-50%)", bottom: "30px" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
          You followed the post!
        </Alert>
      </Snackbar>
    </section >
  )
}

export default News;