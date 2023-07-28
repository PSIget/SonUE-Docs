import styles from "./index.module.scss"

import { downText, firstTitle, goBtn, goTitle } from "./text";
import useLocalesMap from "utils/use-locales-map";
import { Inter } from 'next/font/google'
import classnames from "classnames";
import { Discord } from "../components/discord";
import { Boosty } from "../components/boosty";
import { EndBlock } from "../components/endBlock";
import Head from "next/head";
import Hero from "./Hero";
import Screenshots from "./Screenshots";
import Features from "./Features";
import OriginalStory from "./OriginalStory";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function Home() {
  return (
    <>
      <Head>
        <style>
          {`
            footer {
              background-color: white !important;
            }
            .dark footer,
            .dark body {
              background-color: black !important;
            }

            .dark .nextra-nav-container .nextra-nav-container-blur  {
              background-color: rgba(0,0,0,.5) !important;
            }

            html:not([class~="dark"]) {
              .hero{
                border-bottom: 0.0625rem solid rgba(0, 0, 0, 0.08) !important;
              }
            }
          `}
        </style>
      </Head>
      <main className={classnames(inter.variable, styles.game) + " relative place-content-center"} id="game-index">
        <h1 className="hidden">{useLocalesMap(firstTitle)}</h1>
        <Hero />
        <Screenshots />
        <Features />
        <OriginalStory />
        <Discord />
        <Boosty />
        <EndBlock title={useLocalesMap(goTitle)} buttonText={useLocalesMap(goBtn)} subTitle={useLocalesMap(downText)} />
      </main>
    </>
  );
}
