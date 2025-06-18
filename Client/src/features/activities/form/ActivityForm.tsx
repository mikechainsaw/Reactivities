import { Box, Button, Paper, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import TextInput from "../../../app/shared/components/TextInput";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";
import LocationInput from "../../../app/shared/components/LocationInput";

export default function ActivityForm() {
    const { reset, handleSubmit, control } = useForm<ActivitySchema>({
        mode: "onTouched",
        resolver: zodResolver(activitySchema)
    });
    const { id } = useParams()
    const navigate = useNavigate()
    const { updateActivity, createActivity, activity } = useActivities(id)

    useEffect(() => {
        if (activity) reset({
            ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                longitude: activity.longitude,
                latitude: activity.latitude
            }
        })
    },
        [activity, reset]
    )

    const onSubmit = async (data: ActivitySchema) => {
        const { location, ...rest } = data
        const flattenedData = { ...rest, ...location }

        try {
            if (activity) {
                updateActivity.mutate({ ...activity, ...flattenedData }, {
                    onSuccess: () => navigate(`/activities/${activity.id}`)
                })
            } else {
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? "Edit Activity" : "Create Activity"}
            </Typography>
            <Box component='form' display='flex' flexDirection='column' gap={3} onSubmit={handleSubmit(onSubmit)}>
                <TextInput control={control} label='Title' name='title' />
                <TextInput control={control} label='Description' name='description' multiline rows={3} />
                <Box display='flex' gap={3} >
                    <SelectInput sx={{ width: '50%' }}
                        items={categoryOptions}
                        control={control}
                        label='Category'
                        name='category' />
                    <DateTimeInput control={control} label='Date' name='date' />
                </Box>
                <LocationInput control={control} label='Enter the location' name='location' />
                <Box display='flex' justifyContent="end" gap={3} >
                    <Button color="inherit"
                        onClick={() => activity ?
                            navigate(`/activities/${activity.id}`)
                            : navigate('/activities')}>Cancel</Button>
                    <Button
                        color="success"
                        variant="contained"
                        type="submit"
                        disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}