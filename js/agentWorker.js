
importScripts('board.js'); 
importScripts('agent.js'); 


self.onmessage = async function(event) {
    const data = event.data;

    const board = new Board();
    board.setState(data);

    const agent = new Agent('O');

    const result = await agent.createMove(board);


    self.postMessage(result?.getBoard());
};