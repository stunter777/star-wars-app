"use client";
import {use, useEffect, useState} from "react";
import { useLocalPerson } from "@/hooks/useLocalPerson";
import {
    Container,
    Typography,
    TextField,
    Button,
    Stack,
    Box, CircularProgress,
} from "@mui/material";
import {Person} from "@/lib/types";

export default function PersonPage(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params);
    const [original, setOriginal] = useState<Person | null>(null);
    const [loading, setLoading] = useState(false);

    const { merged, edits, update, reset } = useLocalPerson(id, original || undefined);

    useEffect(() => {
        let abort = false;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`/api/people/${id}`, { cache: "no-store" });
                if (!res.ok) throw new Error("failed");
                const json = (await res.json()) as Person;
                if (!abort) setOriginal(json);
            } finally {
                if (!abort) setLoading(false);
            }
        }
        load();
        return () => { abort = true; };
    }, [id]);

    if (loading && !original) return  <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
        <CircularProgress />
    </Box>;
    if (!merged) return <Container>Not found</Container>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4">{merged.name}</Typography>

            <Stack spacing={2} sx={{ mt: 3 }}>
                {["name", "height", "mass", "birth_year", "gender"].map((key) => (
                    <TextField
                        key={key}
                        label={key.replace("_", " ")}
                        value={merged[key as keyof Person]}
                        onChange={(e) =>
                            update({ [key]: e.target.value } as Partial<Person>)
                        }
                    />
                ))}
                <Box>
                    <Button variant="outlined" onClick={reset}>
                        Reset local changes
                    </Button>
                </Box>
            </Stack>

            {Object.keys(edits).length > 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Changes are saved to localStorage.
                </Typography>
            )}
        </Container>
    );
}
