import React from "react";
import { Subheading, Paragraph } from "../globalStyles";
import "./About.css";

type blockProps = {
  heading: string;
  description: string;
};

export const About = () => {
  return (
    <div className="wrapper">
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
  );
};

const Block = ({ heading, description }: blockProps) => {
  return (
    <div className="block">
      <Subheading>{heading}</Subheading>
      <Paragraph className="p">{description}</Paragraph>
    </div>
  );
};
