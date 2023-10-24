#
### 1. rapid.api
open rapid.api, it's a website that provides api for free

Crypto Update Live https://rapidapi.com/imarghyadeep/api/crypto-update-live/
https://rapidapi.com/alphavantage/api/alpha-vantage/

then install axios , this is a promise based http client for the browser and node.js
it can be used in your front-end and back-end, help you to make http request to external resources    npmjs.com/package/axios

```
npm install axios
```
then delete unnecessary files only keep app.js , index.js and index.css

only left function App() in app.js
delete the logo part in index.js
keep not use ; in the end of each line

# Create

npx create-react-app crypto-dashboard















#### create components files
 newsfee.js
cryptocurrencies.js
exchangerate.js

### how to protect key! 
create a .env file in the root directory, then add .env to .gitignore file
when finish this , you still need to npm run start to restart the server

** However, it's not safe enough with this method, because the key is still in the browser, so we need to use backend to hide the key

when open website, open source, static/js/main.chunk.js, search for

 rapid (key), you can find the key in the code

### use npm package
chose cors  npmjs.com/package/cors
express  npmjs.com/package/express
dotenv
axios
```
 npm install cors express dotenv axios
```
create a new file backend.js in root directory, this is the backend file. 
modify npm run start as npm run start:frontend in package.json
then go to package.json, add a new script
```json
"start:backend: "nodemon backend.js"
```
then run
```
 npm i nodemon
 npm run start:backend
 npm run start:frontend
```
 nodemon means node monitor, it will monitor the changes in the file, then restart the server automatically







# Problem

### 1. convert can only convert from usd to other currency, but can't convert from other currency to usd
-1. create a new state variable for the amount of the primary currency

### 2. why should we use res.json instead of console.log
Using `res.json()` to send the response data from your server to the client is the correct approach in an API endpoint because it serializes the JavaScript object into JSON format and sets the appropriate `Content-Type` header to indicate that the response contains JSON data. This makes it easier for the client to understand the format of the data and parse it correctly.

When you use `res.json()`, the client-side code can expect to receive JSON data and can parse it using methods like `response.json()` in JavaScript, which will return a promise that resolves to the parsed JavaScript object.

In your case, you're fetching data from an external API using Axios and then forwarding this data to your client. By using `res.json()`, you're ensuring that the client knows how to handle the response correctly, and it will be able to access the data as a JavaScript object without additional parsing.

Here's the corrected code for your server endpoint:

```javascript
app.get('/exchange-rate', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            from_currency: 'BTC',
            function: 'CURRENCY_EXCHANGE_RATE',
            to_currency: 'USD'
        },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        const exchangeRate = response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        res.json({ exchangeRate }); // Send a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the exchange rate' });
    }
});
```

By using `res.json({ exchangeRate })`, you're sending the exchange rate data as JSON with a key of `exchangeRate`, making it easy for the client to access this specific piece of data. Additionally, I've included a 500 status code in the error response to indicate a server error in case of an exception. This is a good practice for API error handling.



# Mistakes

### 1. use wrong value

Here I should use value={amount} instead of value={"amount"}, otherwise it will show "amount" in the input box,
because the value is a string, not a variable!  result is the same, it will show "result" in the input box
```
            <input
                type="number"
                name="currency-amount-1"
                value={"amount"}
            />  


value={"result"}
```




### 2. use wrong code snippet

use 3 api,  api/alpha-vantage/ for currency exchange rate, 
api/crypto-update-live/ for crypto currency news
https://rapidapi.com/Coinranking/api/coinranking1


I should use alpha vantage/ Digital & Crypotcurrencies instead of crypto update live

the path is https://rapidapi.com/alphavantage/api/alpha-vantage/, / Digital & Crypotcurrencies /get currency exchange rate(crypto) / node.js


asyn () function is used to make a function asynchronous, it will return a promise
use await to wait for the promise to be resolved or rejected


### 3.  import code snippet without subscribe the api
I should subscribe the api first, then import the code snippet, otherwise it will show error




### 4. 

trying to create a cryptocurrency converter with two dropdowns for selecting primary and secondary currencies and an input field to enter the amount of the primary currency. However, it seems you're unable to change the selected currency in the dropdown.


#### Reason

2. **Identifying the Issue**:

   The problem seems to be in the `value` attributes of your `<select>` tags:
   
   ```html
   <select value={'chosenPrimaryCurrency'} ...>
   ```
   
   ```html
   <select value={'chosenSecondaryCurrency'} ...>
   ```

   Here, you've enclosed the variable names inside a string literal, which means the selects are always trying to set their values to the literal strings `'chosenPrimaryCurrency'` and `'chosenSecondaryCurrency'` instead of the actual values of these state variables. This is why you can't change the selected currency in the dropdowns.

3. **Solution**:

   Remove the curly braces and quotes around the state variable names in the `value` attributes of the `<select>` tags:

   ```html
   <select value={chosenPrimaryCurrency} ...>
   ```

   ```html
   <select value={chosenSecondaryCurrency} ...>
   ```

   This change will bind the `<select>` elements to the actual values of the `chosenPrimaryCurrency` and `chosenSecondaryCurrency` state variables, allowing the dropdowns to reflect their current values and update correctly when changed.

### 5. use wrong function
The code you've provided for your NewsFeed component appears to be mostly correct. It uses the useEffect hook to fetch data from the specified API when the component mounts (due to the empty dependency array []), and it logs the response data to the console.

However, there is an issue with the way you've defined your useEffect function. The useEffect callback function should not be declared as async. Instead, you can create an async function inside useEffect and call that function. Here's a corrected version of your code:

