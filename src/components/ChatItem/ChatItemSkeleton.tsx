import React from 'react';
import ContentLoader from 'react-content-loader';

const CHAT_NAME_MIN_WIDTH = 70;
const CHAT_NAME_WIDTH_OFFSET = 100;

const MESSAGE_VALUE_MIN_WIDTH = 100;
const MESSAGE_VALUE_WIDTH_OFFSET = 200;

const randomWidth = (minWidth: number, offset: number) => minWidth + offset * Math.random();

const ChatItemSkeleton: React.FC = () => {
  const chatNameWidth = randomWidth(CHAT_NAME_MIN_WIDTH, CHAT_NAME_WIDTH_OFFSET);
  const messageValueWidth = randomWidth(MESSAGE_VALUE_MIN_WIDTH, MESSAGE_VALUE_WIDTH_OFFSET);

  return (
    <ContentLoader
      speed={2}
      width={437}
      height={75}
      viewBox="0 0 437 75"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="35" cy="38" r="25" />
      <rect x="70" y="16" rx="10" ry="10" width={chatNameWidth} height="22" />
      <rect x="70" y="43" rx="10" ry="10" width={messageValueWidth} height="22" />
    </ContentLoader>
  );
};

export default ChatItemSkeleton;
