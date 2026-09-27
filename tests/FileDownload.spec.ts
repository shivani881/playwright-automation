import { test, expect } from "@playwright/test";

test("file download", async ({ page }) => {
  await page.goto("https://demoqa.com/upload-download");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("#downloadButton").click(),
  ]);

  await download.saveAs("my_downloaded_image.jpeg");
  console.log(download.suggestedFilename());
});
