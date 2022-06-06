"use strict";
exports.__esModule = true;
var faker_1 = require("@faker-js/faker");
var fs = require('fs');
var jsonObject = {
    listOfObjects: []
};
for (var i = 0; i < 100; i++) {
    var object = {
        firstName: faker_1.faker.name.firstName(),
        lastName: faker_1.faker.name.lastName(),
        contactNum: faker_1.faker.phone.phoneNumber('09#########'),
        dateOfBirth: faker_1.faker.date.birthdate().toLocaleDateString('en-US', { month: "2-digit", day: "2-digit", year: "2-digit" }),
        address: faker_1.faker.address.city(),
        appointmentDate: faker_1.faker.date.future().toLocaleDateString('en-US', { month: "2-digit", day: "2-digit", year: "numeric" }),
        startTime: faker_1.faker.date.future().toLocaleTimeString('nl', { hour: '2-digit', hourCycle: 'h24', minute: '2-digit' }),
        endTime: faker_1.faker.date.future().toLocaleTimeString('nl', { hour: '2-digit', hourCycle: 'h24', minute: '2-digit' })
    };
    jsonObject.listOfObjects.push(object);
}
var stringify = JSON.stringify(jsonObject, null, '\n');
fs.writeFile('fakeData.json', stringify, function (err) {
    if (err)
        throw err;
    console.log('complete');
});
