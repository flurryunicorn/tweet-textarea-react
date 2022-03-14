import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test.describe("Hashtags", async () => {
    test.describe("Hashtags relation to other entities", async () => {
        test.describe("Hashtags in relation to user mentions", async () => {
            test("If the user types the @ character after a highlighted hashtag, then the highlighting will be maintained", async ({
                page,
            }) => {
                const editor = page.locator("div.tweet-textarea");

                await editor.type("Hello #100DaysOfCode@", { delay: 100 });

                const span = editor.locator("span");

                await expect(span).toBeVisible();
                await expect(await span.count()).toBe(1);
                await expect(span).toHaveText("#100DaysOfCode");
                await expect(span).toHaveClass("highlight");
            });

            test("If the user types a valid user mention after a highlighted hashtag, then the highlighting will be maintained", async ({
                page,
            }) => {
                const editor = page.locator("div.tweet-textarea");

                await editor.type("Hello #100DaysOfCode@amsaid1989", {
                    delay: 100,
                });

                const span = editor.locator("span");

                await expect(span).toBeVisible();
                await expect(await span.count()).toBe(1);
                await expect(span).toHaveText("#100DaysOfCode");
                await expect(span).toHaveClass("highlight");
            });

            test("If the user types the @ character immediately before a highlighted hashtag, with no characters separating them, then the highlighting will be maintained", async ({
                page,
            }) => {
                const editor = page.locator("div.tweet-textarea");

                await editor.type("Hello #100days", { delay: 100 });

                for (let i = 0; i < 8; i++) {
                    await editor.press("ArrowLeft");
                }

                await editor.type("@", { delay: 100 });

                const span = editor.locator("span");

                await expect(span).toBeVisible();
                await expect(await span.count()).toBe(1);
                await expect(span).toHaveText("#100days");
                await expect(span).toHaveClass("highlight");
            });

            test("If the user types the @ character, followed by other word characters, immediately before a highlighted hashtag, with no characters separating them, then the highlighting will be removed", async ({
                page,
            }) => {
                const editor = page.locator("div.tweet-textarea");

                await editor.type("Hello #100days", { delay: 100 });

                const span = editor.locator("span");

                for (let i = 0; i < 8; i++) {
                    await editor.press("ArrowLeft");
                }

                await editor.type("@amsaid1989", { delay: 100 });

                await expect(span).toBeVisible();
                await expect(await span.count()).toBe(1);
                await expect(span).toHaveText("@amsaid1989");
                await expect(span).toHaveClass("highlight");
            });
        });
    });
});
