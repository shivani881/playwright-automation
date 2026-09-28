import { test, expect } from "@playwright/test";

test("create user using api", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    data: {
      name: "shivani",
      job: "Senior SDET",
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.name).toBe("shivani");
  console.log("give me the id of record", body.id);
});

test("Fetch Auth Token.", async ({ request }) => {
  const response = await request.post("https://dummyjson.com/auth/login", {
    data: {
      username: "emilys",
      password: "emilyspass",
    },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log("My Auth Token:", body.accessToken);
});

test.only("tm login bypass", async ({ page, context, request }) => {
  const response = await request.post(
    "https://tmqa.trackofarm.in/authenticate/user",
    {
      data: {
        username: "tm_roles",
        password: "roles123",
        loginMode: "WEB",
        companyIdentifier: "tm_roles",
        language: "en",
      },
    },
  );
  expect(response.status()).toBe(200);
  const body = await response.json();
  console.log("print token", body.data.jwtToken);
 // 1. Visit the base URL first so the browser initializes its storage
  await page.goto("https://tmqa.trackofarm.in");

  // 2. Inject the token directly into Local Storage
  // (If you found it in Session Storage, change 'localStorage' to 'sessionStorage')
  await page.evaluate((apidata) => {
    window.localStorage.setItem('tm_roles_token', apidata.jwtToken);
    // Set the login meta key (Must be stringified into a JSON string)
    window.localStorage.setItem('tm_roles_loginMeta', JSON.stringify(apidata));
  }, body.data);
  
  await page.reload();
    // 3. Navigate directly to the protected page (UI login skipped!)
    await page.goto('https://tmqa.trackofarm.in/web/0/route/allocation/dashboard?lang=en');
  
    await page.waitForTimeout(5000)

});
