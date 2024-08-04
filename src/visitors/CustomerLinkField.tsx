import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import FullNameField from './FullNameField';

const CustomerLinkField = (_FieldProps: FieldProps) => {
    const record = useRecordContext();
    if (!record) {
        return null;
    }
    return (
        <Link to={`/customers/${record.id}`}>
            <FullNameField source="last_name" />
        </Link>
    );
};

export default CustomerLinkField;
