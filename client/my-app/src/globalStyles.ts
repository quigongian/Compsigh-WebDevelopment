import styled from "@emotion/styled";

const weights: { [key: string]: string } = {
  bold: "700",
  light: "500",
};

type textProps = {
  color?: string;
  textAlign?: string;
  size?: number;
  fontFamily?: string;
  fontWeight?: string;
};

type btnProps = {
  color?: string;
  background?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  fontSize?: number;
};

export const Heading = styled.h1((props: textProps) => ({
  color: props.color ? props.color : "black",
  "font-family": props.fontFamily ? props.fontFamily : "Inter",
  "font-size": props.size ? `${props.size}px` : "64px",
  "font-weight": props.fontWeight ? weights[props.fontWeight] : "700",
  "text-align": props.textAlign ? props.textAlign : "left",
  margin: 0,
}));

export const Subheading = styled.h3((props: textProps) => ({
  color: props.color ? props.color : "black",
  "font-family": props.fontFamily ? props.fontFamily : "Inter",
  "font-size": props.size ? `${props.size}px` : "42px",
  "font-weight": props.fontWeight ? weights[props.fontWeight] : "700",
  "text-align": props.textAlign ? props.textAlign : "left",
  margin: 0,
}));

export const Paragraph = styled.p((props: textProps) => ({
  color: props.color ? props.color : "black",
  "font-family": props.fontFamily ? props.fontFamily : "Inter",
  "font-size": props.size ? `${props.size}px` : "16px",
  "font-weight": props.fontWeight ? weights[props.fontWeight] : "700",
  "text-align": props.textAlign ? props.textAlign : "left",
  margin: 0,
}));

export const Button = styled.button((props: btnProps) => ({
  color: props.color ? props.color : "white",
  background: props.background ? props.background : "#E07A5F",
  width: props.width ? `${props.width}px` : "241px",
  height: props.height ? `${props.height}px` : "52px",
  border: "none",
  borderRadius: props.borderRadius ? `${props.borderRadius}px` : "16px",
  fontSize: props.fontSize ? `${props.fontSize}px` : "1.2rem",
  cursor: "pointer",
  textAlign: "center",
}));
