import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";


const Spinner = ({content}) => {
  return (
    <Dimmer active>
      <Loader content={content} />
    </Dimmer>
  );
};

export default Spinner;
