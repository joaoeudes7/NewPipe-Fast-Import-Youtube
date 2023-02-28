import stream from "stream";

export function createStreamJson<T>(obj: T): stream.PassThrough {
  const fileStream = new stream.PassThrough();

  return fileStream.end(JSON.stringify(obj));
}
