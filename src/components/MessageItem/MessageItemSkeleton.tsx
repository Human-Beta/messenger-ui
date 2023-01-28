import ContentLoader from 'react-content-loader';
import { randomWidth as randomValue } from '../../utils';
import styles from './MessageItem.module.scss';

const MIN_WIDTH = 150;
const MIN_HEIGHT = 28;

const WIDTH_OFFSET = 200;
const HEIGHT_OFFSET = 5;

const isMy = () => Math.random() > 0.5;

const MessageItemSkeleton = () => {
  const width = randomValue(MIN_WIDTH, WIDTH_OFFSET);
  const height = randomValue(MIN_HEIGHT, HEIGHT_OFFSET);

  const viewBox = `0 0 ${width} ${height}`;

  return (
    <ContentLoader
      className={`${styles.root} ${isMy() ? styles.my : ''}`}
      style={{ padding: 0, minHeight: height }}
      speed={2}
      width={width}
      height={height}
      viewBox={viewBox}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="10" ry="10" width={width} height={height} />
    </ContentLoader>
  );
};

export default MessageItemSkeleton;
