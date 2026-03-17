const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL || "ws://localhost:8000/ws/live";

let socket: WebSocket | null = null;

export const connectWebSocket = (onMessage: (data: unknown) => void) => {

  socket = new WebSocket(WS_BASE_URL);

  socket.onopen = () => {
    console.log("Connected to HerCycle live dashboard");
  };

  socket.onmessage = (event) => {

    const data = JSON.parse(event.data);

    console.log("New health report:", data);

    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };
};

export const closeWebSocket = () => {
  if (socket) socket.close();
};