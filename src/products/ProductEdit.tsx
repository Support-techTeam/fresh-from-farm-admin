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
  useNotify,
  useRedirect,
  useRefresh,
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
const notify = useNotify();
const refresh = useRefresh();
const redirect = useRedirect();
const onSuccess = (data: any) => {
  notify(`Changes to Product Detail for "${data.name}" was saved`);
  redirect("/products");
  refresh();
};

const ProductEdit = () => (
  <Edit
    title={<ProductTitle />}
    mutationMode="pessimistic"
    mutationOptions={{ onSuccess }}
  >
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
