import * as React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import {
  CreateButton,
  EditButton,
  List,
  RecordContextProvider,
  TopToolbar,
  useListContext,
} from "react-admin";
import LinkToRelatedProducts from "./LinkToRelatedProducts";
import BaseDirectories from "../base_directory/BaseDirectory";
import axios from "axios";

const defaultImageUrl = `${BaseDirectories.IMAGES_DIR}/categories/default.png`;

const CategoryList = () => (
  <List
    sort={{ field: "name", order: "ASC" }}
    perPage={20}
    pagination={false}
    component="div"
    actions={false}
  >
    <ListActions />
    <CategoryGrid />
  </List>
);

const CategoryGrid = () => {
  const { data, error, isPending } = useListContext();

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 0 }}>
      {data.map((record) => (
        <Grid key={record.id} xs={12} sm={6} md={4} lg={3} xl={2} item>
          <RecordContextProvider value={record}>
            <Card>
              <CategoryImage name={record.name} />
              <CardContent sx={{ paddingBottom: "0.5em" }}>
                <Typography variant="h5" component="h2" align="center">
                  {record.name}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  ".MuiCardActions-spacing": {
                    display: "flex",
                    justifyContent: "space-around",
                  },
                }}
              >
                <LinkToRelatedProducts />
                <EditButton />
              </CardActions>
            </Card>
          </RecordContextProvider>
        </Grid>
      ))}
    </Grid>
  );
};

const CategoryImage: React.FC<{ name: string }> = ({ name }) => {
  const [imageSrc, setImageSrc] = React.useState<string>(defaultImageUrl);
  const checkImageExists = async () => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "");
    const imageUrl = `${
      BaseDirectories.IMAGES_DIR
    }/categories/${encodeURIComponent(formattedName)}.png`;
    try {
      const response = await axios.get(imageUrl);
      if (response?.status === 200 && response.statusText === "OK") {
        setImageSrc(imageUrl);
      } else {
        setImageSrc(defaultImageUrl);
      }
    } catch (error) {
      setImageSrc(defaultImageUrl);
    }
  };
  React.useEffect(() => {
    checkImageExists();
  }, [name]);

  return (
    <CardMedia
      component="img"
      alt={name}
      image={imageSrc}
      onError={() => setImageSrc(defaultImageUrl)}
      sx={{ height: 140, objectFit: "contain", width: "100%" }}
    />
  );
};

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export default CategoryList;
