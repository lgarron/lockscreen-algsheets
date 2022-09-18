import { chromium } from "playwright";

const HEADLESS = true;
const port = 5173;

(async function () {
	const browser = await chromium.launch({
		headless: HEADLESS,
	});
	const context = await browser.newContext();
	const page = await context.newPage();
	page.setViewportSize({
		width: 960,
		height: 2079,
	});
	await page.goto(`http://localhost:${port}/`);

	page.waitForSelector("alg-sheet");
	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

	let i = 0;
	for (const coName of "OHSALPUT") {
		console.log("Screenshotting:", coName);
		const sel = await page.waitForSelector(`#${coName}`);

		await sel.screenshot({
			path: `./screenshots/hash-OLL-lockscreen-${++i}-${coName}.png`,
			omitBackground: false,
		});
	}

	browser.close();
})();
