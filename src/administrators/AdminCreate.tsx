import * as React from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";
import { Box, Grid, Typography } from "@mui/material";

// export const validateForm = (
//   values: Record<string, any>
// ): Record<string, any> => {
//   const errors = {} as any;
//   if (!values.first_name) {
//     errors.first_name = "field is required";
//   }
//   if (!values.last_name) {
//     errors.last_name = "field is required";
//   }
//   if (!values.email) {
//     errors.email = "field is required";
//   } else {
//     const error = email()(values.email);
//     if (error) {
//       errors.email = error;
//     }
//   }
//   if (values.password && values.password !== values.confirm_password) {
//     errors.confirm_password = "password mismatch";
//   }
//   return errors;
// };

const AdminCreate = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = (data: any) => {
    notify(
      `Changes to User Detail for "${data.firstName} ${data.lastName}" was created`
    );
    redirect("/administrators");
    refresh();
  };

  return (
    <Create mutationOptions={{ onSuccess }} title={<AdminTitle />}>
      <SimpleForm>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Identity Details
            </Typography>
            <Box display={{ xs: "block", sm: "flex" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <TextInput source="firstName" isRequired />
              </Box>
              <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <TextInput source="lastName" isRequired />
              </Box>
            </Box>
            <Box display={{ xs: "block", sm: "flex" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <TextInput type="email" source="email" isRequired />
              </Box>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <SelectInput
                  source="roles"
                  isRequired
                  choices={[
                    { id: "underWriter", name: "underWriter" },
                    { id: "admin", name: "admin" },
                    { id: "superAdmin", name: "superAdmin" },
                    { id: "customerCare", name: "customerCare" },
                  ]}
                />
              </Box>
            </Box>
            <Box display={{ xs: "block", sm: "flex" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <SelectInput
                  source="gender"
                  isRequired
                  choices={[
                    { id: "Male", name: "Male" },
                    { id: "Female", name: "Female" },
                  ]}
                />
              </Box>
              <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <TextInput source="phoneNumber" />
              </Box>
            </Box>

            <Box mt="1em" />

            <Typography variant="h6" gutterBottom>
              Address Details
            </Typography>
            <TextInput source="addresses" multiline helperText={false} />
            <Box mt="1em" />
            <Typography variant="h6" gutterBottom>
              Personal Details
            </Typography>
            <Box display={{ xs: "block", sm: "flex" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <PasswordInput source="password" isRequired />
              </Box>
              <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                <PasswordInput source="confirmPassword" isRequired />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};

// const SectionTitle = ({ label }: { label: string }) => {
//   const translate = useTranslate();

//   return (
//     <Typography variant="h6" gutterBottom>
//       {translate(label as string)}
//     </Typography>
//   );
// };

// const Separator = () => <Box pt="1em" />;
const AdminTitle = () => (
  <Box display="flex" alignItems="center">
    <Typography
      variant="h6"
      component="h1"
      fontWeight="bold"
      sx={{ marginRight: "5px" }}
    >
      Create Administrator
    </Typography>
  </Box>
);

export default AdminCreate;
