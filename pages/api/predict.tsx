import { NextApiRequest, NextApiResponse } from "next";

interface RequestData {
  url: string;
  method: "GET" | "POST";
  body?: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url, method, body }: RequestData = JSON.parse(req.body);

    if (method === "GET") {
      const response = await fetch(url);

      const responseBody = await response.text();

      res.status(response.status).send(responseBody);
    } else if (method === "POST") {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const responseBody = await response.json();

      res.status(response.status).send(responseBody);
    }
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }
};