import { useEffect, useRef, useState } from "react";
import { Content, Media, MediaVideo } from "../reddit/reddit";
import { Flag, Save, Share } from "./icons";
import { IconBtnGlowStyle } from "./styles/button.style";
import {
  ControlsStyle,
  CtnrVotesStyle,
  ImgStyle,
  LeftBarStyle,
  NotFoundStyle,
  PostAnchorStyle,
  PostContentStyle,
  PostCtnrInfoStyle,
  PostStyle,
  PostTitleStyle,
  ScoreStyle,
  VideoStyle,
} from "./styles/post.style";
import dashjs from "dashjs";
import { timeSince } from "../util/util";
import mGlass from "../asset/magnifying-glass.png";
import {
  addToHistory,
  deleteFromHistory,
  getHistory,
  UserHistory,
} from "../util/history";

/** container for a listing reddit post, render the post content, infos and user post controls */
export function Post({ c }: { c: Content }) {
  const d = new Date(c.created);

  return (
    <PostStyle className="post">
      <PostLeftSide c={c} />
      <PostContentStyle>
        <PostAnchorStyle href={c.link} target="_blank">
          <PostCtnrInfoStyle>
            <span className="small-tx">by</span> <strong>{c.author}</strong>
            <time className="post__date small-tx" title={d.toDateString()}>
              {` ${timeSince(d)} ago`}
            </time>
            <span className="small-tx"> on subreddit </span>
            <strong>{c.subreddit}</strong>
          </PostCtnrInfoStyle>
        </PostAnchorStyle>
        <PostAnchorStyle href={c.link} target="_blank">
          <PostTitleStyle>{c.title}</PostTitleStyle>
        </PostAnchorStyle>
        <PostMediaContent video={c.video} images={c.images} />
      </PostContentStyle>
    </PostStyle>
  );
}

/** get the video or image element from the given available content */
function PostMediaContent(props: { video?: MediaVideo; images?: Media[] }) {
  if (props.video) {
    return (
      <div>
        <Video v={props.video} />
      </div>
    );
  } else if (props.images) {
    const image = props.images[props.images.length - 1];
    return (
      <div>
        <ImgStyle
          alt="Post image"
          srcSet={getScrSet(props.images)}
          sizes="(max-width: 43rem) 85vw, 39rem"
          height={image.height}
          width={image.width}
        />
      </div>
    );
  }

  return <div>sorry there isn't any content</div>;
}

function Video({ v }: { v: MediaVideo }) {
  var videoRef = useRef<HTMLVideoElement>(null);
  function fallback() {
    if (videoRef.current?.canPlayType("application/vnd.apple.mpegURL")) {
      videoRef.current.src = v.hls_url;
    } else if (videoRef.current) {
      videoRef.current.src = v.fallback_url;
    }
  }

  useEffect(() => {
    if (dashjs.supportsMediaSource()) {
      try {
        const player = dashjs.MediaPlayer().create();
        player.updateSettings({
          streaming: {
            scheduling: {
              scheduleWhilePaused: false,
            },
          },
        });
        player.initialize(videoRef.current!, videoRef.current!.src, false);
        return () => {
          player.destroy();
        };
      } catch (e) {
        fallback();
      }
    } else {
      fallback();
    }
  }, []);

  // set maxHeight manually because of this bug https://stackoverflow.com/questions/14554908/imgs-max-height-not-respecting-parents-dimensions
  // we use aspect ratio because height and width don't prevent the layout shift https://github.com/w3c/csswg-drafts/issues/7524
  return (
    <VideoStyle
      ref={videoRef}
      preload="metadata"
      poster={v.poster}
      style={{
        maxHeight: `${v.height > 600 ? 600 : v.height}px`,
        aspectRatio: `${v.width / v.height}`,
      }}
      src={v.url}
      controls
    />
  );
}

function getScrSet(images: Media[]) {
  return images.map((img) => `${img.url} ${img.width}w`).join(", ");
}

function PostLeftSide({ c }: { c: Content }) {
  const sc = c.score > 1000 ? `${Math.round(c.score / 1000)}k` : c.score;
  const arrow = c.score > 0 ? "??? " : "??? ";
  return (
    <LeftBarStyle>
      <CtnrVotesStyle>
        <ScoreStyle title="votes">{arrow + sc}</ScoreStyle>
        <div title="vote ratio" className="small-tx">
          {Math.round(c.voteRatio * 100)}% ratio
        </div>
      </CtnrVotesStyle>
      <PostControls c={c} />
    </LeftBarStyle>
  );
}

function useControlStatus(
  k: "saved" | "flagged",
  c: Content
): [boolean, () => void] {
  const h = getHistory();
  const [active, setStatus] = useState<boolean>(h[k].has(c.id));

  return [
    active,
    () => {
      active ? deleteFromHistory(k, c) : addToHistory(k, c);
      setStatus(!active);
    },
  ];
}

function PostControls({ c }: { c: Content }) {
  const [saved, toggleSaved] = useControlStatus("saved", c);
  const [flagged, toggleFlagged] = useControlStatus("flagged", c);

  return (
    <ControlsStyle>
      <li>
        <IconBtnGlowStyle title="Share" aria-label="Share">
          <Share />
        </IconBtnGlowStyle>
      </li>
      <li>
        <IconBtnGlowStyle onClick={toggleSaved} title="Save" aria-label="Save">
          <Save active={saved} />
        </IconBtnGlowStyle>
      </li>
      <li>
        <IconBtnGlowStyle
          onClick={toggleFlagged}
          title="Report"
          aria-label="Report"
        >
          <Flag active={flagged} />
        </IconBtnGlowStyle>
      </li>
    </ControlsStyle>
  );
}

export function NotFound({ text }: { text: string }) {
  return (
    <NotFoundStyle>
      <img src={mGlass} alt="magnifying glass" height="256" width="256" />
      <h3>{text}</h3>
    </NotFoundStyle>
  );
}
