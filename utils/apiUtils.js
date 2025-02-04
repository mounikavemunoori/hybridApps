import { browser } from '@wdio/globals'

import fs from 'fs';
import path from 'path';

class BookingData {


      // Method to load booking data from the JSON file
      load(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading or parsing the file: ${error.message}`);
            return null;
        }
    }
}

export default new BookingData()