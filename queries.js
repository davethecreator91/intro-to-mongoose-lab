/*------------------------------- Starter Code -------------------------------*/

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');



const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries()

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');

  // Close our app, bringing us back to the command line.
  process.exit();
};

const runQueries = async () => {
  console.log('Queries running.')
  // The functions calls to run queries in our db will go here as we write them.
};

connect()
/*------------------------------ Query Functions -----------------------------*/

const CustomerCRMSchema = new mongoose.Schema({
id: { type:mongoose.Schema.Types.ObjectId, /*required: true */ },
name: { type: String, required: true},
age: { type: Number, required:true}
});

// Compile the schema into a model:
const Customer = mongoose.model('Customer', CustomerCRMSchema);

// Export the model:
module.exports = Customer;



//Customer Data Management

// const Customer = require('./queries');

const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Your name is ${username}`);

// menu

async function mainMenu() {
    while (true) {
        console.log('\n=== Customer Management ===');
        console.log('1. Add a customer');
        console.log('2. View all customers');
        console.log('3. Update a customer');
        console.log('4. Delete a customer');
        console.log('5. Exit');
        const choice = prompt('Choose an option (1-5): ')

        switch (choice) {
            case '1':
                await addCustomer();
                break;
            case '2':
                await viewCustomers();
                break;
            case '3':
                await updateCustomer();
                break;
            case '4':
                await deleteCustomer();
                break;
            case '5':
                console.log('Exiting...');
                mongoose.connection.close();
                return;
            default:
                console.log('Invalid choice. Please try again.'); 
        }
    }
}
mainMenu();
async function addCustomer() {
    const name = prompt('Enter a customer name ');
    const age = parseInt(prompt('Enter a customer age'), 10);
    const customer = new Customer({ name, age });
    await customer.save();
    console.log('Customer added!');
    
}

