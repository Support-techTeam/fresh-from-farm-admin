import * as React from "react";
import {
  Create,
  Datagrid,
  EditButton,
  Labeled,
  NumberField,
  ReferenceManyField,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Helmet } from "react-helmet-async";
import CategoryEdit from "./CategoryEdit";
import ProductRefField from "../products/ProductRefField";
import ThumbnailField from "../products/ThumbnailField";

const CategoryCreate = () => (
  <Create>
    <Helmet>
      <title>Create Product | Fresh From Farm Admin!</title>
      <link rel="canonical" href={window?.location?.href} />
    </Helmet>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
