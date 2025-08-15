import React from 'react';

const About = () => {
  const feedbacks = [
    {
      name: "Meena G",
      comment: "Absolutely delicious! The chocolate mousse cup was divine. Quick delivery and amazing packaging.",
    },
    {
      name: "Aravind A",
      comment: "I loved the red velvet cupcake! So moist and perfectly sweet. Will definitely order again.",
    },
    {
      name: "Virat K",
      comment: "Blissfull Bites made my birthday special with their hazelnut praline pastry. Thank you!",
    },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
      <h1 className="text-center mb-4" style={{ color: '#821c32' }}>About Blissfull Bites</h1>

      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Welcome to <strong>Blissfull Bites</strong> — your one-stop destination for heavenly desserts and scrumptious treats!
        <br /><br />
        Our passion for baking meets creativity, resulting in a delightful menu of cupcakes, brownies, cheesecakes, mousses, and sandwiches — all crafted with the finest ingredients and a dash of love. Whether you're celebrating a special occasion or just craving something sweet, Blissfull Bites brings joy to every bite.
        <br /><br />
        We aim to deliver not just desserts, but memorable experiences. Our skilled chefs ensure top-quality and hygiene with every product, and our fast delivery means your sweet cravings are never left waiting.
      </p>

      <hr className="my-5" />

      <h2 className="text-center mb-4" style={{ color: '#4e1f29' }}>What Our Customers Say</h2>
      <div className="row">
        {feedbacks.map((fb, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{fb.name}</h5>
                <p className="card-text">"{fb.comment}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
