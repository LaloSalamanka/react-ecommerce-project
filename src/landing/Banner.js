import BannerZero from "./banner-0.jpg";

function BannerIncidator(props) {
  return (
    <button
      type="button"
      data-bs-target="#bannerIndicators"
      data-bs-slide-to={props.index}
      className={props.active ? "active" : ""}
      aria-current={props.active}
    />
  );
}

function BannerImage(props) {
  return (
    <div
      className={"carousel-item " + (props.active ? "active" : "")}
      data-bs-interval="5000"
    >
      <div
        className="ratio"
        style={{ "--bs-aspect-ratio": "50%", maxHeight: "460px" }}
      >
        <img
          className="d-block w-100 h-100 bg-dark cover"
          alt=""
          src={props.image}
        />
      </div>
      <div className="carousel-caption d-none d-lg-block">
        <h5> </h5>
        <p> </p>
      </div>
    </div>
  );
}

function Banner() {
  return (
    <div
      id="bannerIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "56px" }}
    >
      <div className="carousel-indicators">
        <BannerIncidator index="0" active={true} />
        <BannerIncidator index="1" />
        <BannerIncidator index="2" />
      </div>
      <div className="carousel-inner">
        <BannerImage image={BannerZero} active={true}/>
        <BannerImage image="https://media.istockphoto.com/id/1201024668/photo/stylish-man-wearing-sunglasses-and-white-shirt-city-life.jpg?s=1024x1024&w=is&k=20&c=o3q16xv-pETEOQsONNzddoHzlr860v0je0xn4djBpGI="/>
        <BannerImage image="https://media.istockphoto.com/id/1922703877/photo/gen-z-teenager-poses-full-body-towards-camera-showing-attitude.jpg?s=1024x1024&w=is&k=20&c=oRj_OvTrHugTjBeSoVkIwcJ62xN-xCVvehp6hoNdKqg=" />
      </div>
    </div>
  );
}

export default Banner;