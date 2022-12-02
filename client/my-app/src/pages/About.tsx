import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Subheading, Paragraph } from "../globalStyles";
import "./About.css";
import wavebot from "../image_content/wavebot.svg";
import wavemid from "../image_content/wavemid.svg";
import wavetop from "../image_content/wavetop.svg";
import wave1 from "../image_content/wave1.svg";
import imageOne from "../image_content/people_aboutUs.png";
import imageTwo from "../image_content/girl_boy_aboutUs.png";
import imageThree from "../image_content/open_book_aboutUs.png";
import imageFour from "../image_content/laptopgirl_abooutUs.png";

type cardProps = {
  image: string;
  name: string;
  role: string;
  desc: string;
};

type blockProps = {
  heading: string;
  description: string;
  image: string;
};

export const About = () => {
  return (
    <>
      <Header />
      <div className="about-wrapper">
        <div className="row">
          <Block
            heading="Who We Are"
            description="We are a team of Computer Science students dedicated to alleviating the academic pressure placed on college students."
            image={imageOne}
          />
          <Block
            heading="Our Goal"
            description="CompSigh serves to guide and keep you on track towards becoming your most productive self. Track your progress and watch as your goals become reality."
            image={imageTwo}
          />
        </div>
      </div>
      <img className="awave aone" src={wave1} alt="" width={"100%"} />
      <img className="awave atwo" src={wavemid} alt="" width={"100%"} />
      <img className="awave athree" src={wavetop} alt="" width={"100%"} />
      <img className="awave afour" src={wavebot} alt="" width={"100%"} />

      {/* <div className="waves"> */}

      {/* </div> */}

      {/* <Footer/> */}
    </>
  );
};

const Block = ({ heading, description, image }: blockProps) => {
  return (
    <div className="block">
      <Subheading className="hd1" color="#f4f1de">
        {heading}
      </Subheading>
      <Paragraph className="p" id="pp1" color="#f4f1de">
        {description}
      </Paragraph>
      <img className="pc1" src={image} alt="" />
    </div>
  );
};
