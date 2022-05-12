MAX_CONTINUE_COUNT = 2; // 36000; // 10 hours

async function fetchTweet() {
    try {
      const response = await axios.get(
            '/'
        );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function loop(){
    for(let i = 0; i < MAX_CONTINUE_COUNT; i++){
        console.log("sleep 1 second");
        fetchTweet();
        await sleep(1000);
    }
}

window.onload = function() {
    loop();
};