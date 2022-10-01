import React, { useState, useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

function CardExampleCard({ weatherData }) {
  const [photo, setPhoto] = useState("");
  const cityName = weatherData.name;
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://api.unsplash.com/search/photos?query=" +
          cityName +
          "&client_id=seiJfro1msGCRl0yJ-IBW80bdg2oCSGJJJfspTfvrl8"
      )
        .then((res) => res.json())
        .then((json) => {
          setPhoto(json.results[0]?.urls?.raw);
          console.log(photo);
          if (photo === undefined) {
            setPhoto(
              "https://cdn.britannica.com/28/148428-050-5EC50B76/Flint-Hills-region-Great-Plains-Kansas.jpg"
            );
          }
        });
    };
    fetchData();
  }, [cityName]);
  return (
    <div className="d-flex justify-content-center mt-3">
      <Card style={{ width: "35vw" }}>
        <Card.Img variant="top" src={photo} />
        <Card.Body>
          <Card.Title>City Name: {weatherData.name}</Card.Title>
          <Card.Text>
            <p>Day: {moment().format("dddd")}</p>
            <p>Date: {moment().format("LL")}</p>
            <p>Temprature: {weatherData.main.temp} &deg;C</p>
            <p>
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
            <p>
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
            <p>Description: {weatherData.weather[0].main}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardExampleCard;
