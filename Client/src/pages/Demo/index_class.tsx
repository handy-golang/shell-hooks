import React from 'react';
import './index.less';

interface StateType {
  readonly date: string;
  readonly value: string;
}
interface propType {
  readonly title: string;
}

interface DemoClass {
  state: StateType;
  props: propType;
}

class DemoClass extends React.Component {
  private timerID: any;

  public constructor(props: propType) {
    super(props);
    this.state = {
      date: new Date().toLocaleTimeString(),
      value: '初始值',
    };
  }

  public componentDidMount() {
    console.info('创建组件22', document.getElementById('Demo'));
    this.timerID = setInterval(() => {
      this.setState((state, props: propType) => ({
        date: new Date().toLocaleTimeString() + props.title,
      }));
    }, 2000);
  }

  public componentWillUnmount() {
    console.info('销毁组件');
    clearInterval(Number(this.timerID));
  }

  public handleClick = () => {
    this.setState((state, props) => ({
      date: '生效了',
    }));
  };

  public handleChange = (event: any) => {
    const value = event.target.value;
    this.setState((state, props) => ({
      value,
    }));
  };

  public render() {
    return (
      <div className="Demo" id="Demo">
        <h1>Class 组件</h1>
        <div>
          <input value={this.state.value} onChange={this.handleChange} />
          {this.state.value}
        </div>
        <div>
          <button onClick={this.handleClick}>点我</button>
          {this.state.date}
        </div>
      </div>
    );
  }
}

export default DemoClass;
