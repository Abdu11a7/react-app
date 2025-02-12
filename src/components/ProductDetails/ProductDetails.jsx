import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "../RelatedProducts/RelatedProducts.jsx";
import Slider from "react-slick";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
  };
  function productDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        console.log(res.data.data);
        document.title = `${res.data.data.title} / ${res.data.data.category.name}`;
      })
      .catch((res) => console.log(res));
  }

  useEffect(() => {
    productDetails(id);
  }, [id]);

  return (
    <main>
      <section>
        {product ? (
          <article className="row items-center">
            <header className="w-full sm:w-1/4">
              <Slider {...settings}>
                {product?.images.map((img) => (
                  <img
                    src={img}
                    className="w-full"
                    alt={`This is ${product?.title
                      ?.split(" ")
                      .slice(0, 2)
                      .join(" ")}`}
                    key={product.id}
                  />
                ))}
              </Slider>
            </header>
            <main className="w-full sm:w-3/4 p-4">
              <h2 className="text-2xl">{product?.title}</h2>
              <h3 className="my-4 text-gray-700">{product?.description}</h3>
              <h4 className="text-base font-medium text-[#0aad0a]">
                {product?.category.name}
              </h4>
              <div className="flex justify-between items-center my-4">
                <span className="text-lg">{product?.price} EGP</span>

                <span className="flex  gap-1 items-center">
                  <i className="fas fa-star text-yellow-400"></i>
                  <em className="text-lg font-normal text-gray-600">
                    {product?.ratingsAverage}
                  </em>
                </span>
              </div>
              <button className="btn hover:bg-[#23b223]">Add to cart</button>
            </main>
          </article>
        ) : (
          <div className="spinner"></div>
        )}
      </section>

      <RelatedProducts />
    </main>
  );
}
