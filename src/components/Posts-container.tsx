import React, { useLayoutEffect, useRef } from "react";
import { Content } from "../reddit/reddit";
import { Post } from "./post";
import { SkeletonPost } from "./skeleton-post";
import {
  CtnrPostsStyle,
  LoadingRingStyle,
  LoadingWindowStyle,
} from "./styles/App.style";

export class PostsContainer extends React.PureComponent<
  {
    c: Content[];
    obs: IntersectionObserver;
    loading: boolean;
    end: boolean;
    Controls?: JSX.Element;
  },
  {}
> {
  mq = window.matchMedia("(max-width: 75rem)");

  componentDidMount(): void {
    this.mq.addEventListener("change", this.onMediaQueryChange);
  }

  onMediaQueryChange = () => {
    this.forceUpdate();
  };

  componentWillUnmount(): void {
    this.mq.removeEventListener("change", this.onMediaQueryChange);
  }

  /** split the content in the given amount of containers */
  renderColumn(cols: number) {
    if (this.props.c.length === 0) {
      return null;
    }

    // split the content in the given amount of column lists
    const list = this.props.c.reduce(
      (a, c, i) => {
        a[i % cols].push(<Post key={c.id} c={c} />);
        return a;
      },
      Array.from({ length: cols }, () => [] as JSX.Element[])
    );

    if (this.props.end) {
      return list.map((list, i) => <div key={i}>{list}</div>);
    }

    // if there is still something to fetch add skeletons and intersection observers
    return list.map((list, i) => {
      // add the tail a little bit before the content end so we can try to prefetch
      list.splice(
        list.length - 2,
        0,
        <PostsTail key={`tail${i}`} obs={this.props.obs} />
      );
      return (
        <div key={i}>
          {list}
          <SkeletonPost key="skeleton" />
        </div>
      );
    });
  }

  render() {
    const cols = this.mq.matches ? 1 : 2;
    return (
      <CtnrPostsStyle cols={cols}>
        {this.props.Controls}
        {this.props.loading && <LoadingWindow />}
        {this.renderColumn(cols)}
        <PostsTail obs={this.props.obs} />
      </CtnrPostsStyle>
    );
  }
}

/** every time this element connects add itself to the observer,
 * used as tail of all posts so when the bottom is reached fetch new content*/
function PostsTail({ obs }: { obs: IntersectionObserver }) {
  const divRef = useRef<HTMLDivElement>(null);

  // useEffect runs asynchronously so when cleaning up the reference to divRef.current
  // won't exist, so we need to go synchronously using useLayoutEffect
  useLayoutEffect(() => {
    obs.observe(divRef.current!);

    return () => {
      obs.unobserve(divRef.current!);
    };
  }, [obs]);

  return <div ref={divRef}></div>;
}

function LoadingWindow() {
  return (
    <LoadingWindowStyle>
      <LoadingRingStyle>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoadingRingStyle>
    </LoadingWindowStyle>
  );
}
