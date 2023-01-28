import { FC } from 'react';
import { MessageItemSkeleton } from '../MessageItem/MessageItemSkeleton';

const MESSAGES_COUNT = 20;

const MessageItemsSkeleton: FC = () => (
  <>
    {[...Array(MESSAGES_COUNT)].map((_, i) => (
      <MessageItemSkeleton key={i} />
    ))}
  </>
);

export default MessageItemsSkeleton;
