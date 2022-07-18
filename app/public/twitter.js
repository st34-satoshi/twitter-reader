MAX_CONTINUE_COUNT = 36000; // 10 hours

let ListData = {}; // {tweetId: {text: text, user: userName}}
let ContinueLoop = false;
let tweetCounter = 0; // the number of data (tweet)

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
            `/tweet?${q}`
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
    ContinueLoop = true;
    for(let i = 0; i < MAX_CONTINUE_COUNT; i++){
        if(!ContinueLoop){
            break;
        }
        q = getQuery()
        response = await fetchTweet(q)
        await createList(response, true)
        console.log("sleep 5 second");
        await sleep(1000);
    }
}

function stopLoop(){
    ContinueLoop = false;
    speechSynthesis.cancel();
}

async function readText(text){
    const uttr = new SpeechSynthesisUtterance(text)
    uttr.lang = "ja-JP" // en-US
    uttr.onstart = () => console.log(uttr.text);
    speechSynthesis.speak(uttr)

    return new Promise(resolve => {
        uttr.onend = resolve;
    });
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
async function createList(data, read=false){
    var list = document.getElementById('resultList');
    const tableBody = document.getElementById('resultTableBody');
    for(item in data){
        if(item in ListData){
            continue
        }
        const text = data[item]['text']
        const user = data[item]['user']
        const userScreenName = data[item]['user_screen_name']

        const tr = document.createElement('tr');
        tweetCounter += 1;
        tr.innerHTML = `<th scope="row">${tweetCounter}</th>`
                        + `<td id="${item}">${text}</td>`
                        + `<td><button type="button" class="btn btn-outline-success" onclick="readSpanTextOf('${item}')">read</button></td>`
                        + `<td>${user} @${userScreenName}</td>`
        tableBody.insertBefore(tr, tableBody.firstChild);

        ListData[item] = data[item]
        if(read && ContinueLoop){
            await readText(data[item]['text'])
        }
    }
}