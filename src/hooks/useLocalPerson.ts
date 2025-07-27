"use client";

import { useEffect, useState, useCallback } from "react";
import { loadEdits, saveEdits } from "@/lib/localStorage";
import {Person} from "@/lib/types";

export function useLocalPerson(id: string, original?: Person) {
    const [edits, setEdits] = useState<Partial<Person>>({});

    useEffect(() => {
        const all = loadEdits();
        setEdits(all[id] ?? {});
    }, [id]);

    const merged: Person | undefined = original
        ? { ...original, ...edits }
        : undefined;

    const update = useCallback((patch: Partial<Person>) => {
        setEdits(prev => {
            const next = { ...prev, ...patch };
            const all = loadEdits();
            all[id] = next;
            saveEdits(all);
            return next;
        });
    }, [id]);

    const reset = useCallback(() => {
        const all = loadEdits();
        delete all[id];
        saveEdits(all);
        setEdits({});
    }, [id]);

    return { merged, edits, update, reset };
}
