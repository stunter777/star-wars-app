export interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    url: string; // содержит id в конце
}

export interface SwapiListResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export function extractIdFromUrl(url: string): string {
    // url вида https://swapi.py4e.com/api/people/1/
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}
