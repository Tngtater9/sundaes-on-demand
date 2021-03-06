/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import ScoopOptions from "./ScoopOptions";

export default function Options({ optionType }) {
  //optionType is 'scoops' or 'toppings'

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: error handling
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : null;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
