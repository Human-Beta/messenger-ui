import styles from './SayHello.module.scss';

const SayHello = () => {
  return (
    <div className={styles.root}>
      <div className={styles['say-hello']}>
        <p>No messages here yet...</p>
        <p>Send your first message.</p>
      </div>
    </div>
  );
};

export default SayHello;
