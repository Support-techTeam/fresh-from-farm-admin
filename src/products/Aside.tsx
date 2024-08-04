import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
    useGetList,
} from 'react-admin';

import { Category } from '../types';
import { humanize } from 'inflection';

const Aside = () => {
    const { data } = useGetList<Category>('categories', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'name', order: 'ASC' },
    });

    return (
        <Card
            sx={{
                display: { xs: 'none', md: 'block' },
                order: -1,
                width: '15em',
                mr: 2,
                alignSelf: 'flex-start',
            }}
        >
            <CardContent sx={{ pt: 1 }}>
                <FilterLiveSearch hiddenLabel />

                <SavedQueriesList />

                <FilterList
                    label="Sales"
                    icon={<AttachMoneyIcon />}
                >
                    <FilterListItem
                        label="Best Sellers"
                        value={{
                            sales_lte: undefined,
                            sales_gt: 25,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Average Sellers"
                        value={{
                            sales_lte: 25,
                            sales_gt: 10,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Low Sellers"
                        value={{
                            sales_lte: 10,
                            sales_gt: 0,
                            sales: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Never Sold"
                        value={{
                            sales_lte: undefined,
                            sales_gt: undefined,
                            sales: 0,
                        }}
                    />
                </FilterList>

                <FilterList
                    label="Stock"
                    icon={<BarChartIcon />}
                >
                    <FilterListItem
                        label="No Stock"
                        value={{
                            stock_lt: undefined,
                            stock_gt: undefined,
                            stock: 0,
                        }}
                    />
                    <FilterListItem
                        label="Low Stock"
                        value={{
                            stock_lt: 10,
                            stock_gt: 0,
                            stock: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Average Stock"
                        value={{
                            stock_lt: 50,
                            stock_gt: 9,
                            stock: undefined,
                        }}
                    />
                    <FilterListItem
                        label="Enough Stock"
                        value={{
                            stock_lt: undefined,
                            stock_gt: 49,
                            stock: undefined,
                        }}
                    />
                </FilterList>

                <FilterList
                    label="Categories"
                    icon={<LocalOfferIcon />}
                >
                    {data &&
                        data.map((record: any) => (
                            <FilterListItem
                                label={humanize(record.name)}
                                key={record.id}
                                value={{ category_id: record.id }}
                            />
                        ))}
                </FilterList>
            </CardContent>
        </Card>
    );
};

export default Aside;
