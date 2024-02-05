import { NextApiRequest, NextApiResponse } from "next";
import editorData from "data/downloads/editor.json";

// Define the type for your data
type editorDataType = typeof editorData;

type SuccessResponse = {
  status: "success";
  data: editorDataType;
};

type ErrorResponse = {
  status: "error";
  error: string;
  message: string;
};

type ApiResponse = SuccessResponse | ErrorResponse;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> => {
  // Check the HTTP request method
  if (req.method === "GET") {
    try {
      // Send the data in the response
      res.status(200).json({ status: "success", data: editorData });
    } catch (error) {
      // If there is an error, return 500 Internal Server Error
      if (error instanceof Error) {
        res.status(500).json({
          status: "error",
          error: "Internal Server Error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          error: "Internal Server Error",
          message: "An unexpected error occurred",
        });
      }
    }
  } else {
    // If the request method is not GET, return 405 Method Not Allowed
    res.setHeader("Allow", "GET");
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
