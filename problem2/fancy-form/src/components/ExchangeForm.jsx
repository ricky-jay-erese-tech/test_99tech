import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExchangeAlt, FaMoneyBillWave, FaCalculator } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const gradientAnimation = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const ExchangeForm = () => {
    const [currencies] = useState(["USD", "EUR", "GBP", "INR"]);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const exchangeRateAPI = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    useEffect(() => {
        if (amount > 0) {
            convertCurrency();
        }
    }, [fromCurrency, toCurrency, amount]);

    const convertCurrency = async () => {
        setLoading(true);
        setError("");

        if (amount <= 0 || isNaN(amount)) {
            setError("Please enter a valid amount greater than 0.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(exchangeRateAPI);
            const rate = response.data.rates[toCurrency];

            if (!rate) {
                setError("Conversion rate not available for selected currencies.");
                setLoading(false);
                return;
            }

            setConvertedAmount((amount * rate).toFixed(2));
        } catch (error) {
            setError("Error fetching exchange rates. Please try again.");
            console.error("API Error:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return (
        <>
            <style>{gradientAnimation}</style>
            <div className="d-flex justify-content-center align-items-center min-vh-100"
                style={{
                    backgroundSize: "400% 400%",
                    animation: "gradient 15s ease infinite"
                }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="card p-5 shadow-lg rounded-4 border-0"
                    style={{
                        maxWidth: "500px",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        marginLeft: "3rem"
                    }}>
                    <div className="text-center mb-5">
                        <FaMoneyBillWave size={40} className="text-primary mb-3" />
                        <h2 className="fw-bold text-primary mb-2">Currency Swap</h2>
                        <p className="text-muted">Convert your money instantly</p>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold d-flex align-items-center">
                            <FaCalculator className="me-2 text-primary" />
                            Amount:
                        </label>
                        <input
                            type="number"
                            value={amount}
                            min="1"
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control form-control-lg shadow-sm border-2"
                            style={{ borderRadius: "12px" }}
                        />
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="alert alert-danger p-3 rounded-3 shadow-sm"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="row g-4">
                        <div className="col-5">
                            <label className="form-label fw-semibold">From:</label>
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="form-select form-select-lg shadow-sm border-2"
                                style={{ borderRadius: "12px" }}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-2 d-flex align-items-end justify-content-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary btn-lg rounded-circle shadow-sm"
                                onClick={swapCurrencies}
                                style={{ width: "50px", height: "50px", padding: 0 }}
                            >
                                <FaExchangeAlt size={20} />
                            </motion.button>
                        </div>

                        <div className="col-5">
                            <label className="form-label fw-semibold">To:</label>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="form-select form-select-lg shadow-sm border-2"
                                style={{ borderRadius: "12px" }}
                            >
                                {currencies.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-5"
                    >
                        <button
                            onClick={convertCurrency}
                            className="btn btn-primary btn-lg w-100 shadow-sm fw-semibold py-3"
                            disabled={loading}
                            style={{
                                borderRadius: "12px",
                                background: "linear-gradient(45deg, #667eea, #764ba2)",
                                border: "none",
                                fontSize: "1.1rem"
                            }}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            ) : (
                                <FaExchangeAlt className="me-2" />
                            )}
                            {loading ? "Converting..." : "Convert Currency"}
                        </button>
                    </motion.div>

                    <AnimatePresence>
                        {convertedAmount && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-4 p-4 text-center rounded-3 shadow-sm"
                                style={{
                                    background: "linear-gradient(45deg, #00b09b, #96c93d)",
                                    color: "white"
                                }}
                            >
                                <h4 className="mb-2">Converted Amount</h4>
                                <h2 className="mb-0">
                                    <strong>{convertedAmount} {toCurrency}</strong>
                                </h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    );
};

export default ExchangeForm;
