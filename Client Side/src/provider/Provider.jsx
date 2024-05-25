import PropTypes from 'prop-types';
import { createContext } from 'react';

export const ContextAuth = createContext();
const Provider = ({ children }) => {
  const authDta = {};
  return (
    <ContextAuth.Provider value={authDta}>{children}</ContextAuth.Provider>
  );
};

export default Provider;
Provider.propTypes = {
  children: PropTypes.node,
};
