import { Grid, Paper, Box, Typography, Button } from "@mui/material"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { postI } from "../models/post";
import { useTranslation } from "react-i18next";


interface postProps {
  post: postI;
  onDelete: (id: number) => void;
  onClick: () => void;
}

const Post: React.FC<postProps> = ({ post, onDelete, onClick }) => {

  const { t, i18n } = useTranslation();

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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button onClick={onClick} sx={{ mt: 1 }} variant="contained">{t("follow")}</Button>
            <DeleteOutlineOutlinedIcon fontSize="medium" sx={{ color: "#ff4949", cursor: "pointer" }} onClick={() => onDelete(post.id)} />
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Post;