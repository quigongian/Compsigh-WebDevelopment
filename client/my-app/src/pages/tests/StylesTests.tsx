import React from "react";
import { Button, Subheading, Heading, Paragraph } from "../../globalStyles";
import ping from "../../services/pingRequest";

export const StylesTests = () => {
  return (
    <div className="">
      <h1>Styles Tests works</h1>
      <Heading color="blue" fontFamily="Arial" fontWeight="light" size={64} textAlign="center">
        Custom Heading
      </Heading>
      <Subheading>Default Subheading</Subheading>
      <Paragraph color="green">Paragraph only changing color</Paragraph>
      <Button color="white" background="#81B29A" width={200} height={70} fontSize={24} borderRadius={50} onClick={ping}>
        submit
      </Button>
      <Button>default</Button>
    </div>
  );
};
