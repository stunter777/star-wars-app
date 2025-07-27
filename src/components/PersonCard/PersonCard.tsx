import { Card, CardContent, Typography } from "@mui/material";
import {Person} from "@/lib/types";


export default function PersonCard({ person }: { person: Person }) {
    return (
        <Card
            data-testid="person-card"
            sx={{
                transition: "0.2s",
                "&:hover": { boxShadow: 6 },
                cursor: "pointer",
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {person.name}
                </Typography>
                <Typography variant="body2">Gender: {person.gender}</Typography>
                <Typography variant="body2">Birth: {person.birth_year}</Typography>
                <Typography variant="body2">Height: {person.height}</Typography>
            </CardContent>
        </Card>
    );
}
