
import { assert } from 'chai';
import supertest from 'supertest';

import jsonData from './testData/bookingData.json'

// Create a request instance globally
const request = supertest(jsonData['baseUrl']); 

var bookingId=''

describe('Booking  API tests', () => {
    it('should create a booking successfully', async () => {
        const bookingData=  jsonData['originalBookingData']
        const res = await request.post('/booking')
        .send(bookingData)
        .set('Accept', jsonData['headers'].Accept) // Set the Accept header
        .set('Content-Type',jsonData['headers']['Content-Type']); // Set Content-Type header;
        
        assert.equal(res.status, 200);
        assert.isTrue(Object.keys(res.body).includes('bookingid'));

        bookingId= res.body['bookingid']
        assert.deepInclude(res.body.booking, bookingData);
    });

    it('should return an error for missing required fields', async()=>{
        const missingBookingData = jsonData['missingBookingData']
        const res = await request.post('/booking')
            .send(missingBookingData)
        assert.equal(res.status, 400);
    })

    // UpdateBooking API Endpoint Tests
    it('should update a booking successfully', async () => {
        const updategBookingData = jsonData['updateBookingData']
        const res = await request.put(`/booking/${bookingId}`)
            .send(updategBookingData)
            .set('Content-Type', jsonData['headers']['Content-Type']) // Set Content-Type header
            .set('Accept', jsonData['headers'].Accept) // Set Accept header
            .set('Cookie', jsonData['headers']['Cookie']) // Set Cookie header

        assert.equal(res.status, 200);
        assert.deepInclude(res.body, updategBookingData);
    });

    // Get Booking
    it('should retrieve the booking successfully', async () => {
        const res = await request
            .get(`/booking/${bookingId}`)
            .set('Accept', jsonData['headers'].Accept)

        assert.equal(res.status, 200)
        assert.isTrue(Object.keys(res.body).includes('firstname'))
        assert.isTrue(Object.keys(res.body).includes('lastname'))
        assert.isTrue(Object.keys(res.body).includes('totalprice'))
        assert.isTrue(Object.keys(res.body).includes('depositpaid'))
    });

    // Delete Booking
    it('should delete the booking successfully', async () => {
        const res = await request.delete(`/booking/${bookingId}`)
            .set('Accept', jsonData['headers'].Accept) 
            .set('Authorization', jsonData['headers']['Authorization']); // Include token if necessary
        
        // Status 201 for successful delete
        assert.equal(res.status, 201)
        
        // Verify that the booking no longer exists
        const getRes = await request
        .get(`/booking/${bookingId}`)
        .set('Accept', jsonData['headers'].Accept);

        assert.equal(getRes.status, 404);// Status 404 for not found
    });

});
