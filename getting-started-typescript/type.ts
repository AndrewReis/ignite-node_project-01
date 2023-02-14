// Runtime Type checking
// Static Type checking

interface User {
  birthYear: number
}

function calcAgeOfUser(user: User) {
  console.log(user)
  return new Date().getFullYear() - user.birthYear;
}

// Argument of type 'string' is not assignable to parameter of type 'User'.
// calcAgeOfUser('Andrew');'

/* Argument of type '{}' is not assignable to parameter of type 'User'.
  Property 'birthYear' is missing in type '{}' but required in type 'User'.
*/
// calcAgeOfUser({});

calcAgeOfUser({birthYear: 2000})
