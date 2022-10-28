import React from "react";
import "./OurTeam.css";
import bottomWave from "../image_content/bottomWave.svg";
import midWave from "../image_content/midWave.svg";
import secondWave from "../image_content/secondWave.svg";
import topWave from "../image_content/topWave.svg";
import { Paragraph } from "../globalStyles";

type cardProps = {
  image: string;
  name: string;
  role: string;
};

export const OurTeam = () => {
  return (
    <div className="team-wrapper">
      <div className="team-row">
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
      </div>
      <div className="team-row">
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://media-exp1.licdn.com/dms/image/D4E03AQEDD9hxnPioBA/profile-displayphoto-shrink_100_100/0/1665355306627?e=1672272000&v=beta&t=BTXqx5Ryu4ZEznJr-qkOdMl37qkoqQ7LqCC-s5YmPzc"
          name="Eva Sennrich"
          role="Front-End Developer"
        />
        <Card
          image="https://avatars.githubusercontent.com/u/75550025?v=4"
          name="Carlos Chavez"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
      </div>
      <div className="team-row">
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Name goes here"
          role="FullStack Developer"
        />
      </div>

      <img className="wave one" src={bottomWave} alt="" width={"100%"} />
      <img className="wave two" src={midWave} alt="" width={"100%"} />
      <img className="wave three" src={secondWave} alt="" width={"100%"} />
      <img className="wave four" src={topWave} alt="" width={"100%"} />
    </div>
  );
};

const Card = ({ image, name, role }: cardProps) => {
  return (
    <div className="card-info">
      <img className="profile-picture" src={image} alt={name + "'s photo"} width={100} />

      <Paragraph color="#f4f1de" size={20}>
        {name}
      </Paragraph>
      <Paragraph color="#f4f1de">{role}</Paragraph>
    </div>
  );
};
