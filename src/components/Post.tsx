import { Grid, Paper, Box, Typography, Button } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { postI } from "../models/post";
import { useTranslation } from "react-i18next";
import { useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface postProps {
  post: postI;
  onDelete: (id: number) => void;
  onClick: (message: string) => void;
}

const Post: React.FC<postProps> = ({ post, onDelete, onClick }) => {

  const { t, i18n } = useTranslation();
  const [following, setFollowing] = useState<boolean>(false);
  const { isAuth } = useSelector((state: RootState) => state.user);

  const handleClick = () => {
    setFollowing(!following)
    if (following) {
      onClick("You unfollowed the post!");
    } else onClick("You followed the post!");
  }

  return (
    <Grid item key={post.id} lg={4} xl={3} xs={12} sm={6}>
      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        <img style={{ width: "100%", height: "300px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
          src={post.url}
          alt="post"
        />
        <Box sx={{ p: 2, pt: 1 }}>
          <Typography variant="h5" sx={{
            fontSize: "22px", height: "60px", textOverflow: "ellipsis", width: "100%", textWrap: "no-wrap", overflow: "hidden"
          }}>
            {post.title}
          </Typography>
          {isAuth &&
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: "1px" }}>
              <Button disabled={isAuth ? false : true} onClick={handleClick} sx={{ mt: 1, }} variant={following ? "outlined" : "contained"}>
                {following ?
                  t("following")
                  :
                  t("follow")
                }
              </Button>
              <DeleteOutlineOutlinedIcon fontSize="medium" sx={{ color: "#ff4949", cursor: "pointer", pt: 1, height: "30px" }} onClick={() => onDelete(post.id)} />
            </Box>
          }
        </Box>
      </Paper>
    </Grid>
  )
}

export default Post;