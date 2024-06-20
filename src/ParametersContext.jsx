// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ParametersContext = createContext();

export const ParametersProvider = ({ children }) => {
  const [parameters, setParameters] = useState({
    bedroom: 1,
    bathroom: 1,
    kitchen: 1,
    living_room: 0,
    dining_room: 0,
    garage: 0,
  });

  return (
    <ParametersContext.Provider value={{ parameters, setParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};

ParametersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ParametersContext;
