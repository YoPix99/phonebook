const mongoose = require("mongoose")

mongoose.set('strictQuery', false)

const password = process.argv[2]

const url = `mongodb+srv://tommymartins1999:${password}@cluster0.9yavvln.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String  // Corrigido de "Number" para "number"
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(() => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
