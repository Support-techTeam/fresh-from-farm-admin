// in src/comments.js
import * as React from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  DateField,
  EditButton,
  useTranslate,
  RecordContextProvider,
  useListContext,
} from "react-admin";

import AvatarField from "./AvatarField";

const MobileGrid = () => {
  const translate = useTranslate();
  const { data, error, isPending } = useListContext();

  if (isPending || error || data.length === 0) {
    return null;
  }

  return (
    <Box margin="0.5em">
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Card sx={{ margin: "0.5rem 0" }}>
            <CardHeader
              title={`${record.firstName} ${record.lastName}`}
              subheader={
                <>
                  {translate("Last Modified")}
                  &nbsp;
                  <DateField source="updatedAt" />
                </>
              }
              avatar={<AvatarField size="45" />}
              action={<EditButton />}
            />
          </Card>
        </RecordContextProvider>
      ))}
    </Box>
  );
};

export default MobileGrid;
