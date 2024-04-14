import express from "express";
import {
  addCityToFavourites,
  removeCityFromFavourites,
  getIconByNumber,
} from "./logic.js";
import cors from 'cors'

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static("/"));
app.use("/css", express.static("css"));
app.use("/data", express.static("data"));
app.use("/js", express.static("js"));
app.use("/html", express.static("html"));

app.use(express.json());

app.get("api/icons/:num", async (req, res) => {
  try {
    const num = parseInt(req.params.num);
    const iconPath = await getIconByNumber(num);
    if (iconPath) {
      res.json({ path: iconPath });
    } else {
      res.status(404).send("Icon not found");
    }
  } catch (error) {
    res.status(500).send("Server error occured");
  }
});

app.post("api/favourites/", async (req, res) => {
  try {
    const cityObj = req.body;
    await addCityToFavourites(cityObj);
    res.status(201).send({
      message: "City saved to Favourites successfully",
      object: cityObj,
    });
  } catch (error) {
    res.status(500).send("Server error occured");
  }
});

app.delete("api/favourites/", async (req, res) => {
  try {
    const cityObj = req.body;
    await removeCityFromFavourites(cityObj);
    res.status(200).send({
      message: "City removed from Favourites successfully",
      object: cityObj,
    });
  } catch (error) {
    res.status(500).send("Server error occured");
  }
});

app.listen(port, () =>
  console.log(`Serbver is running on http://localhost:${port}`)
);
