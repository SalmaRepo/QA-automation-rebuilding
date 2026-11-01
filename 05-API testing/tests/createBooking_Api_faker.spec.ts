import { test, expect } from "@playwright/test";
import fs from "fs";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

const BASE_URL = "https://restful-booker.herokuapp.com";

test("Create booking with JSON data", async ({ request }) => {
  const firstname = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int({ min: 100, max: 500 });
  const depositpaid = faker.datatype.boolean();
  const chekinDate = DateTime.now().toFormat("yyyy-MM-dd");
  const chekoutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");
  const additionalneeds = "super bowls";
  //const jsonFile = "test-data/data.json";
  //const requestPayload = JSON.parse(fs.readFileSync(jsonFile, "utf-8"));
  
    const requestPayload={
   
    "firstname": firstname,
    "lastname": lastName,
    "totalprice":totalPrice,
    "depositpaid": depositpaid,
    "bookingdates": {
        "checkin": chekinDate,
        "checkout": chekoutDate
    },
    "additionalneeds": additionalneeds
}

  const response = await request.post(`${BASE_URL}/booking`, {
    data: requestPayload,
  });
  const responseBody = await response.json();

  console.log(responseBody);

  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe("OK");

  expect(responseBody).toHaveProperty("bookingid");
  expect(responseBody).toHaveProperty("booking");
  expect(responseBody.bookingid).toEqual(expect.any(Number));
  const booking = await responseBody.booking;
  console.log(booking)
  expect(booking).toMatchObject(requestPayload);
  expect(booking.bookingdates).toMatchObject({
    checkin: booking.bookingdates.checkin,
    checkout: booking.bookingdates.checkout,
  });
});
