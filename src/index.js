const { setupServer } = require("./server");
const server = setupServer();
server.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
