import React from "react";
import { gql, useQuery } from "@apollo/client";
import Person from "./person";

const PEOPLE_QUERY = gql`
  query PeopleQuery {
    people {
      name
      height
      mass
      homeworld
      gender
    }
  }
`;
const People = () => {
  const { loading, error, data } = useQuery(PEOPLE_QUERY);
  if (loading) return <div> loading</div>;
  if (error) return <div>Error {error.message}</div>;
  return (
    <div className="container people">
      {data.people.map((person) => (
        <Person person={person} />
      ))}
    </div>
  );
};
export default People;
