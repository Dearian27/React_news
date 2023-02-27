import { Grid, Container, Box, Typography } from "@mui/material";
import userIcon from '../assets/profile/profile.png';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Profile: React.FC = () => {

  const User = useSelector((state: RootState) => state.user);
  const password = User?.password?.replace(/[^\n]/g, "●");

  return (
    <Container>
      <Grid container style={{ paddingTop: "200px" }}>
        <Grid item xl={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box sx={{ height: "200px", width: "200px", borderRadius: "50%", backgroundColor: "lightgray", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img style={{ height: "80%", width: "80%" }} src={userIcon} alt="" />
          </Box>
        </Grid>
        <Grid item xl={6} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "35px" }}>
              {User?.name}
            </Typography>
            <Typography sx={{ fontSize: "35px" }}>
              {password}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container >
  )
}

export default Profile;