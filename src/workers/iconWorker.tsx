import * as mdIcons from 'react-icons/md';
import { renderToString } from 'react-dom/server';

self.onmessage = ({ data }: MessageEvent<string>) => {
  const TheIcon = mdIcons[data as keyof typeof mdIcons];

  self.postMessage(renderToString(<TheIcon size={24} />));
};
