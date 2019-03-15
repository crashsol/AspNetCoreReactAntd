import React from 'react';
import styles from './index.css';

export type BasicLayoutComponent<P> = React.SFC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = props => {
  return (
    <div>
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      </div>
      <div style={{ margin: '24px 16px', padding: 24 }}>{props.children}</div>
    </div>
  );
};

export default BasicLayout;
