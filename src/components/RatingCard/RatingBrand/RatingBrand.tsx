import React from "react";
import PropTypes from "prop-types";
import { Wrapper, Label, Icon } from "./RatingBrand.styles";

type Props = {
  label?: string;
  className?: string;
};

export const RatingBrand: React.FC<Props> = ({
  label = "Product Rating",
  className,
}) => {
  return (
    <Wrapper className={className} aria-label={`${label} by Feefo`}>
      <Label>{label}</Label>
      <Icon />
    </Wrapper>
  );
};

RatingBrand.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
