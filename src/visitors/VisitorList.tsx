import * as React from "react";
import {
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";
import { useMediaQuery, Theme } from "@mui/material";

import CustomerLinkField from "./CustomerLinkField";
import MobileGrid from "./MobileGrid";


const VisitorListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const VisitorList = () => {
  const isXsmall = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <List
      sort={{ field: "last_seen", order: "DESC" }}
      perPage={25}
      actions={<VisitorListActions />}
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
          <CustomerLinkField
            source="last_name"
            label="Full Name"
          />
          <TextField source="phoneNumber" />
          <TextField source="email" />
          <TextField source="gender" />
          <DateField source="createdAt" label="Membership Date" />
        </DatagridConfigurable>
      )}
    </List>
  );
};

export default VisitorList;
