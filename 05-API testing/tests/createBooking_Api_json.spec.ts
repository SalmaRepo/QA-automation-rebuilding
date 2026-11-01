import { test, expect } from "@playwright/test";
import fs from 'fs'

const BASE_URL="https://restful-booker.herokuapp.com"

test("Create booking with JSON data",async ({request})=>{

    const jsonFile="test-data/data.json";
    const requestPayload=JSON.parse(fs.readFileSync(jsonFile,'utf-8'));
    /*
    const requestPayload={
   
    "firstname": "Sally",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2013-02-23",
        "checkout": "2014-10-23"
    },
    "additionalneeds": "Breakfast"
}*/

    

    const response=await request.post(`${BASE_URL}/booking`,{data:requestPayload});
    const responseBody=await response.json();

    console.log(responseBody);
    

    expect(response.status()).toBe(200);
    expect(response.statusText()).toBe("OK");

    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody.bookingid).toEqual(expect.any(Number))
    const booking=await responseBody.booking;
    expect(booking).toMatchObject(requestPayload);
    expect(booking.bookingdates).toMatchObject({
        "checkin": booking.bookingdates.checkin,
        "checkout": booking.bookingdates.checkout
    })

})