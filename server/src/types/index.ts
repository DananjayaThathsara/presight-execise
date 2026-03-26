//Person represents the structure of a person object in our dataset
export interface Person {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  age: number;
  nationality: string;
  hobbies: string[];
}
//HobbyCount represents the count of people for a specific hobby
export interface HobbyCount {
  name: string;
  count: number;
}
//NationalityCount represents the count of people for a specific nationality
export interface NationalityCount {
  name: string;
  count: number;
}
//Filters represents the structure of the filters object in our API response
export interface Filters {
  topHobbies: HobbyCount[];
  topNationalities: NationalityCount[];
}
//PaginationMeta represents the pagination information in our API response
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
//PeopleResponse represents the structure of the response from our API when fetching people data
export interface PeopleResponse {
  data: Person[];
  meta: PaginationMeta;
  filters: Filters;
}
//Job represents the structure of a job that is sent to the worker thread for processing
export interface Job {
  id: string;
  socketId: string;
  data: string;
}
//JobResult represents the structure of the result returned from the worker thread after processing a job
export interface JobResult {
  id: string;
  socketId: string;
  result: string;
}
//PeopleQuery represents the structure of the query parameters that can be sent to our API when fetching people data
export interface PeopleQuery {
  page?: string;
  limit?: string;
  search?: string;
  hobby?: string;
  nationality?: string;
}
