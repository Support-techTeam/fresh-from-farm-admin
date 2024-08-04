import * as React from "react";
import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";
// import SegmentInput from "../visitors/SegmentInput";
// import MobileGrid from "../visitors/MobileGrid";
import AdminLinkField from "./AdminLinkField";
import MobileGrid from "./MobileGrid";

const AdminListActions = () => (
  <TopToolbar>
    <CreateButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const AdminList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <List
      sort={{ field: "updatedAt", order: "DESC" }}
      perPage={25}
      actions={<AdminListActions />}
    >
      {isXsmall ? (
        <MobileGrid />
      ) : (
        <DatagridConfigurable
          rowClick="edit"
          sx={{
            "& .column-groups": {
              md: { display: "none" },
              lg: { display: "table-cell" },
            },
          }}
        >
          <AdminLinkField source="last_name" label="Full Name" />
          <TextField source="email" />
          <TextField source="roles" />
          <DateField source="updatedAt" label="Updated At" />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default AdminList;
