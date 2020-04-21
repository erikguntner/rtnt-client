import Head from "next/head";
import { withRouter } from "next/router";
import Map from "../components/Map";

function Home({ router }) {
  return (
    <>
      <Map {...{ router }} />
    </>
  );
}

export default withRouter(Home);
