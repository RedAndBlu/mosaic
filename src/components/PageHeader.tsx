import React from "react";
import { useNavigate } from "react-router-dom";
import { ThreeBars } from "./icons";
import {
  IconBtnStyle,
  OutlineBtnStyle,
  PrimaryBtnStyle,
} from "./styles/button.style";
import {
  AuthButtonsStyle,
  HeaderBarStyle,
  LeftBlockStyle,
  PageHeaderStyle,
} from "./styles/PageHeader.style";

export function PageHeader(props: { toggleNav: () => void }) {
  return (
    <PageHeaderStyle>
      <HeaderBarStyle>
        <LeftBlock toggleNav={props.toggleNav} />
        <Search />
        <AuthButtons />
      </HeaderBarStyle>
    </PageHeaderStyle>
  );
}

function Search() {
  const navigate = useNavigate();
  const onSummit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = (e.currentTarget as HTMLFormElement).search.value;

    if (q) {
      navigate(`/search?q=${q}`);
    }
  };

  return (
    <form onSubmit={onSummit}>
      <input name="search" type="search" placeholder="Search" />
    </form>
  );
}

function LeftBlock(props: { toggleNav: () => void }) {
  return (
    <LeftBlockStyle>
      <IconBtnStyle onClick={props.toggleNav}>
        <ThreeBars />
      </IconBtnStyle>
      <h1>Mosaic</h1>
    </LeftBlockStyle>
  );
}

function AuthButtons() {
  return (
    <AuthButtonsStyle>
      <OutlineBtnStyle>log in</OutlineBtnStyle>
      <PrimaryBtnStyle>sign up</PrimaryBtnStyle>
    </AuthButtonsStyle>
  );
}