```
const NewsFeed = () => {
  useEffect(() => {
    const fetchData = async () => {
      const options = {
```

### 6. set wrong state

const [articles, setArticles] = useState([null])  // set null as default value

my problem is useState(null) instead of useState([null]) , because useState(null) will set the articles to null, then it will show error in the console


### 7. use wrong api value


Given the structure of the data from the console:

```javascript
{Title: '...', URL: '...'}
```
 The property name is `Title` (with an uppercase T), not `title`.

Let's correct that in the mapping function:

```jsx
{articles?.map((article, _index) => (
    <div key={_index}>  
        <p>{article.Title}</p>  {/* Change 'title' to 'Title' */}
    </div>
))}

Due to this problem, our method failed:
            try {
                const response = await axios.request(options)
                console.log(response.data)
                setArticles(response.data)   
            } catch (error) {
                console.error(error)
                console.log(error.response.data)
            }
        }

        fetchData() // Call the async function to fetch data

    }, []) // Empty array means this will only run once (on mount)

    
    console.log(articles)

    const first8Articles = articles?.slice(0, 8) // Slice the first 10 articles from the array


#### 8. Use wrong value

The issue you're facing is that the exchangedData state is an object, and you're trying to directly render it in your ExchangeRate component, which React does not allow. React components should render primitive values or arrays, not objects. 

    return (
        <div className="exchange-rate">
            <h3>Exchange Rate:</h3>
            <h1>{exchangedData}</h1>
            <p>{exchangedData.primaryCurrency} to {exchangedData.secondaryCurrency}</p>
        </div>
    )
I should use exchangedData.exchangeRate instead of exchangedData


#### 9. use wrong function 

I should  const app fist , then use app.use(cors()) instead of app.use(cors()) first, then const app

app.use(cors())

const app = express()


#### 10. use wrong 

Previously, you were applying the cors() middleware both globally using app.use(cors()) and on the specific /news route using app.get('/news', cors(), ...). This could lead to confusion and potential issues with CORS.
wrong:
app.get('/news', cors(), async (req, res) => {
correct:
app.get('/news', async (req, res) => {

removed the cors() middleware from the specific /news route and applied it globally using app.use(cors())


#### 11.  a `401 (Unauthorized)` status

The error message you're receiving indicates a `401 (Unauthorized)` status code. This typically means that your API key or other authentication details are incorrect or not being recognized.

Here are some steps to troubleshoot and potentially resolve the issue:

2. **Hardcoded Params**: In your frontend's `convert` function, you're using hardcoded string values for `from_currency` and `to_currency`. These should probably be dynamic based on user input or some other variable:

   ```javascript
   params: {
       from_currency: 'chosenPrimaryCurrency',
       function: 'CURRENCY_EXCHANGE_RATE',
       to_currency: 'chosenSecondaryCurrency'
   }
   ```

   Instead of the hardcoded strings `'chosenPrimaryCurrency'` and `'chosenSecondaryCurrency'`, you likely want to use actual variables:

   ```javascript
   params: {
       from_currency: chosenPrimaryCurrency,
       function: 'CURRENCY_EXCHANGE_RATE',
       to_currency: chosenSecondaryCurrency
   }
   ```

3. **Backend Endpoint**: In your frontend, you're calling the Alpha Vantage API directly. However, you also have a backend endpoint `/convert` that does the same. You might want to call your backend endpoint from the frontend instead of calling the Alpha Vantage API directly. This way, you can keep your API key secure on the backend.

   Replace:

   ```javascript
   url: 'https://alpha-vantage.p.rapidapi.com/query',
   ```

   With:

   ```javascript
   url: 'http://localhost:4000/convert',
   ```

4. **Error Handling**: In your backend's `/convert` route, you're catching errors but not sending any response back to the frontend in case of an error. This can lead to the frontend hanging indefinitely. Update your error handling to send back a response:

   ```javascript
   catch (error) {
       console.error(error);
       res.status(500).json({ message: "Failed to fetch conversion rate" });
   }
   ```


## Fontend and backend cannot connect

1. **Update the Frontend Axios Requests:**

   In your frontend code, wherever you're making Axios requests to your backend (e.g., `localhost:4000/news`), you'll need to update the base URL from `localhost:4000` to the actual IP address of your VPS (or preferably a domain name if you have one). 

   For instance, if you have an Axios instance or a base URL setup like:
   ```javascript
   axios.defaults.baseURL = 'http://localhost:4000';
   ```

   Update it to:
   ```javascript
   axios.defaults.baseURL = 'http://159.223.207.23:4000';
   ```

2. **CORS Configuration:**

   Ensure that your CORS middleware in the backend is correctly set up to allow requests from the frontend. Currently, you're allowing all origins, which is fine for development, but for production, you might want to restrict it to specific domains or IP addresses.

3. **Environment Variables:**

   If you're using environment variables in your frontend code (like `REACT_APP_RAPID_API_KEY`), ensure those are correctly set up on your VPS. The frontend build process might need those during the build phase.

4. **Proxy Setting in package.json:**

   If you're using the `proxy` setting in your frontend's `package.json` (like `"proxy": "http://localhost:4000"`), this is used during development only. It does not affect the production build. Once you deploy, this setting is irrelevant, and you'll need to specify the full URL in your Axios requests or set a base URL as described above.

5. **Use Environment Variables for Dynamic Configuration:**

   Instead of hardcoding the IP address, it's a good practice to use environment variables or a configuration file. This way, you can have different settings for development, staging, and production environments without changing the code.

To summarize, the main thing you need to do is update your frontend's Axios calls to point to the actual IP address of the VPS (or domain name) instead of `localhost`.