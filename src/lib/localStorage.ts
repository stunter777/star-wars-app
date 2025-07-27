import {Person} from "@/lib/types";

const KEY = "sw-person-edits";

export type PersonEdits = Record<string, Partial<Person>>; // id -> поля

export function loadEdits(): PersonEdits {
    if (typeof window === "undefined") return {};
    try {
        return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch {
        return {};
    }
}

export function saveEdits(edits: PersonEdits) {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(edits));
}
