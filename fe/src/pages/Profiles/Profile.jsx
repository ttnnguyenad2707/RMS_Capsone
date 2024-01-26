import { Grid, Paper } from '@mui/material';
import React from 'react';

const Profile = () => {
    return (
        <div>
            <Grid item xs={12} md={12} lg={12}>
            <Paper
                      sx={{
                        p: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      {/* <Chart /> */}
                    </Paper>
            </Grid>

        </div>
    );
};

export default Profile;