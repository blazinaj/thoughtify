import React from 'react';
import NotEnoughData from './NotEnoughData';
import { handleLoader } from '../functions/handleLoader';

/**
 * Utility component for handling isLoading and NotEnoughData states
 * @param {boolean} isLoading - if true shows a loading UI
 * @param {boolean} isEnoughData - if true shows NotEnoughData component
 * @param {string} dataMessage - text for NotEnoughData component
 * @param {object} callToAction - callToAction object for NotEnoughData component
 * @param {JSX.Element} children - children elements
 * @param style
 * @returns {*}
 * @constructor
 */
const DataLoader = ({ isLoading = false, isEnoughData = false, dataMessage, callToAction, children, style = {} }) =>
  handleLoader({
    component: isEnoughData ? (
      children
    ) : (
      <div style={style}>
        <NotEnoughData message={dataMessage} callToAction={callToAction} />
      </div>
    ),
    isLoading
  });

export default DataLoader;
