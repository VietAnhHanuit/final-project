import {faker} from '@faker-js/faker';

const jobTitles = [
  'Software Engineer',
  'Front-end Developer',
  'Data Scientist',
  'Product Manager',
  'Marketing Manager',
  'Human Resources Specialist',
  'Graphic Designer',
  'Sales Representative',
  'Customer Service Representative',
  'Accountant',
];

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomBoolean = () => {
  return Math.random() < 0.5;
}

export const getFatherNpc = () => {
  return {
    name: faker.person.fullName({
      sex: 'male',
    }),
    position: 'Father',
    happiness: getRandomInt(50, 100),
    age: getRandomInt(25, 40),
    job: faker.person.jobTitle(),
    degree: faker.person.jobType(),
    gender: 1,
    idDead: false,
  };
};

export const getMotherNpc = () => {
  return {
    name: faker.person.fullName({
      sex: 'female',
    }),
    position: 'Mother',
    happiness: getRandomInt(50, 100),
    age: getRandomInt(25, 40),
    job: faker.person.jobTitle(),
    degree: faker.person.jobType(),
    gender: 0,
    idDead: false,
  };
};

export const getMaleFriendNpc = () => {
  return {
    name: faker.person.fullName({
      sex: 'male',
    }),
    position: 'Friend',
    happiness: getRandomInt(0, 100),
    age: getRandomInt(0, 40),
    job: faker.person.jobTitle(),
    degree: faker.person.jobType(),
    gender: 1,
  };
};

export const getFemaleFriendNpc = () => {
  return {
    name: faker.person.fullName({
      sex: 'female',
    }),
    position: 'Friend',
    happiness: getRandomInt(0, 100),
    age: getRandomInt(0, 40),
    job: faker.person.jobTitle(),
    degree: faker.person.jobType(),
    gender: 0,
  };
};
