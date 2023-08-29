import { BASE_URL } from "../../api"

const AdsContainer = () => {
    return (
        <section className="widget ads-container">
            <div className="top-row">
                <p className="small-text">Sponsored</p>
                <p className="small-text">Google Ads</p>
            </div>
            <img src={`${BASE_URL}/assets/kfc-ad.jpg`} alt="kfc-ad" />
            <p className="small-text">
                Enjoy the irresistible taste of our perfectly crafted KFC zinger burger!
                Bite into a flavorful chicken patty, complemented by mayo, lettuce, and tomatoes.
            </p>
        </section>
    )
}

export default AdsContainer
