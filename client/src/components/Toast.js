import React, { useContext } from "react";
import {
  CheckCircleOutline,
  InfoOutlined,
  ReportProblemOutlined,
  ErrorOutlineOutlined,
  CloseOutlined,
} from "@material-ui/icons";
import { ACTIONS, ToastContext, TYPES } from "../contexts/toastContext";
import "./styles.css";

function Toast({ position, autoDeleteInterval }) {
  const { state, dispatch } = useContext(ToastContext);

  const generateIcon = (type) => {
    switch (type) {
      case TYPES.SUCCESS:
        return <CheckCircleOutline />;
      case TYPES.INFO:
        return <InfoOutlined />;
      case TYPES.WARNING:
        return <ReportProblemOutlined />;
      case TYPES.DANGER:
        return <ErrorOutlineOutlined />;
      default:
        return;
    }
  };

  const generateBackgroundColor = (type) => {
    switch (type) {
      case TYPES.SUCCESS:
        return "#5cb85c";
      case TYPES.INFO:
        return "#5bc0de";
      case TYPES.WARNING:
        return "#f0ad4e";
      case TYPES.DANGER:
        return "#d9534f";
      default:
        return "#000";
    }
  };

  return (
    <div className={`notification-container ${position}`}>
      {state.map((notification, i) => {
        if (autoDeleteInterval) {
          setInterval(() => {
            dispatch({
              type: ACTIONS.DELETE,
              payload: { id: notification.id },
            });
          }, autoDeleteInterval);
        }
        return (
          <div
            key={notification.id}
            style={{
              backgroundColor: generateBackgroundColor(notification.type),
            }}
            className={`notification toast ${position}`}
          >
            <div
              onClick={() => {
                dispatch({
                  type: ACTIONS.DELETE,
                  payload: { id: notification.id },
                });
              }}
              className="close-button"
            >
              <CloseOutlined />
            </div>
            <div className="notification-img">
              {generateIcon(notification.type)}
            </div>
            <div>
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Toast;
