import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export const config = { maxDuration: 60 };

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ staus: "Not Found" });
    }

    response.status(200).json(place);
  }

  if (request.method === "PATCH") {
    const placeData = request.body;
    await Place.findByIdAndUpdate(id, { $set: placeData });
    return response.status(200).json({ status: "Place updated!" });
  }

  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    response.status(200).json({ status: "Place successfully deleted." });
  }
}
