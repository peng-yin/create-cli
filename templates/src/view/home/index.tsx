import React from 'react';
import style from './home.module.less'

class Home extends React.Component {

  public render() {

    return (
      <div style={{ flex: 1, height: '100%' }} className={style.test}>
        {`${process.env.HOST}`}
      </div>
    );
  }
}


export default Home;

