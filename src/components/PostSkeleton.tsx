import { Grid, Paper, Box, Skeleton } from '@mui/material';

const PostSkeleton: React.FC = () => {
  return (
    <Grid item lg={4} xl={3} xs={12} sm={6} sx={{ p: 0 }}>
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
}

export default PostSkeleton;