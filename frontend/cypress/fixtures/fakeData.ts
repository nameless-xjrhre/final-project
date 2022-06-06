import { faker } from '@faker-js/faker'
const fs = require('fs')

let jsonObject = {
  listOfObjects: [],
}

for (let i = 0; i < 100; i++) {
  let object = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    contactNum: faker.phone.phoneNumber('09#########'),
    dateOfBirth: faker.date
      .birthdate()
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
      }),
    address: faker.address.city(),
    appointmentDate: faker.date
      .future()
      .toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }),
    startTime: faker.date
      .future()
      .toLocaleTimeString('nl', {
        hour: '2-digit',
        hourCycle: 'h24',
        minute: '2-digit',
      }),
    endTime: faker.date
      .future()
      .toLocaleTimeString('nl', {
        hour: '2-digit',
        hourCycle: 'h24',
        minute: '2-digit',
      }),
  }
  jsonObject.listOfObjects.push(object)
}

var stringify = JSON.stringify(jsonObject, null, '\n')
fs.writeFile('fakeData.json', stringify, function (err) {
  if (err) throw err
  console.log('complete')
})
