import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      {/* 🔥 FULL BACKGROUND */}
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "white",
        }}
      >
        {/* DARK OVERLAY */}
        <div
          style={{
            background: "rgba(0,0,0,0.75)",
            minHeight: "100vh",
            padding: "50px 20px",
          }}
        >
          {/* 🔥 HERO */}
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h1 style={{ fontSize: "50px", letterSpacing: "2px" }}>
              Sri Sai Cars 🚗
            </h1>
            <p style={{ fontSize: "20px", marginTop: "10px" }}>
              Delivering Trust. Driving Excellence.
            </p>
          </div>

          {/* 📄 CONTENT */}
          <div
            style={{
              maxWidth: "900px",
              margin: "auto",
              lineHeight: "1.8",
              fontSize: "20px",
            }}
          >
            <h2>About Us</h2>
            <p>
              Sri Sai Cars is a well-established automobile dealership based in
              Punjai Puliampatti, Erode, with over{" "}
              <strong>11 years of industry experience</strong>.
            </p>

            <p>
              We specialize in providing high-quality new and pre-owned vehicles
              that meet strict standards of reliability, performance and value.
              Our operations are driven by transparency, professionalis and a
              strong commitment to customer satisfaction.
            </p>

            <p>
              With a customer-first approach, we ensure every client receives the
              right vehicle at the right value. Our goal is to build long-term
              relationships through trust, consistency and dependable service.
            </p>

            <h2>Founder</h2>
            <p>
              Sri Sai Cars is led by <strong>Mr. Vellingiri</strong>, whose
              vision and dedication have played a key role in establishing the
              company as a reliable and respected name in the regional automobile
              market.
            </p>

            <h2>Why Choose Us</h2>
            <ul>
              <li>✔ Over a decade of proven experience</li>
              <li>✔ Strong reputation for trust and reliability</li>
              <li>✔ Transparent and competitive pricing</li>
              <li>✔ Carefully selected quality vehicles</li>
              <li>✔ Customer-focused service approach</li>
            </ul>
          </div>

          {/* 🚗 BRANDS */}
          <div
            style={{
              marginTop: "60px",
              textAlign: "center",
            }}
          >
            <h2>Our Brands</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "30px",
                marginTop: "20px",
              }}
            >
              <img
                src="https://img.icons8.com/color/100/toyota.png"
                alt="toyota"
              />
              <img
                src="https://img.icons8.com/color/100/honda.png"
                alt="honda"
              />
              <img
                src="https://img.icons8.com/color/100/hyundai.png"
                alt="hyundai"
              />
              
              <img
                src="https://img.icons8.com/color/100/suzuki.png"
                alt="suzuki"
              />
            </div>
          </div>

          {/* 📍 CONTACT */}
          <div
            style={{
              marginTop: "60px",
              textAlign: "center",
              fontSize: "17px",
            }}
          >
            <p>
              📍 35/55, Kempanna Street, Punjai Puliampatti, Erode - 638459
            </p>
            <p>📞 +91 9080855714</p>
            <p>📧 vellingirigiri27@gmail.com</p>

            <p style={{ marginTop: "20px", fontStyle: "italic" }}>
              At Sri Sai Cars, we are committed to delivering not just vehicles,
              but lasting value and customer confidence.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;