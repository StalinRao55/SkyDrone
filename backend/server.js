const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/images", express.static(path.join(__dirname, "../frontend/images")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ---------------- DRONE SIMULATION ----------------
let drone = {
  lat: 17.385,
  lng: 78.486,
  battery: 100,
  status: "DISPATCHED"
};

io.on("connection", (socket) => {
  console.log("📡 Client connected");

  const interval = setInterval(() => {
    drone.lat += 0.00015;
    drone.lng += 0.00015;
    drone.battery -= 0.7;

    if (drone.battery <= 0) {
      drone.status = "DELIVERED";
      clearInterval(interval);
    }

    socket.emit("droneUpdate", drone);
  }, 2000);

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("❌ Client disconnected");
  });
});

// ✅ WORKS FOR BOTH LOCALHOST & RENDER
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
