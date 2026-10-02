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

