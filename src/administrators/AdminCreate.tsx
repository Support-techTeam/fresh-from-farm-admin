import * as React from "react";
import {
  Create,
  DateInput,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.first_name) {
    errors.first_name = "field is required";
  }
  if (!values.last_name) {
    errors.last_name = "field is required";
  }
  if (!values.email) {
    errors.email = "field is required";
  } else {
    const error = email()(values.email);
    if (error) {
      errors.email = error;
    }
  }
  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = "password mismatch";
  }
  return errors;
};

const AdminCreate = () => (
  <Create>
    <SimpleForm
      sx={{ maxWidth: 500 }}
      // Here for the GQL provider
      defaultValues={{
        birthday: new Date(),
        first_seen: new Date(),
        last_seen: new Date(),
        has_ordered: false,
        latest_purchase: new Date(),
        has_newsletter: false,
        groups: [],
        nb_orders: 0,
        total_spent: 0,
      }}
      validate={validateForm}
    >
      <SectionTitle label="Identity Details" />
      <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="first_name" isRequired />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="last_name" isRequired />
        </Box>
      </Box>
      <TextInput type="email" source="email" isRequired />
      <DateInput source="birthday" />
      <Separator />
      <SectionTitle label="Address Details" />
      <TextInput source="address" multiline helperText={false} />
      <Box display={{ xs: "block", sm: "flex" }}>
        <Box flex={2} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="city" helperText={false} />
        </Box>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <TextInput source="stateAbbr" helperText={false} />
        </Box>
        <Box flex={2}>
          <TextInput source="zipcode" helperText={false} />
        </Box>
      </Box>
      <Separator />
      <SectionTitle label="Password Details" />
      <Box display={{ xs: "block", sm: "flex" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="password" />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="confirm_password" />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => <Box pt="1em" />;

export default AdminCreate;
