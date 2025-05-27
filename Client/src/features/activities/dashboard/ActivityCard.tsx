import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props = {
    activity: Activity,
    selectActivity: (id: string) => void
}
export default function ActivityCard({ activity, selectActivity }: Props) {

    const { deleteActivity } = useActivities()

    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date.toString()}</Typography>
                <Typography variant="body2">{activity.description}</Typography>
                <Typography variant="subtitle1">{activity.city}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip variant="outlined" label={activity.category} />
                <Box display='flex' gap={1}>
                    <Button size="medium" variant="contained" onClick={() => selectActivity(activity.id)}>View</Button>
                    <Button
                        size="medium"
                        variant="contained"
                        color="error"
                        disabled={deleteActivity.isPending}
                        onClick={async() => await deleteActivity.mutateAsync(activity.id)}>Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}