import React from "react";
import { createPortal } from "react-dom";
import usePortal from "../../core/Hooks/usePortal";

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }) => createPortal(children, usePortal(id));

export default Portal;
