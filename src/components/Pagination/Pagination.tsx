"use client";

import { Pagination as MuiPagination, Box } from "@mui/material";

interface Props {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
}

export default function Pagination({ page, pageSize, total, onChange }: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return (
        <Box display="flex" justifyContent="center" mt={2}>
            <MuiPagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => onChange(newPage)}
                color="primary"
                shape="rounded"
            />
        </Box>
    );
}
