import { test, expect } from "@playwright/test";

test.describe("Person page", () => {
    test("opens a person detail page and allows local edit", async ({ page }) => {
        await page.goto("/people");

        const firstCard = page.getByTestId("person-card").first();
        await firstCard.click();

        await expect(page).toHaveURL(/\/people\/\d+$/);

        const nameInput = page.getByLabel(/name/i);
        await expect(nameInput).toBeVisible();

        const newName = "Luke Testwalker";
        await nameInput.fill(newName);
        await expect(nameInput).toHaveValue(newName);


        await page.reload();
        await expect(page.getByLabel(/name/i)).toHaveValue(newName);
    });
});
