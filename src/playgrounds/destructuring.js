/****************************************************************
 *  OBJECT DESTRUCTURING
 ****************************************************************/

// const person = {
//     name: 'Kyle',
//     age: 33,
//     location: {
//         city: 'Atlanta',
//         temperature: 50000000000
//     }
// };

// // De-structuring the top-level object
// const {name, age} = person;

// console.log(`${name} is ${age}`);

// // De-structuring a nested object
// const { city, temperature } = person.location;

// if (city && temperature) {
//     console.log(`It is ${temperature} in ${city}`);
// }

// // Variables can be re-named when destructuring
// const { name: theDude } = person;

// console.log(theDude);

// // Defaults are also supported (only used if hobby was not a member of the object)
// const { hobby = 'Unknown' } = person;

// console.log(hobby);


// const book = {
//     name: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;

// console.log(publisherName);



/****************************************************************
 *  ARRAY DESTRUCTURING
 ****************************************************************/

 const address = ['3422 Sandy Bank Dr', 'Dacula', 'GA', '30011'];
 // De-structure array.  Custom names as they don't exist in array.  Also supports defaults.
 // empty space with a comma can be used to disregard values.  If more values exist than names
 // given for de-structure, then subsequent values are disregarded.
 const [street, city, state, zip] = address;

 console.log(`You are in ${city}, ${state}`);


 const item = ['Coffee (hot)', '$2.00', '$2.50', '$3.00'];
 const [itemDesc, , medPrice] = item;

 console.log(`A medium ${itemDesc} costs ${medPrice}`);
