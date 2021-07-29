const axios = require('axios');
const cheerio = require('cheerio');
function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}

const getPostTitles = async () => {
	try {
		const { data } = await axios.get(
			'https://petharbor.com/results.asp?searchtype=ADOPT&start=1&miles=20&shelterlist=%27SNFR%27&zip=&where=type_DOG&friends=0&nomax=1&rows=10&nobreedreq=1&nopod=1&nocustom=1&imgres=detail&grid=1&tWidth=300'
		);
		const $ = cheerio.load(data);

        const availCount = $('.GridResultsContainer')[0].children.length;

		return availCount;
	} catch (error) {
		throw error;
	}
};
setInterval(() => {getPostTitles()
    .then((availCount) => {
        if(availCount > 6){
            sendText(availCount);
            console.log(getFormattedDate());
            console.log("sent text, avail:",availCount);
        }
        else {
            console.log(getFormattedDate());
            console.log("No new pups!",availCount);
        }
    });},10000)



const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "cbaf33f3",
  apiSecret: "SIgcCLwIk5fD6LQw"
})


const sendText = (availCount) => {
const from = "18886579976"
const to = "14083684728"
const text = `Found new pup:`+availCount;
    console.log(getFormattedDate());
    console.log(text)
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(getFormattedDate());
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log(getFormattedDate());
                console.log("Message sent successfully.");
            } else {
                console.log(getFormattedDate());
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

