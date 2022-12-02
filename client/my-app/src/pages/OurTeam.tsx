import React from "react";
import "./OurTeam.css";
import bottomWave from "../image_content/bottomWave.svg";
import midWave from "../image_content/midWave.svg";
import secondWave from "../image_content/secondWave.svg";
import topWave from "../image_content/topWave.svg";
import { Paragraph } from "../globalStyles";
import { Header } from "../components/header";

type cardProps = {
  image: string;
  name: string;
  role: string;
  link: string;
};

export const OurTeam = () => {
  return (
    <>
    <Header/>
    <body className="bodyVibes">
    <div className="team-wrapper">
      <div className="team-row">
        <Card
          image="https://media-exp1.licdn.com/dms/image/C4E03AQGyWWSW7NSRwQ/profile-displayphoto-shrink_200_200/0/1662832028410?e=1675296000&v=beta&t=WKX73qAgM892Y2BqBp5WnIG4SohljtYsSovfgzibBKw"
          name="Darielis M. Calderon"
          role="Front-End Developer"
          link="https://www.linkedin.com/in/darielis-merced-calderon/"
        />
        <Card
          image="https://avatars.githubusercontent.com/u/89794450?v=4"
          name="Carlos Miguel Garcia"
          role="FullStack Developer"
          link="https://www.linkedin.com/in/cmgarciasj/"
        />
        <Card
          image="https://avatars.githubusercontent.com/u/74694864?v=4"
          name="Giancarlo Padron"
          role="Project Manager"
          link="https://www.linkedin.com/in/giancarlopadron/"
        />
        <Card
          image="https://avatars.githubusercontent.com/u/63821353?v=4"
          name="Erick Rivera"
          role="FullStack Developer"
          link="https://www.linkedin.com/in/erick-riv/"
        />
        <Card
          image="https://avatars.githubusercontent.com/u/97458102?v=4"
          name="Edwin Villarroel"
          role="Front-End Developer"
          link="https://www.linkedin.com/in/edwinvillarroel/"
        />
      </div>
      <div className="team-row">
        <Card
          image="https://avatars.githubusercontent.com/u/112722640?v=4"
          name="Stephanie Hernandez"
          role="Front-End Developer"
          link="https://www.linkedin.com/in/snhs1106/"
        />
        <Card
          image="https://media-exp1.licdn.com/dms/image/D4E03AQEDD9hxnPioBA/profile-displayphoto-shrink_100_100/0/1665355306627?e=1672272000&v=beta&t=BTXqx5Ryu4ZEznJr-qkOdMl37qkoqQ7LqCC-s5YmPzc"
          name="Eva Sennrich"
          role="Front-End Developer"
          link="https://www.linkedin.com/in/evasennrich/"
        />
        <Card
          image="https://avatars.githubusercontent.com/u/75550025?v=4"
          name="Carlos Chavez"
          role="FullStack Developer"
          link="https://www.linkedin.com/in/carlosenrique7/"
        />
        <Card
          image="https://media-exp1.licdn.com/dms/image/D4E35AQH_GutQ4T208Q/profile-framedphoto-shrink_200_200/0/1667237167145?e=1670626800&v=beta&t=TV1Y2cBm8hR0nFOfDQy8-zml1ZAu_HGFsvGG42iJ7SE"
          name="Laura Penza"
          role="FullStack Developer"
          link="https://www.linkedin.com/in/laura-penza/"
        />
        <Card
          image="https://media-exp1.licdn.com/dms/image/C4E03AQFYHlLKipB12Q/profile-displayphoto-shrink_200_200/0/1609635635116?e=1675296000&v=beta&t=HhBMFlSusr-hAqv7_QRAOKT0NYu-azd0rU74Z1HRsiE"
          name="Natalie Almonte"
          role="Front End Developer"
          link="https://www.linkedin.com/in/natalie-b-almonte/"
        />
      </div>
      <div className="team-row">
        <Card
          image="https://media-exp1.licdn.com/dms/image/C4E03AQGwbfTxca7wgA/profile-displayphoto-shrink_200_200/0/1606794334644?e=1675296000&v=beta&t=duMQn0te6ROU61ICz0Mu2jQrWjKAMV1NgIuhVk4CkjY"
          name="Laura Davalos"
          role="Front End Developer"
          link="https://www.linkedin.com/in/laura-davalos-98056415b/"
        />
        <Card
          image="https://media-exp1.licdn.com/dms/image/D4E35AQH38TW8j-745A/profile-framedphoto-shrink_200_200/0/1651971714022?e=1670626800&v=beta&t=O5lVB-L5CUVk8J8gJGLTy57cUDvY_pfBYc2Gps6sVqA"
          name="Dominick Diaz"
          role="Front End Developer"
          link="https://www.linkedin.com/in/dominickadiaz/"
        />
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0pHtVBVeyi8OjaGf1tw1IY8ctQfkAedvt8cIZb5kEQtxmp-jtxFrDp0jGETAeohYn5k&usqp=CAU"
          name="Daniel Ruiz"
          role="Front End Developer"
          link=""
        />
      </div>
      <img className="wave one" src={bottomWave} alt="" width={"100%"} />
      <img className="wave two" src={midWave} alt="" width={"100%"} />
      <img className="wave three" src={secondWave} alt="" width={"100%"} />
      <img className="wave four" src={topWave} alt="" width={"100%"} />
    </div>
    </body>
    </>
  );
};

const Card = ({ image, name, role, link }: cardProps) => {
  return (
    <div className="card-info">
      <img className="profile-picture" src={image} alt={name + "'s photo"} width={100} />

      <Paragraph color="#f4f1de" size={20}>
        {name}
      </Paragraph>
      <Paragraph color="#f4f1de">{role}</Paragraph>
      <a className="pain" href={link}>Connect with me!</a>
    </div>
  );
};
