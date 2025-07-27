import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "tests/e2e",
    timeout: 30_000,
    retries: 0,
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        video: "retain-on-failure",
    },
    webServer: {
        command: "npm run build && npm run start -p 3000",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        stdout: "pipe",
        stderr: "pipe",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
