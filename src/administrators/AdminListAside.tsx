import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnOutlined';
import MailIcon from '@mui/icons-material/MailOutline';
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined';
import {
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    SavedQueriesList,
} from 'react-admin';
import {
    endOfYesterday,
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths,
} from 'date-fns';
const Aside = () => (
    <Card
        sx={{
            display: {
                xs: 'none',
                md: 'block',
            },
            order: -1,
            flex: '0 0 15em',
            mr: 2,
            mt: 6,
            alignSelf: 'flex-start',
        }}
    >
        <CardContent sx={{ pt: 1 }}>
            <FilterLiveSearch hiddenLabel />

            <SavedQueriesList />

            <FilterList
                label="Last Visited"
                icon={<AccessTimeIcon />}
            >
                <FilterListItem
                    label="Filters Today"
                    value={{
                        last_seen_gte: endOfYesterday().toISOString(),
                        last_seen_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="This Week"
                    value={{
                        last_seen_gte: startOfWeek(new Date()).toISOString(),
                        last_seen_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="Last Week"
                    value={{
                        last_seen_gte: subWeeks(
                            startOfWeek(new Date()),
                            1
                        ).toISOString(),
                        last_seen_lte: startOfWeek(new Date()).toISOString(),
                    }}
                />
                <FilterListItem
                    label="This Month"
                    value={{
                        last_seen_gte: startOfMonth(new Date()).toISOString(),
                        last_seen_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="Last Month"
                    value={{
                        last_seen_gte: subMonths(
                            startOfMonth(new Date()),
                            1
                        ).toISOString(),
                        last_seen_lte: startOfMonth(new Date()).toISOString(),
                    }}
                />
                <FilterListItem
                    label="Earlier"
                    value={{
                        last_seen_gte: undefined,
                        last_seen_lte: subMonths(
                            startOfMonth(new Date()),
                            1
                        ).toISOString(),
                    }}
                />
            </FilterList>

            <FilterList
                label="Has Ordered"
                icon={<MonetizationOnIcon />}
            >
                <FilterListItem
                    label="True"
                    value={{
                        nb_orders_gte: 1,
                        nb_orders_lte: undefined,
                    }}
                />
                <FilterListItem
                    label="False"
                    value={{
                        nb_orders_gte: undefined,
                        nb_orders_lte: 0,
                    }}
                />
            </FilterList>

            <FilterList
                label="Has Newsletter"
                icon={<MailIcon />}
            >
                <FilterListItem
                    label="True"
                    value={{ has_newsletter: true }}
                />
                <FilterListItem
                    label="False"
                    value={{ has_newsletter: false }}
                />
            </FilterList>
        </CardContent>
    </Card>
);

export default Aside;
