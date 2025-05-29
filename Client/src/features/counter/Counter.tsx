import { Box, Button, ButtonGroup, List, ListItemText, Paper, Typography } from "@mui/material"
import { useStore } from "../../lib/hooks/useStore"
import { observer } from 'mobx-react-lite'



const counter = observer(
    function Counter() {
        const { counterStore } = useStore()
        return (
            <Box display='flex' justifyContent='space-between'>
                <Box sx={{ width: '60%' }}>
                    <Typography variant="h4" gutterBottom>
                        {counterStore.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        The count is: {counterStore.count}
                    </Typography>

                    <ButtonGroup sx={{ mt: 3, gap: 1 }}>
                        <Button color="error" variant="contained" onClick={() => { counterStore.increment() }}> Increment</Button>
                        <Button color="primary" variant="contained" onClick={() => { counterStore.decrement(5) }}>Decrement 5</Button>
                        <Button color="success" variant="contained" onClick={() => { counterStore.decrement() }}>Decrement</Button>
                    </ButtonGroup>
                </Box>
                <Paper sx={{ width: '40%', p: 4 }}>
                    <Typography variant="h5">Counter Events ({counterStore.eventCount})</Typography>
                    <List>
                        {counterStore.events.map((event, index) => (
                            <ListItemText key={index}>
                                {event}
                            </ListItemText>
                        ))}
                    </List>
                </Paper>
            </Box>

        )

    }
)

export default counter