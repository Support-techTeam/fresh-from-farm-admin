import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  SelectInput,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";

import Aside from "./Aside";
import FullNameField from "./FullNameField";

const VisitorEdit = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = (data: any) => {
    notify(
      `Changes to Customers Detail for "${data.firstName} ${data.lastName}" was saved`
    );
    redirect("/customers");
    refresh();
  };

  return (
    <Edit
      title={<VisitorTitle />}
      aside={<Aside />}
      mutationMode="pessimistic"
      mutationOptions={{ onSuccess }}
    >
      <SimpleForm>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {translate("Identity Details")}
            </Typography>
            <Box display={{ xs: "block", sm: "flex" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <TextInput
                  source="firstName"
                  isRequired
                  readOnly
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black",
                      backgroundColor: "white",
                      border: "1px solid gray",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                      WebkitTextFillColor: "black",
                    },
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
              <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <TextInput
                  source="lastName"
                  isRequired
                  readOnly
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black",
                      backgroundColor: "white",
                      border: "1px solid gray",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                      WebkitTextFillColor: "black",
                    },
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
            </Box>
            <TextInput
              type="email"
              source="email"
              isRequired
              readOnly
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "black",
                  backgroundColor: "white",
                  border: "1px solid gray",
                  borderTopRightRadius: "10px",
                  borderTopLeftRadius: "10px",
                  WebkitTextFillColor: "black",
                },
                "& .MuiInputBase-root.Mui-disabled": {
                  backgroundColor: "white",
                },
              }}
            />
            <Box display={{ xs: "block", sm: "flex" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <SelectInput
                  source="gender"
                  readOnly
                  choices={[
                    { id: "Male", name: "Male" },
                    { id: "Female", name: "Female" },
                  ]}
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black",
                      backgroundColor: "white",
                      border: "1px solid gray",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                      WebkitTextFillColor: "black",
                    },
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
              <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <TextInput
                  source="phoneNumber"
                  readOnly
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "black",
                      backgroundColor: "white",
                      border: "1px solid gray",
                      borderTopRightRadius: "10px",
                      borderTopLeftRadius: "10px",
                      WebkitTextFillColor: "black",
                    },
                    "& .MuiInputBase-root.Mui-disabled": {
                      backgroundColor: "white",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box mt="1em" />

            <Typography variant="h6" gutterBottom>
              {translate("Address Details")}
            </Typography>
            <TextInput
              source="addresses"
              multiline
              helperText={false}
              readOnly
            />
            <Box mt="1em" />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};

const VisitorTitle = () => (
  <Box display="flex" alignItems="center">
    <Typography
      variant="h6"
      component="h1"
      fontWeight="bold"
      sx={{ marginRight: "5px" }}
    >
      Customer |
    </Typography>
    <FullNameField source="last_name" size="32" sx={{ margin: "5px 0" }} />
  </Box>
);

export default VisitorEdit;
