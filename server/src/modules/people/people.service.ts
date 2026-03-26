import { people } from "./people.data";
import { PeopleQuery, PeopleResponse } from "../../types";

export function getPeople(query: PeopleQuery): PeopleResponse {
  const page = parseInt(query.page || "1");
  const limit = parseInt(query.limit || "20");

  const search = (query.search || "").toLowerCase().trim();
  const hobby = query.hobby || "";
  const nationality = query.nationality || "";

  //step 1: filter the people based on search, hobby, and nationality
  const filtered = people.filter((person) => {
    // Check if person's name matches the search query
    const matchesSearch = !search || person.first_name.toLowerCase().includes(search) || person.last_name.toLowerCase().includes(search);

    // Check if person has the selected hobby
    const matchesHobby = !hobby || person.hobbies.includes(hobby);

    // Check if person's nationality matches the selected nationality
    const matchesNationality = !nationality || person.nationality === nationality;

    return matchesSearch && matchesHobby && matchesNationality;
  });

  //step 2: calculate pagination
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const data = filtered.slice(startIndex, startIndex + limit);

  //step 3: count hobbies among the filtered people
  const hobbyCount: Record<string, number> = {};
  filtered.forEach((person) => {
    person.hobbies.forEach((h) => {
      hobbyCount[h] = (hobbyCount[h] || 0) + 1;
    });
  });

  // Get the top 20 hobbies sorted by count
  const topHobbies = Object.entries(hobbyCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }));

  //step 4: count nationalities among the filtered people
  const nationalityCount: Record<string, number> = {};
  filtered.forEach((person) => {
    nationalityCount[person.nationality] = (nationalityCount[person.nationality] || 0) + 1;
  });

  const topNationalities = Object.entries(nationalityCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }));

  //step 5: send the response with data, pagination info, and filter counts
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
    filters: {
      topHobbies,
      topNationalities,
    },
  };
}
