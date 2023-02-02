import { useQuery } from "@tanstack/react-query";
import { getUserImages } from "services/user.service";
import { useOutletContext } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserImage } from "services/user.service";
import UserImage from "components/User/UserImage";
import { Typography } from "@mui/material";

function User() {
  const { accessToken } = useOutletContext();
  const { data } = useQuery({
    queryKey: ["user_images", accessToken],
    queryFn: async ({ queryKey }) => {
      const [, accessToken] = queryKey;
      return await getUserImages(accessToken);
    },
  });

  const queryClient = useQueryClient();

  const mutateCreateImage = useMutation({
    mutationFn: deleteUserImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user_images"] });
    },
  });

  if (!accessToken) return null;

  return (
    <Grid container spacing={2}>
      {data?.images?.length > 0 ? (
        data.images.map((image) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={image.image_id}>
            <UserImage
              image={image}
              onDelete={() =>
                mutateCreateImage.mutate({
                  imageId: image.image_id,
                  accessToken,
                })
              }
            />
          </Grid>
        ))
      ) : (
        <Grid xs={12}>
          <Typography>You have no saved images.</Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default User;
