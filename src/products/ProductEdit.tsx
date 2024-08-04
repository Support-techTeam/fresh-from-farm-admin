import * as React from "react";
import {
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Pagination,
  ReferenceManyField,
  ReferenceManyCount,
  required,
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
  SimpleForm,
  DateInput,
  FormTab,
  NumberInput,
} from "react-admin";

import { ProductEditDetails } from "./ProductEditDetails";
import { Helmet } from "react-helmet-async";

const ProductTitle = () => {
  const record = useRecordContext<any>();
  console.log(record, "Product Title");
  return record ? (
    <span>
      Product "{record.name} : {record.product_code}"
    </span>
  ) : null;
};

const ProductEdit = () => (
  <Edit title={<ProductTitle />}>
    {/* <Edit> */}
    <Helmet>
      <title>Edit Product | Fresh From Farm Admin!</title>
      <link rel="canonical" href={window?.location?.href} />
    </Helmet>
    <SimpleForm>
      <ProductEditDetails />
    </SimpleForm>
  </Edit>
);

const req = [required()];

export default ProductEdit;
