import styled from "styled-components";

const SMALL_SCREEN = 450;

export const PostStyle = styled.section`
  background-color: var(--bg-color);
  border: 1px solid var(--bg-color-200);
  border-radius: 2px;
  box-shadow: 0px 1px 2px 0px hsl(0, 0%, 10%, 0.15);
  display: flex;

  @media (max-width: ${SMALL_SCREEN}px) {
    flex-direction: column;
  }
`;

export const PostContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.5rem;
`;

export const PostTitleStyle = styled.h2`
  font-weight: 400;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const VideoStyle = styled.video`
  background-color: black;
  height: 100%;
  width: 100%;
`;

export const ImgStyle = styled.img`
  background-clip: padding-box;
  border-radius: 8px;
  height: 100%;
  margin: auto;
  object-fit: contain;
  width: auto;
  max-width: 100%;
`;

export const PostCtnrInfoStyle = styled.div`
  color: var(--on-bg-color-600);
  font-size: 0.9rem;
`;

export const LeftBarStyle = styled.div`
  background: linear-gradient(0deg, var(--bg-color), var(--bg-color-50));
  border-right: 1px solid var(--bg-color-100);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 6px;

  @media (max-width: ${SMALL_SCREEN}px) {
    flex-direction: row;
    background: linear-gradient(270deg, var(--bg-color), var(--bg-color-50));
    border-right: none;
    border-bottom: 1px solid var(--bg-color-100);
  }
`;

export const CtnrVotesStyle = styled.div`
  align-items: center;
  display: flex;
  color: var(--on-bg-color-600);
  gap: 0.5rem;
  writing-mode: vertical-lr;

  @media (max-width: ${SMALL_SCREEN}px) {
    writing-mode: unset;
  }
`;

export const ScoreStyle = styled.div`
  color: var(--secondary-color);
  font-weight: bold;
  white-space: nowrap;
`;

export const ControlsStyle = styled.menu`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
  padding: 0;

  & > li {
    list-style-type: none;
  }

  @media (max-width: ${SMALL_SCREEN}px) {
    flex-direction: row;
  }
`;