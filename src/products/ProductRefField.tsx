import * as React from 'react';
import { useRecordContext, Link } from 'react-admin';

const ProductRefField = (_: { source: string }) => {
    const record = useRecordContext();
    return record ? (
        <Link to={`/products/${record.id}`}>{record.name}</Link>
    ) : null;
};

export default ProductRefField;
