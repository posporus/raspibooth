import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Icon from "../components/Icon.tsx";
import AnimatedBackground from "../components/AnimatedBackground.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Raspibooth DEMO</title>
        <link href="/daisyui.css" rel="stylesheet" type="text/css" />
      </Head>
      {/* <AnimatedBackground /> */}

      <div class="flex flex-col max-w-screen h-[100dvh] bg-gradient-to-b from-[#332F7D] via-[#93245E] to-[#00D4FF] overflow-hidden">
        <div class="sticky top-0 bg-base-100 navbar z-50 h-[4rem] w-full">
          <a class="btn btn-ghost normal-case text-xl">raspibooth DEMO</a>
        </div>
        <div class="flex-grow w-screen">
          <Component />
        </div>
      </div>
      <div class="footer p-10 bg-neutral text-neutral-content max-w-screen">
        <nav>
          <header class="footer-title">Related</header>
          <a class="link link-hover" href="https://github.com/posporus/raspibooth" target="_blank">
            <Icon prefix="fab" iconName="github" /> Github
          </a>
          <a class="link link-hover" href="https://youtube.com/shorts/143HInTq7Ms?si=GVIx9zc8s2PWma6G" target="_blank">
            <Icon prefix="fas" iconName="film" /> RB1 in Action
          </a>
        </nav>
      </div>
    </>
  );
}
