import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Subheading, Paragraph } from "../globalStyles";
import "./About.css";

type blockProps = {
  heading: string;
  description: string;
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
        />
        <Block
          heading="What We Can Do For You"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
        />
      </div>
      <div className="row">
        <Block
          heading="Our Story"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
        />
        <Block
          heading="Something Else Here"
          description="Lorem Ipsum dfjdnfjdn vfkvmkm vkfmvfi  vifmvfim vifmvf i fimvfivm vfm imf fimfv"
        />
      </div>
    </div>
    <Footer/>
    </>
  );
};

const Block = ({ heading, description }: blockProps) => {
  return (
    <div className="block">
      <Subheading color="#f4f1de">{heading}</Subheading>
      <Paragraph className="p" color="#f4f1de">
        {description}
      </Paragraph>
    </div>
  );
};
