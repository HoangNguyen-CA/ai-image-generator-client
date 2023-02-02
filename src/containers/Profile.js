import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
const Profile = () => {
  const { user } = useAuth0();
  return (
    <>
      <Typography>Logged in as {user.name}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>
        Email Verified: {user.email_verified ? "yes" : "no"}
      </Typography>
    </>
  );
};

export default Profile;
