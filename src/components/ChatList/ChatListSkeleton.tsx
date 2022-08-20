import ChatItemSkeleton from '../ChatItem/ChatItemSkeleton';

const SKELETON_COUNT = 7;

const ChatListSkeleton = () => {
  return (
    <>
      {[...Array(SKELETON_COUNT)].map((_, i) => (
        <ChatItemSkeleton key={i} />
      ))}
    </>
  );
};

export default ChatListSkeleton;
