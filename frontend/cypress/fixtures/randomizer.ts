export const fakeDataRandomizer = () => {
    let randomNumber = Math.floor(Math.random() * 20)
    return randomNumber
}

export const patientRandomizer = () =>{
    let randomNumber = Math.floor(Math.random() * 10)
    return randomNumber
}

export const medStaffRandomizer = () =>{
    let randomNumber = Math.floor(Math.random() * 10)
    return randomNumber
}

export const genderRandomizer = () =>{
    let randomNumber = Math.floor(Math.random() * 2)
    return randomNumber
}

export const genderStringRandomizer = () =>{
    let gender = []
    let randomNumber = Math.floor(Math.random() * 2)
    if(randomNumber == 0) {
        gender.push('MALE')
    }else{
        gender.push('FEMALE')
    }

    return gender.pop()
}

export const daysRandomizer = () =>{
    let days = []
    let randomNumber = Math.floor(Math.random() * 7)
    if(randomNumber == 0){
        days.push('Mon')
    }else if(randomNumber == 1){
        days.push('Tue')
    }else if(randomNumber == 2){
        days.push('Wed')
    }else if(randomNumber == 3){
        days.push('Thu')
    }else if(randomNumber == 4){
        days.push('Fri')
    }else if(randomNumber == 5){
        days.push('Sat')
    }else if(randomNumber == 6){
        days.push('Sun')
    }
    return days.pop()
}

export const visitTypeRandomizer = () =>{
    let visitType = []
    let randomNumber = Math.floor(Math.random() * 3)
    if(randomNumber == 2){
        visitType.push('ROUTINE')
    }else if(randomNumber == 1) {
        visitType.push('URGENT')
    }else if(randomNumber == 0) {
        visitType.push('FOLLOWUP')
    }

    return visitType.pop()
}

export const statusRandomizer = () =>{
    let status = []
    let randomNumber = Math.floor(Math.random() * 4)
    if(randomNumber == 0){
        status.push('PENDING')
    }else if(randomNumber == 1) {
        status.push('EXPIRED')
    }else if(randomNumber == 2) {
        status.push('DONE')
    }else{
        status.push('CANCELED')
    }

    return status.pop()
}

export const amountRandomizer = ()=>{
    let randomNumber = Math.floor(Math.random() * 100000)
    return randomNumber
}

export const paymentTermRandomizer = () =>{
    let term = []
    let randomNumber = Math.floor(Math.random() * 6)
    if(randomNumber == 0){
        term.push('0 days')
    }else if(randomNumber == 1){
        term.push('7 days')
    }else if(randomNumber == 2){
        term.push('15 days')
    }else if(randomNumber == 3){
        term.push('30 days')
    }else if(randomNumber == 4){
        term.push('45 days')
    }else if(randomNumber == 5){
        term.push('60 days')
    }
    return term.pop()
}