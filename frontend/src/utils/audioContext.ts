import Component from "../components/Component";
import { audio } from "../components/htmlElementsArtificial";

const audioContext = new AudioContext();

const SAMPLE_RATE = audioContext.sampleRate;
const timeLength = 1;

const buffer = audioContext.createBuffer(
  1,
  SAMPLE_RATE * timeLength,
  SAMPLE_RATE,
);

const channelData = buffer.getChannelData(0);
//? Audio levels vary from 0-2
channelData.forEach((item) => (item = Math.random() * 2 - 1));

//? Create new audio source node + assign buffer
const source = audioContext.createBufferSource();
source.buffer = buffer;

//? Create a gain control node + connect between source & dest'
const gainControl = audioContext.createGain();
//* First arg here is what I think will be used for slider input
gainControl.gain.setValueAtTime(0.05, 0);

source.connect(gainControl);
gainControl.connect(audioContext.destination);

//? Activates the audio source
source.start();

//* For this application, audio should start on first load of home page
//* Users can only change volume with slider input that affects value of gain node

//? Would be better for accessibility to use an audio element in practice
// async function loadBackgroundAudio(): Promise<void> {
//   const res = await fetch(
//     "https://drive.google.com/uc?export=download&id=1czZHpZT641wo5newDWpNSkHlzqkzcZrm",
//   );

//   const soundBuffer = await res.arrayBuffer();
//   const bgMusicBuffer = await audioContext.decodeAudioData(soundBuffer);

//   const bgMusicSource = audioContext.createBufferSource();
//   bgMusicSource.buffer = bgMusicBuffer;

//   bgMusicSource.connect(gainControl);
//   bgMusicSource.start();
// }

//* OR

//? Defines an audio source that can be used/altered throughout the application
export class AudioSource extends Component {
  constructor() {
    super();
  }

  override render(): HTMLElement {
    return audio({
      class: "audio audio-bg",
      id: "bgAudio",
      src: "https://drive.google.com/uc?export=download&id=1czZHpZT641wo5newDWpNSkHlzqkzcZrm",
    });
  }
}
