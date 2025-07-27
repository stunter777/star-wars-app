import { test, expect } from "@playwright/test";

test.describe("People page", () => {
    test("redirects from / to /people", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveURL(/\/people$/);
    });

    test("renders list, paginates, and can search with empty result state", async ({ page }) => {
        await page.goto("/people");
        const firstCard = page.getByTestId("person-card").first();
        await expect(firstCard).toBeVisible();


        const totalPages = await page.locator('.MuiPagination-ul li button').count().catch(() => 0);
        if (totalPages > 1) {
            await page.getByRole("button", { name: "2" }).click();
        }


        await page.getByLabel("Search by name").fill("zzzzzzzzzzzz");
        await page.waitForTimeout(400);

        const noResults = page.getByTestId("no-results");
        await expect(noResults).toBeVisible();
        await expect(noResults).toContainText("No results");
    });
});
