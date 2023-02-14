function calculateAgeOfUser(user) {
  console.log(user)
  return new Date().getFullYear() - user.birthYear;
}

calculateAgeOfUser('Andrew');
calculateAgeOfUser(-1);
calculateAgeOfUser();
