import { Alert, Box, Button, Snackbar, Typography, Skeleton, Paper } from "@mui/material";
import Grid from '@mui/material/Grid'; // Grid version 1
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/slices/postsSlice";
import { postI } from "../models/post";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deletePost } from "../redux/slices/postsSlice";


const News: React.FC = () => {

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const [visions, setVisions] = useState(12);

  const { posts, isPostsLoading } = useSelector((state: RootState) => state.posts)

  const [availablePosts, setAvailablePosts] = useState<postI[]>([]);

  const [alert, setAlert] = useState<boolean>(false);

  const deletePostHandler = (id: number) => {
    dispatch(deletePost(id));
  }

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
          [...Array(8)].map((_, id) => {
            return (
              <Grid item key={id} lg={4} xl={3} xs={12} sm={6} sx={{ p: 0 }}>
                <Paper elevation={3} sx={{ borderRadius: 3, padding: 0 }}>
                  <Skeleton variant="rounded" sx={{ height: "300px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }} />
                  <Box sx={{ p: 2, pt: 1 }}>
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="rounded" width={120} height={40} sx={{ marginTop: "10px" }} />
                  </Box>
                </Paper>
              </Grid>
            )
          })
          :
          availablePosts?.map((post) => {
            return (
              <Grid item key={post.id} lg={4} xl={3} xs={12} sm={6}>
                <Paper elevation={3} sx={{ borderRadius: 3 }}>
                  <img style={{ width: "100%", height: "300px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                    src={post.url}
                    alt="post"
                  />
                  <Box sx={{ p: 2, pt: 1 }}>
                    <Typography variant="h5" sx={{ fontSize: "22px", minHeight: "60px" }}>
                      {post.title}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Button onClick={handlePostClick} sx={{ mt: 1 }} variant="contained">{t("follow")}</Button>
                      <DeleteOutlineOutlinedIcon fontSize="medium" sx={{ color: "#ff4949", cursor: "pointer" }} onClick={() => deletePostHandler(post.id)} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            )
          })
        }

      </Grid>
      {!isPostsLoading &&
        <Button onClick={handleAddPosts} size="large" variant="outlined">{t("showMore")}</Button>
      }
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose} sx={{ position: "fixed", ml: "50%", transform: "translateX(-50%)", bottom: "30px" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
          You followed the post!
        </Alert>
      </Snackbar>
    </section >
  )
}

export default News;