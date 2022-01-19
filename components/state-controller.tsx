import React from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

export default class StateController extends React.Component {
  obs: Subscription | null;

  constructor(props: any) {
    super(props);
    this.state = {
      scrollY: 0,
      phase: 0,
    };
    this.obs = null;
  }

  componentDidMount() {
    this.obs = fromEvent(document, 'scroll')
      .pipe(debounceTime(150), tap(this.onScroll))
      .subscribe();
  }

  componentWillUnmount() {
    if (this.obs) {
      this.obs.unsubscribe();
    }
  }

  onScroll = () => {
    const scrollY = window.scrollY;
    const snapTop = window.innerHeight / 3;
    const snapLogo = window.innerHeight - 280;
    const snapLogo2 = window.innerHeight - 120;
    const snapBottom = window.innerHeight;

    this.setState({
      scrollY: window.scrollY,
    });

    if (scrollY < snapTop) {
      this.setState({
        phase: 0,
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (scrollY != snapLogo && Math.abs(scrollY - snapLogo) < 100) {
      this.setState({
        phase: 1,
      });
      window.scrollTo({
        top: snapLogo,
        behavior: 'smooth',
      });
    } else if (scrollY != snapLogo2 && Math.abs(scrollY - snapLogo2) < 40) {
      this.setState({
        phase: 2,
      });
      window.scrollTo({
        top: snapLogo2,
        behavior: 'smooth',
      });
    } else if (scrollY != snapBottom && Math.abs(scrollY - snapBottom) < 100) {
      this.setState({
        phase: 3,
      });
      window.scrollTo({
        top: snapBottom,
        behavior: 'smooth',
      });
    }
  };

  render() {
    return <div />;
  }
}
