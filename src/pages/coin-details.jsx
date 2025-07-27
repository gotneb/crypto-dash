import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const locale = "pt-BR";

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch the data.");
        const data = await res.json();
        console.log(data);
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">Back to Home</Link>

      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>

      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />

          <p>{coin.description.en.split(". ")[0] + "."}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current price: R$
              {coin.market_data.current_price.brl.toLocaleString(locale)}
            </h3>
            <h4>
              Market Cap:{" "}
              {coin.market_data.market_cap.brl.toLocaleString(locale)}
            </h4>
            <h4>
              24h Hight: {coin.market_data.high_24h.brl.toLocaleString(locale)}
            </h4>
            <h4>
              24h Low: {coin.market_data.low_24h.brl.toLocaleString(locale)}
            </h4>
          </div>

          <CoinChart coinId={id} />

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
          </div>
          <div className="coin-details-links">
            {coin.links.blockchain_site[0] && (
              <p>
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
          </div>
          {coin.categories.length > 0 && (
            <p>Categories: {coin.categories.join(", ")}</p>
          )}
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
