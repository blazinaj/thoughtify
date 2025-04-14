import {Chip} from "@mui/material";

export const ProjectStatusChip = ({status}) => {
    switch (status) {
        case 'NOT_STARTED':
            return (
                <Chip
                    size={'small'}
                    color={'default'}
                    label={'Not Started'}
                />
            )
        case 'IN_PROGRESS':
            return (
                <Chip
                    size={'small'}
                    color={'secondary'}
                    label={'In Progress'}
                />
            )
        case 'COMPLETED':
            return (
                <Chip
                    size={'small'}
                    color={'success'}
                    label={'Completed'}
                />
            )
        default:
            return (
                <Chip
                    size={'small'}
                    label={status}
                />
            )

    }
}
