import React, { ReactElement, createElement } from 'react';
import { __ } from '@wordpress/i18n';
import { WrapperContainer, Header, BodyContainer, PanelContainer } from '@divi/modal';

import {
  isArray,
  isEmpty,
  isObject,
  isString,
  keys,
  map,
}  from 'lodash';

import { ErrorBoundary } from '@divi/error-boundary';

import './style.scss';

/**
 * Component for rendering clipboard item's payload item.
 *
 * @since 0.1.0
 *
 * @param {PayloadItemProps} param0 Component props.
 *
 * @returns {ReactElement}
 */
const PayloadItem = ({
  name,
  values,
}) => (
  <div className="et-devtool-clipboard-item-payload-item">
    <details>
      <summary className="et-devtool-clipboard-item-payload-item-title">{name}</summary>
      <ul className="et-devtool-clipboard-item-payload-item-value">
        {isArray(values) || isObject(values)
          ? keys(values).map((key) => (
              <li key={key} className='et-devtool-clipboard-item-payload-item-value-item'>
                {key}: {isString(values[key]) ? values[key] : JSON.stringify(values[key])}
              </li>
            ))
          : <li>{values}</li>}
      </ul>
    </details>
  </div>
);

/**
 * Component for rendering clipboard item.
 *
 * @since 0.1.0
 *
 * @param {ClipboardItemProps} param0 Component props.
 *
 * @returns {ReactElement}
 */
const ClipboardItem = ({
  clipboardType,
  origin,
  payload,
  itemIndex,
}) => (
  <div
    className="et-devtool-clipboard-item"
  >
    <div className={`et-devtool-clipboard-item-type et-devtool-clipboard-item-type--${clipboardType}`}>{clipboardType}</div>
    <div className="et-devtool-clipboard-item-index">{`#${itemIndex}`}</div>
    <div className="et-devtool-clipboard-item-origin">{origin}</div>
    <div className="et-devtool-clipboard-item-payload">
      {keys(payload).map((payloadItemName) => (
        <PayloadItem
          name={payloadItemName}
          values={payload[payloadItemName]}
          key={`et-devtool-clipboard-item-payload--${payloadItemName}`}
        />
      ))}
    </div>
  </div>
);

/**
 * Component for empty clipboard state.
 *
 * @since 0.1.0
 *
 * @returns {ReactElement}
 */
const EmptyClipboard = () => (
  <div className="et-devtool-clipboard-empty" style={{
    textAlign: 'center',
    padding: '40px 20px',
    color: '#666',
  }}>
    <h3 style={{ marginBottom: '16px', color: '#333' }}>
      {__('No clipboard items available', 'et_builder')}
    </h3>
    <p style={{ marginBottom: '8px', lineHeight: '1.5' }}>
      {__('Copy a module or module style to see clipboard data here.', 'et_builder')}
    </p>
    <p style={{ fontSize: '14px', fontStyle: 'italic' }}>
      {__('Right-click on any module and select "Copy" or "Copy Styles".', 'et_builder')}
    </p>
  </div>
);

/**
 * Component for rendering clipboard items.
 *
 * @since 0.1.0
 *
 * @param {ClipboardItemsProps} param0 Component props.
 *
 * @returns {ReactElement}
 */
const ClipboardItems = ({ items }) => (
  <div className="et-devtool-clipboard-items">
    {map(items, (item, itemIndex) => (
      createElement(
        ClipboardItem, {
        clipboardType: item.clipboardType,
        origin: item.origin,
        payload: item.payload,
        key: `et-devtool-clipboard-item--${itemIndex}`,
        itemIndex,
      },
      )
    ))}
  </div>
);

/**
 * Dev clipboard modal component which visualizes the clipboard's state.
 * 
 * This modal provides developers with a way to inspect clipboard data from Divi's
 * clipboard system. It demonstrates:
 * - Basic modal structure using Divi 5 modal components
 * - Redux store integration via withSelect HOC
 * - Error handling with empty states
 * - Professional UI patterns for third-party modals
 *
 * @since 0.1.0
 *
 * @param {Props} props Component props.
 * @param {string} props.name - Modal name for registration
 * @param {Array} props.clipboardItems - Array of clipboard items from Redux store
 *
 * @returns {ReactElement} Complete modal component
 */
export const DevClipboard = (props) => {
  // Destructure props - name is used for modal registration, clipboardItems from Redux
  const {
    name,
    clipboardItems,
  } = props;

  return (
    // ErrorBoundary catches any React errors and prevents modal crashes
    <ErrorBoundary
      key="et-vb-divi-modals--dev-clipboard"
      componentName="et-vb-divi-modals--dev-clipboard"
    >
      {/* WrapperContainer provides the main modal shell with drag/resize capabilities */}
      <WrapperContainer
        draggable        // Allows users to drag the modal around
        resizable        // Allows users to resize the modal
        expandable       // Provides expand/collapse functionality
        snappable        // Enables snapping to screen edges
        modalName={name} // Required for proper modal registration
      >
        {/* Header component displays the modal title and close button */}
        <Header
          name={__('Clipboard', 'et_builder')}
        />
        
        {/* BodyContainer wraps the main modal content */}
        <BodyContainer>
          {/* PanelContainer creates a content panel (single panel in this case) */}
          <PanelContainer id="clipboard" opened>
            <div style={{
              padding: '20px 20px 40px 20px',
              height: 400,
              overflow: 'auto', // Enables scrolling for long clipboard data
            }}
            >
              {/* Conditional rendering: show empty state or clipboard items */}
              {isEmpty(clipboardItems) ? (
                <EmptyClipboard />
              ) : (
                <ClipboardItems items={clipboardItems} />
              )}
            </div>
          </PanelContainer>
        </BodyContainer>
      </WrapperContainer>
    </ErrorBoundary>
  );
};