import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
    return (
        <Paper sx={{
            display: 'flex',
            color: 'white',
            flexDirection: 'column',
            gap: 6,
            borderRadius: 0,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundImage: 'linear-gradient(135deg, #182e73 0%, #218aae 69%, #20a7ac 89%)'

        }}>
            <Box sx={{ display: 'flex' , flexDirection: 'inherit', alignItems: 'center', alignContent: 'center', color: 'white', gap: 3, height: '100hv'}}>
                <Group sx={{ height: 110, width: 110 }} />
                <Typography variant="h1">
                    Reactivities
                </Typography>
                <Typography variant="h2">
                    Welcome to reactivities
                </Typography>
                <Button component={Link} to='/activities' size="large" variant="contained"
                    sx={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}>
                    Take me to the activities!
                </Button>
            </Box>
        </Paper>
    )
}