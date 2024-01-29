import React from "react";
import styled from "styled-components";
import moment from "moment-timezone";

function HeadFoot() {
  let heureReunion = moment().tz("Indian/Reunion");
  return (
    <Footer>
      <p>{heureReunion.format("HH:mm")} - (GMT +04, Reunion)</p>
      <p>All rights reserved</p>
    </Footer>
  );
}

export default HeadFoot;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 12px min(62px, 5.5vw);
  color: #fff6e7;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  & p {
    @media (max-width: 468px) {
      text-align: center;
    }
    &:last-child {
      text-align: right;
    }
  }
  @media (max-width: 468px) {
    display: none;
  }
`;
