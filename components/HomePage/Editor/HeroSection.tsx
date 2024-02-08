import styles from "./HeroSection.module.scss";
import { HeroText, SectionSubtext } from "../components/Headings";
import { btnInfo, btnDown, downText, firstTitle, firstTitleSub } from "./text";
import { CTAButton } from "../components/CTAButton";
import Link from "next/link";
import { DownloadModal } from "./DownloadModal";
import useLocalesMap from "utils/use-locales-map";
import { AnimatedBackground } from "../components/AnimatedBackground";

import Image from "next/image";

import ueScreenshot from "../assets/ue-screenshot.png";

export default function HeroSection() {
  const buttonText = useLocalesMap(btnDown);
  const downloadText = useLocalesMap(downText);
  const firstTitleText = useLocalesMap(firstTitle);
  const firstTitleSubText = useLocalesMap(firstTitleSub);
  const btnInfoText = useLocalesMap(btnInfo);

  return (
    <>
      <section
        className={`font-sans w-auto pt-16 md:pt-24 lg:pt-32 flex justify-between gap-8 items-center flex-col relative ${styles.hero}`}
      >
        <div className={`flex flex-col gap-6 ${styles.content}`}>
          <div className="flex flex-col items-center justify-center gap-5 px-6 text-center lg:gap-6">
            <HeroText>{firstTitleText}</HeroText>
            <SectionSubtext hero>{firstTitleSubText}</SectionSubtext>
          </div>
        </div>
        <div className={`flex flex-col items-center w-full gap-5 px-6`}>
          <div className="flex flex-col gap-3 w-full md:w-min md:!flex-row">
            <DownloadModal buttonText={buttonText} />

            <Link href="/editor/docs" className="block whitespace-nowrap">
              <CTAButton outline limit>
                {btnInfoText}
              </CTAButton>
            </Link>
          </div>
          <p className="text-sm text-[#666666]">{downloadText}</p>
        </div>
        <div
          className={`flex flex-col overflow-hidden items-center justify-center gap-4 w-full ![perspective:1000px] sm:![perspective:1000px] md:![perspective:1000px] lg:![perspective:1000px] ${styles.editorImage} `}
        >
          <Image
            src={ueScreenshot}
            width={1200}
            alt="Unreal Engine 5 Editor with STALKER on UE"
            quality={100}
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABD1JREFUWEeNV2tPU1EQPOf0q4lfNEpCgokaoyaSAMqrWAGf+P//zr1md2Z297YlUSz3UmhndnZ2zrZfnZzNrbXW7VvrrffGB5/peE5/kdfW5rk1e7FdJ7uf5zb5z3Ob+Jib3U/NrvqyF9iXv+s1CQjcn3QSCSwCuhqg/ZtbBwl7QyPRjIjdgwDA+XNLEvbKJHD6uSiQwEYAZPYr4C+iAqh+X+UCZ+0kBXB87+uzL0nAKmcbTAZXwn8GGfSpB7DkT/BHSBhYAV8Q+Pr5nM0AmP8v4CJSe2/3oYDLLeBCgKBqxS4B+Kdvzi/mZf8puZFQ9VQCMuCFkv/R6uUDN2ZtgcTHtd9eXi0UcLmlAm62poAkYgJgwHkqzt+ZghRd5qOPW7+/Xj/SAoKLhMoP+QlcK5XjSSamQKNJ/WBB2urHzQ0JVNerchlQJoQBXbwyfjF2DjwtR9HHsyqQ4O6Bn5sNpoAORwsIrCvs6RMAtpXAHPI7kWnaCiJmA6uu1fs7/r79RjWK+ZzE4PjtegAJaMDmegJOnPn/IBBGtgL/3N1GCyACgasK9IG/cLsFAnQCU5vU//BGbQHTMzKltf5wf7dlQqt4LNrAsYgZ9I66B6aUfwK4k6jgHkA8MxTfZZz7w3cQQAjV3oOEP0cHwAMCZ7qp70bAwBZGLAcU/SPDxRT8JQG4UASyDUGgZ/rBhABL41EBEsEhxFOyKsBYt4PMC99WIFUoJOSBnRE0EmbCPeCmhKalSD+z0FDg4d5MiPTLauUBtSFdkyaUAvRBJbIwIE9KjxCoPJf9ov++szEso+Y+KP0nYyMHASAtrmk8730ZQYTT0nwYP/gqWvDrFkEkpyuIag4wpRBBzAAnQMN5G+I+l5A4rmVAya+iDPXHhlGsPsckjEJK8qUC2IIAvKMEzwSMH5RL+dEG7Rb9bn1dzoIcwzBjDaE4hkv/XQmNIFIR7o+lKwnsU2BzeRlBlGMYm2mowCOg5IDAsveYCC0okVvRdxiQ760xXH/BSgYb5C/DC5RLf2QASEG2wIMo76WANuYALS2uydovTk4whkGAuRhkGlhX+dVjXVl5glf5d9XEjsmUPf10zCjWmZyZkGYpZ/j2GG6TYfDnGV8IOLACjoUev/+4bMGiFWpN3QPzDEDF9cF9D0lTWspgGzzmi7H7hzfv9hBQLoQ7cpOP/pcPIPqkw+CpuaI8sXBz6ccoB19r/e3R6yQQ81k+icX+ps1WBlTWS4F0/fah1g3UCYzWB0Y9Tt9XB0dKxSyXCsJ3sYTlh4uyiMZ25NWX49uBRhsE96vfk4DW/sNnh6UFFVL35WNl6bcvHXU3XCQpqjVQPfpYtTF6G0UFV+rl04OFArm/qHp9rNK2mxsPNh8dOHR7gBrgaKsVryJQVTACz5+8KB5Iubl2Iu+9UgHbtZCIZcOcDpmHg64cfLUabeX3VMOVSR/8A8qvi/2yLUTEAAAAAElFTkSuQmCC"
            style={{
              transform: "rotateX(35deg)",
              marginBottom: "-100px",
              zIndex: -1,
            }}
          />
        </div>
        <AnimatedBackground />
      </section>
    </>
  );
}
