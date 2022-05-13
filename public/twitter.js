MAX_CONTINUE_COUNT = 2; // 36000; // 10 hours

let ListData = {} // {tweetId: {text: text, user: userName}}

/**
 *
 * @param {} q
 * q = q=foo&q=bar
 * return: {tweetId: {text: text, user: userName}}
 */
async function fetchTweet(q) {
    let response;
    try {
      response = await axios.get(
            `/tweet/?${q}`
        );
    } catch (error) {
      console.error(error);
    }
    return response.data
}

/**
 * search text
 * do not read anything
 */
function getQuery(){
    searchText = document.getElementById("searchText").value
    // separate by space, connect to q=foo&q=bar
    words = searchText.split(' ')
    q = ''
    for (let i = 0; i < words.length; i++) {
        q += `q=${words[i]}&`
    }
    return q
}
async function initSearch(){
    q = getQuery()
    response = await fetchTweet(q)
    createList(response)
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function loop(){
    for(let i = 0; i < MAX_CONTINUE_COUNT; i++){
        console.log("sleep 1 second");
        // fetchTweet();
        await sleep(1000);
    }
}

function readText(text){
    const uttr = new SpeechSynthesisUtterance(text)
    uttr.lang = "ja-JP" // en-US
    speechSynthesis.speak(uttr)
}

function readFreeText(){
    text = document.getElementById("readMessage").value
    readText(text)
}

function readSpanTextOf(id){
    text = document.getElementById(`${id}`).textContent
    console.log(text)
    readText(text)
}

/**
 * create list
 * data: {tweetId: {text: text, user: userName}}
 */
function createList(data){
    var list = document.getElementById('resultList');
    for(item in data){
        if(item in ListData){
            continue
        }
        const text = data[item]['text']
        const user = data[item]['user']
        var li = document.createElement('li');
        li.innerHTML = `<li><span id="${item}">${text}</span> <button onclick="readSpanTextOf('${item}')">read</button> <span>${user}</span></li>`
        list.insertBefore(li, list.firstChild);
        ListData[item] = data[item]
    }
}