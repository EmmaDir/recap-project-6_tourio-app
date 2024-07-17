import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export const config = { maxDuration: 60 };

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();
    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);

      response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      response.staus(400).json({ error: error.message });
    }
  }
}
