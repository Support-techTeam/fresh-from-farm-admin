import * as React from 'react';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import { CurrencyPoundSharp } from '@mui/icons-material';

interface Props {
    value?: string;
}

const MonthlyRevenue = (props: Props) => {
    const { value } = props;
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/orders"
            icon={CurrencyPoundSharp}
            title={translate('Monthly Revenue')}
            subtitle={value}
        />
    );
};

export default MonthlyRevenue;
