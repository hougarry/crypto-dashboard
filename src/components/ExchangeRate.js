// const ExchangeRate = ({exchangeRate, chosenPrimaryCurrency, chosenSecondaryCurrency}) => {
const ExchangeRate = ({ exchangedData }) => {
    return (
        <div className="exchange-rate">
        <h3>Exchange Rate</h3>
        <p>
             {exchangedData.primaryCurrency} to {exchangedData.secondaryCurrency}
        </p>
        <p>
            Exchange Rate: {exchangedData.exchangeRate}
        </p>
        </div>
    )
}
export default ExchangeRate