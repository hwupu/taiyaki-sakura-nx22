import React from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

export default class StateController extends React.Component {
  obs: Subscription | null;

  constructor(props: any) {
    super(props);
    this.state = {
      scrollY: 0,
    };
    this.obs = null;
  }

  componentDidMount() {
    this.obs = fromEvent(document, 'scroll')
      .pipe(debounceTime(150), tap(this.onScroll))
      .subscribe();
  }

  componentWillUnmount() {
    // @ts-ignore: Object is possibly 'null'.
    this.obs.unsubscribe();
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
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else if (scrollY != snapLogo && Math.abs(scrollY - snapLogo) < 100) {
      window.scrollTo({
        top: snapLogo,
        behavior: 'smooth',
      });
    } else if (scrollY != snapLogo2 && Math.abs(scrollY - snapLogo2) < 40) {
      window.scrollTo({
        top: snapLogo2,
        behavior: 'smooth',
      });
    } else if (scrollY != snapBottom && Math.abs(scrollY - snapBottom) < 100) {
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
