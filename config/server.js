
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const EventHubReader = require("../scripts/event-hub-reader");
// const ip = "192.168.0.21";
const PORT = process.env.PORT || 3000;


// Strings de conexão com o IOTHUB
const iotHubConnectionString = "HostName=HubOR.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=d5/5QXY1fciq7SvnKn+mkE6rflCtl5LloXeEVHQSVKk="
  // "HostName=OsmoseReversa2.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=1f/8ziUOkzF0HA81WpWm090g4qImrJ+Ab+irCbzwP+4=";
// const iotHubConnectionString = "HostName=OsmoseReversa.azure-devices.net;DeviceId=raspiPLC;SharedAccessKey=JSLpa4odQD6/OL0eNo747yBFbbS4QpJvl3pUYcr9NEI=";
// const eventHubConsumerGroup = "Vonhemier";
const eventHubConsumerGroup = "buckman";

// Utilização de uma pasta public para renderizar css e js personalizados
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res /* , next */) => {
  res.redirect("/");
});

// Criando servidor HTTP e WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = data => {
  wss.clients.forEach(client => {
    client.send(data)
    console.log(data)
    // if (client.readyState === WebSocket.OPEN) {
    //   try {
    //     console.log(data);
    //     client.send(data);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }
  });
};

// Rodando servidor
server.listen(process.env.PORT, () => {
  console.log(
    `Servidor rodando na porta ${PORT} no ip:`,
    server.address().port,
    // ip
  );
});

// Criando objeto da Azure event hub reader
const eventHubReader = new EventHubReader(
  iotHubConnectionString,
  eventHubConsumerGroup
);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId
      };

      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error("Error broadcasting: [%s] from [%s].", err, message);
    }
  });
})().catch();
