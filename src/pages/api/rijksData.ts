import rijksDataApiHandler from "../../libs/rijksData";
import type { NextApiRequest, NextApiResponse } from "next";

type IParseParamsProps = {
  currentPage?: number | undefined;
  searchQ?: string | undefined;
  paintingId?: string;
};
const parseParams = (paramsObject: IParseParamsProps) => {
  const { currentPage, searchQ, paintingId } = paramsObject;
  if (paintingId) {
    return { objectNumber: paintingId };
  }
  let queryParams = `p=${currentPage ?? 0}`;
  if (searchQ !== undefined) {
    queryParams = queryParams + "&q=" + searchQ;
  }
  return queryParams;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const handlerParams: { objectNumber: string } | string = parseParams(
        req.query,
      );
      const response = await rijksDataApiHandler(handlerParams);
      await res.status(200).json(response);
    } catch (error) {
      await res.status(500).json(error);
    }
  } else {
    // Handle any other HTTP method
  }
}
