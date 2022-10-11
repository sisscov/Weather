import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
  const [data, setData] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Warsaw");

  const handleInput = () => {
    setCity(cityInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=feadf672ad40a3f5ae231c4db12e7b2d"
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            if (res.status === 404) {
              alert("The city was not found")
              city = "";
            }
            alert("Oops, there seems to be an error!");
            throw new Error("You have an error");
          }
        })
        .then((json) => {
          setData(json);
        });
    };
    fetchData();
  }, [city]);

  return (
    <div className="background">
      <div className="d-flex justify-content-center mt-3">
        <InputGroup className="shadow" style={{ width: "40vw" }}>
          <Form.Control
            placeholder="Enter the city"
            onChange={(e) => setCityInput(e.target.value)}
            data-testid="cityName"
          />
          <Button
            variant="primary"
            id="button-addon2"
            onClick={() => handleInput()}
          >
            ok
          </Button>
        </InputGroup>
      </div>
      {typeof data.main != "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
