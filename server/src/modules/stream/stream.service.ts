import { faker } from "@faker-js/faker";
import { Response, Request } from "express";

export function streamText(req: Request, res: Response) {
  //step 1: set headers for streaming response
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  // Transfer-Encoding chunked tells the browser to expect data in pieces
  res.setHeader("Transfer-Encoding", "chunked");

  // Cache-Control no-cache tells the browser not to store this response
  res.setHeader("Cache-Control", "no-cache");

  // Access-Control-Allow-Origin * allows any website to access this API
  res.setHeader("Access-Control-Allow-Origin", "*");

  //step 2: generate a long text to stream
  const text = faker.lorem.paragraphs(32);

  let index = 0;
  const chunkSize = 5;

  //step 3: send the text in small chunks every 20 milliseconds
  const interval = setInterval(() => {
    if (index >= text.length) {
      clearInterval(interval);
      res.end();
      return;
    }
    res.write(text.slice(index, index + chunkSize));
    index += chunkSize;
  }, 20);

  //step 4: if the user closes the connection stop sending data
  req.on("close", () => {
    clearInterval(interval);
    console.log("Stream connection closed by client");
  });
}
