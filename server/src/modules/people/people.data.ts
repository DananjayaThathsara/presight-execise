import { faker } from "@faker-js/faker";
import { Person } from "../../types";

//Nationalities to generate random data for people
const NATIONALITIES = [
  "American",
  "British",
  "French",
  "German",
  "Japanese",
  "Australian",
  "Canadian",
  "Indian",
  "Brazilian",
  "Emirati",
  "Spanish",
  "Italian",
  "Chinese",
  "Korean",
  "Mexican",
];

//Hobbies pool to randomly assign hobbies to people
const HOBBIES_POOL = [
  "Reading",
  "Gaming",
  "Cooking",
  "Hiking",
  "Painting",
  "Cycling",
  "Swimming",
  "Photography",
  "Traveling",
  "Yoga",
  "Chess",
  "Gardening",
  "Fishing",
  "Dancing",
  "Music",
  "Writing",
  "Pottery",
  "Surfing",
  "Rock Climbing",
  "Knitting",
];

//Generate an array of 500 people with random data using faker
export const people: Person[] = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,

  avatar: `https://i.pravatar.cc/150?u=${i + 1}`,

  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),

  age: faker.number.int({ min: 18, max: 70 }),

  nationality: NATIONALITIES[Math.floor(Math.random() * NATIONALITIES.length)],

  hobbies: faker.helpers.arrayElements(HOBBIES_POOL, faker.number.int({ min: 0, max: 10 })),
}));
