import { Alert, Box, Button, Snackbar, Typography, Skeleton, Paper } from "@mui/material";
import Grid from '@mui/material/Grid'; // Grid version 1
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/slices/postsSlice";
import { postI } from "../models/post";
import { RootState } from "../redux/store";
import { useTranslation } from "react-i18next";
import { deletePost } from "../redux/slices/postsSlice";
import Post from "../components/Post";


const News: React.FC = () => {

  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const [visions, setVisions] = useState(12);

  const { posts, isPostsLoading } = useSelector((state: RootState) => state.posts)
  const [availablePosts, setAvailablePosts] = useState<postI[]>([]);

  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  const deletePostHandler = (id: number) => {
    dispatch(deletePost(id));
  }

  const handleAddPosts = () => {
    setVisions(visions + 12);
  }

  const handlePostClick = (message: string) => {
    setAlert(true);
    setAlertMessage(message);
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
            return <Skeleton key={id} />
          })
          :
          availablePosts?.map((post, id) => {
            return <Post key={id} post={post} onClick={handlePostClick} onDelete={deletePostHandler} />
          })
        }

      </Grid>
      {!isPostsLoading &&
        <Button onClick={handleAddPosts} size="large" variant="outlined">{t("showMore")}</Button>
      }
      <Snackbar open={alert} autoHideDuration={3000} onClose={handleClose} sx={{ position: "fixed", ml: "50%", transform: "translateX(-50%)", bottom: "30px" }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '350px' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </section >
  )
}

export default News;