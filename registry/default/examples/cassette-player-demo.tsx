import { CassettePlayer } from "@/registry/default/ui/cassette-player"

// The track and artist are made up.
export default function CassettePlayerDemo() {
  return <CassettePlayer className="w-[min(26rem,calc(100vw-3rem))]" title="Summer ’98 mixtape" artist="for Sam, from Jo" duration={214} />
}
