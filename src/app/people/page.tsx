"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {Container, Typography, TextField, Box, Pagination, Skeleton, Alert} from "@mui/material";
import Grid from "@mui/material/Grid";
import PersonCard from "@/components/PersonCard/PersonCard";
import {extractIdFromUrl, Person, SwapiListResponse} from "@/lib/types";


export default function PeoplePage() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const [data, setData] = useState<SwapiListResponse<Person> | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);


    useEffect(() => {
        let abort = false;
        async function load() {
            setLoading(true);
            try {
                const res = await fetch(`/api/people?search=${debouncedSearch}&page=${page}`, {
                    cache: "no-store",
                });
                if (!res.ok) throw new Error("failed");
                const json = (await res.json()) as SwapiListResponse<Person>;
                if (!abort) setData(json);
            } catch {
                if (!abort) setData(null);
            } finally {
                if (!abort) setLoading(false);
            }
        }
        load();
        return () => { abort = true; };
    }, [debouncedSearch, page]);
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Star Wars — People
            </Typography>
            <TextField
                label="Search by name"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                }}
                sx={{ mb: 3 }}
            />



            <Grid container spacing={2}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <Grid size={{xs:12, sm: 6, md:4}} key={i}>
                            <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
                        </Grid>
                    ))
                ) : data?.results.length ? (
                    data.results.map((p) => {
                        const id = extractIdFromUrl(p.url);
                        return (
                            <Grid size={{xs:12, sm: 6, md:4}} key={id}>
                                <Link href={`/people/${id}`} style={{ textDecoration: "none" }}>
                                    <PersonCard person={p} />
                                </Link>
                            </Grid>
                        );
                    })
                ) : (
                    <Grid size={12}>
                        <Alert data-testid={"no-results"} severity="info">
                            No results found for <strong>{debouncedSearch}</strong>.
                        </Alert>
                    </Grid>
                )}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={Math.ceil((data?.count ?? 0) / 10)}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    color="primary"
                />
            </Box>
        </Container>
    );
}
