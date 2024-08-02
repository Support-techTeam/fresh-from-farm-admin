import * as React from 'react';
import { Box, Card, CardActions, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CodeIcon from '@mui/icons-material/Code';
import { useTranslate } from 'react-admin';

import publishArticleImage from './welcome_illustration.svg';

const Welcome = () => {
    const translate = useTranslate();
    return (
        <Card
            sx={{
                marginTop: 2,
                border: '0px solid',
            }}
        >
        </Card>
    );
};

export default Welcome;
