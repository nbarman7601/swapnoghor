import './product.css';
export const ProductCard = () => {
    return (
        <div className="item__product_card">
            <div className="image_container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtkzZMTh_n9DE3CznuCnA8wVdQI7IQT9sDng&s" />
            </div>
            <div className="dexcription">
                <h3>Apple</h3>
                <button>Add To Cart</button>
            </div>
        </div>
    )
}