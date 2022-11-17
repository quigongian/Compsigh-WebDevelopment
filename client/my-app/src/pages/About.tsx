import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Subheading, Paragraph } from "../globalStyles";
import "./About.css";
import wavebot from "../image_content/wavebot.svg";
import wavemid from "../image_content/wavemid.svg";
import wavetop from "../image_content/wavetop.svg";
import wave1 from "../image_content/wave1.svg";
import imageOne from "../image_content/people_aboutUs.png"
import imageTwo from "../image_content/girl_boy_aboutUs.png"
import imageThree from "../image_content/open_book_aboutUs.png"
import imageFour from "../image_content/laptopgirl_abooutUs.png"

type cardProps = {
  image: string;
  name: string;
  role: string;
  desc: string;
};


type blockProps = {
  heading: string;
  description: string;
  image: string
};

export const About = () => {
  return (
    <>
    <Header/>
    <div className="about-wrapper">
      <div className="row">
        <Block
          heading="Who We Are"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
          image={imageOne}
        />
        <Block
          heading="What We Can Do For You"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
          image={imageTwo}
        />
      </div>
      <div className="row">
        <Block
          heading="Our Story"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
          image={imageThree}
        />
        <Block
          heading="Something Else Here"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
          image={imageFour}
        />
      </div>
    </div>
    
    <img className="wave one" src={wave1} alt="" width={"100%"} />
    <img className="wave two" src={wavemid} alt="" width={"100%"} />
    <img className="wave three" src={wavetop} alt="" width={"100%"} />
    <img className="wave four" src={wavebot} alt="" width={"100%"} />
    {/* <Footer/> */}
    </>
  );
};

const Block = ({ heading, description, image }: blockProps) => {
  return (
    <div className="block">
      <Subheading color="#f4f1de">{heading}</Subheading>
      <Paragraph className="p" color="#f4f1de">
        {description}
      </Paragraph>
      <img className="pc1" src={image} alt="" />
    </div>
  );
};
