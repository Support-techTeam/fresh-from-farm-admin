import * as React from "react";
import {
  ImageField,
  ImageInput,
  NumberInput,
  SelectInput,
  TextInput,
  useDataProvider,
  useNotify,
  required,
} from "react-admin";
import { InputAdornment, Grid } from "@mui/material";
import { RichTextInput } from "ra-input-rich-text";

// Define required validator
const req = [required()];

// Component to fetch and display product details
export const ProductEditDetails = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const [categories, setCategories] = React.useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await dataProvider.getList('categories', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'name', order: 'ASC' },
        });
        setCategories(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dataProvider]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    notify(`Error: ${error}`);
    return <div>Error loading categories</div>;
  }

  const categoryChoices = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <Grid container columnSpacing={2}>
      {/* Descriptions */}
      <Grid item xs={12} sm={8}>
        <TextInput source="name" validate={req} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SelectInput
          optionText="name"
          optionValue="name"
          source="category"
          choices={categoryChoices}
          validate={req}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextInput source="unit" validate={req} />
      </Grid>
      {/* Prices */}
      <Grid item xs={12} sm={4}>
        <NumberInput
          source="price_qty"
          label="Price per Unit"
          defaultValue={0}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          validate={req}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          source="cost_price"
          defaultValue={0}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          validate={req}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          source="price"
          label="Selling Price"
          defaultValue={0}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          validate={req}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          source="discount"
          defaultValue={0}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          validate={req}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput
          source="tax"
          defaultValue={0}
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          validate={req}
        />
      </Grid>
      {/* Quantity | Origin */}
      <Grid item xs={12} sm={4}>
        <NumberInput
          source="availiableQty"
          label="Available Stock"
          validate={req}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <NumberInput source="criticalQty" label="Critical Stock" validate={req} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextInput source="origin" label="Origin Country" validate={req} />
      </Grid>
      {/* Product Status */}
      <Grid item xs={12} sm={4}>
        <SelectInput
          source="bestSeller"
          label="Best Seller"
          defaultValue={"false"}
          choices={[
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SelectInput
          source="specialOffer"
          label="Special Offer"
          defaultValue={"false"}
          choices={[
            { id: true, name: "Yes" },
            { id: false, name: "No" },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4}></Grid>
      <Grid item xs={12} sm={12}>
        <ImageInput
          source="imageSrc"
          label="Product image"
          accept={{ "image/*": [".png", ".jpg"] }}
          maxSize={5000000}
          sx={{
            "& .RaFileInput-dropZone": {
              objectFit: "contain",
              border: "0.5px solid gray",
            },
          }}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </Grid>
      {/* Description */}
      <Grid item xs={12} sm={12}>
        {/* <RichTextInput source="description" label="" /> */}
        <TextInput source="description" validate={[required()]}  multiline />
      </Grid>
    </Grid>
  );
};
