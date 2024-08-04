import * as React from 'react';
import {
    NumberField,
    TextField,
    DateField,
    useTranslate,
    useGetList,
    RecordContextProvider,
    useLocaleState,
    useRecordContext,
    Link,
    useReference,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Grid,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import order from '../orders';
import review from '../reviews';
import StarRatingField from '../reviews/StarRatingField';
import {
    Order as OrderRecord,
    Review as ReviewRecord,
    Customer,
} from '../types';

const Aside = () => {
    const record: any = useRecordContext();
    return (
        <Box width={400} display={{ xs: 'none', lg: 'block' }}>
            {record && <EventList />}
        </Box>
    );
};

const EventList = () => {
    const record = useRecordContext();
    const translate = useTranslate();

    return (
        <Box ml={2}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {translate('History')}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={6} display="flex" gap={1}>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box flexGrow={1}>
                                <Typography variant="body2">
                                    {translate(
                                        'First Seen'
                                    )}
                                </Typography>
                                <DateField
                                    record={record}
                                    source="createdAt"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={6} display="flex" gap={1}>
                            <AccessTimeIcon fontSize="small" color="disabled" />
                            <Box flexGrow={1}>
                                <Typography variant="body2">
                                    {translate(
                                        'Last Modified'
                                    )}
                                </Typography>
                                <DateField record={record} source="updatedAt" />
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

interface AsideEvent {
    type: string;
    date: string;
    data: OrderRecord | ReviewRecord;
}

const mixOrdersAndReviews = (
    orders?: OrderRecord[],
    reviews?: ReviewRecord[]
): AsideEvent[] => {
    const eventsFromOrders = orders
        ? orders.map<AsideEvent>(order => ({
              type: 'order',
              date: order.date,
              data: order,
          }))
        : [];
    const eventsFromReviews = reviews
        ? reviews.map<AsideEvent>(review => ({
              type: 'review',
              date: review.date,
              data: review,
          }))
        : [];
    const events = eventsFromOrders.concat(eventsFromReviews);
    events.sort(
        (e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime()
    );
    return events;
};

const Timeline = ({ events }: { events: AsideEvent[] }) => (
    <Stepper orientation="vertical" sx={{ my: 1, ml: 1.5 }}>
        {events.map(event => (
            <Step
                key={`${event.type}-${event.data.id}`}
                expanded
                active
                completed
            >
                <Link
                    to={`/${event.type === 'order' ? 'orders' : 'reviews'}/${
                        event.data.id
                    }`}
                    underline="none"
                >
                    <RecordContextProvider value={event.data}>
                        <StepLabel
                            icon={
                                event.type === 'order' ? (
                                    <order.icon
                                        color="disabled"
                                        sx={{ pl: 0.5 }}
                                    />
                                ) : (
                                    <review.icon
                                        color="disabled"
                                        sx={{ pl: 0.5 }}
                                    />
                                )
                            }
                        >
                            {event.type === 'order' ? (
                                <OrderTitle />
                            ) : (
                                <ReviewTitle />
                            )}
                        </StepLabel>
                        <StepContent>
                            {event.type === 'order' ? <Order /> : <Review />}
                        </StepContent>
                    </RecordContextProvider>
                </Link>
            </Step>
        ))}
    </Stepper>
);

const OrderTitle = () => {
    const record = useRecordContext();
    const translate = useTranslate();
    if (!record) return null;
    return (
        <>
            {translate('pos.events.order.title', {
                smart_count: record.basket.length,
            })}
        </>
    );
};

const Order = () => {
    const record = useRecordContext();
    const [locale] = useLocaleState();
    if (!record) return null;
    return (
        <>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {new Date(record.date).toLocaleString(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Reference &nbsp;#{record.reference}&nbsp;-&nbsp;
                <TextField source="status" />
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <NumberField
                    source="total"
                    options={{ style: 'currency', currency: 'GBP' }}
                />
            </Typography>
        </>
    );
};

const ReviewTitle = () => {
    const record = useRecordContext();
    const translate = useTranslate();
    const { referenceRecord } = useReference({
        reference: 'products',
        id: record?.product_id,
    });
    if (!record) return null;
    return (
        <>
            {translate('pos.events.review.title', {
                product: referenceRecord?.reference,
            })}
        </>
    );
};

const Review = () => {
    const [locale] = useLocaleState();
    const record = useRecordContext();
    if (!record) return null;
    return (
        <>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                {new Date(record.date).toLocaleString(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })}
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}
                gutterBottom
            >
                {record.comment}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                <StarRatingField source="rating" />
            </Typography>
        </>
    );
};

export default Aside;
