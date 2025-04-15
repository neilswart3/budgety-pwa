import { ThemeIcon } from '@/core';

self.onmessage = ({
  data: { data, query },
}: MessageEvent<{ data: ThemeIcon[]; query: string }>) => {
  const regex = new RegExp(query.replace(/^Md/, ''), 'i');
  const results = data.filter((v) => regex.test(v.replace(/^Md/, '')));

  self.postMessage(results);
};
