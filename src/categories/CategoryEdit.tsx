import * as React from "react";
import {
  Datagrid,
  Edit,
  EditButton,
  NumberField,
  Labeled,
  ReferenceManyField,
  SimpleForm,
  TextInput,
  useTranslate,
  useRecordContext,
} from "react-admin";

import ThumbnailField from "../products/ThumbnailField";
import ProductRefField from "../products/ProductRefField";
import { Helmet } from "react-helmet-async";

const CategoryEdit = () => (
  <Edit title={<CategoryTitle />}>
    <Helmet>
      <title>Edit Category | Fresh From Farm Admin!</title>
      <link rel="canonical" href={window?.location?.href} />
    </Helmet>
    <SimpleForm>
      <TextInput source="name" />
      <Labeled label="Products" fullWidth>
        <ReferenceManyField
          reference="products"
          target="category_id"
          perPage={20}
        >
          <Datagrid
            sx={{
              "& .column-thumbnail": {
                width: 25,
                padding: 0,
              },
            }}
          >
            <ProductRefField source="name" key="name" />
            <NumberField
              source="product_code"
              label="Product Code"
              key="product_code"
            />
            <NumberField
              source="price"
              options={{ style: "currency", currency: "GBP" }}
              key="price"
            />
            <NumberField
              source="unit"
              options={{ minimumFractionDigits: 2 }}
              key="unit"
            />
            <NumberField
              source="availiableQty"
              label="Available Stock"
              key="availiableQty"
            />
            <EditButton key="edit_button" />
          </Datagrid>
        </ReferenceManyField>
      </Labeled>
    </SimpleForm>
  </Edit>
);

const CategoryTitle = () => {
  const record = useRecordContext();
  const translate = useTranslate();

  return record ? (
    <span>
      {translate("Category", { smart_count: 1 })} &quot;
      {record.name}&quot;
    </span>
  ) : null;
};

export default CategoryEdit;
