import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import '../styles/App.css'
const DETAILS_QUERY = gql`
  query DetailsQuery($name: String!) {
    person(name: $name) {
      name
      gender
      mass
      homeworld
      height
    }
  }
`;
const Details = () => {
  const name = useParams().name;
  const { loading, error, data } = useQuery(DETAILS_QUERY, {
    variables: { name },
  });
  if (loading) return <div> loading</div>;
  if (error) return <div>Error {error.message}</div>;
  const { mass, height, gender, homeworld } = data.person;
  return (
    <div className="detailed_card">
      <div className="box">
        <h6>{name}</h6>
        <Link to={"/"} className='detailed_card_link'>
        <img src="https://img.icons8.com/ios/20/000000/long-arrow-left.png"/>
          Go Back
        </Link>
      </div>
      <div className="card_details"> 
        {" "}
        <p>{gender}</p>
        <p>{mass} kg</p>
        <a href={homeworld} className='detailed_card_link'>Homeworld</a>
        <p>{height} cm</p>
      </div>
    </div>
  );
};
export default Details;
