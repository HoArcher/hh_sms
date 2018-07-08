import React, { createElement } from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';
import Layouts from '../../layouts';

const Exception = ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
  const pageType = type in config ? type : '404';
  return (
    <Layouts>
    <div {...rest}>
      <div className={styles.content}>
        <h1>{title || config[pageType].title}</h1>
        <div className={styles.desc}>{desc || config[pageType].desc}</div>
        <div className={styles.actions}>
          {actions ||
            createElement(
              linkElement,
              {
                to: '/',
                href: '/',
              },
              <Button type="primary">返回首页</Button>
            )}
        </div>
      </div>
    </div>
    </Layouts>
  );
};

export default Exception;
