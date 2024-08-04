import * as React from "react";
import {
  Create,
  SimpleForm,
} from "react-admin";
import { ProductEditDetails } from "./ProductEditDetails";
import { Helmet } from "react-helmet-async";

const ProductCreate = () => (
  <Create>
      <Helmet>
        <title>Create Product | Fresh From Farm Admin!</title>
        <link rel="canonical" href={window?.location?.href} />
      </Helmet>
    <SimpleForm>
      <ProductEditDetails />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
