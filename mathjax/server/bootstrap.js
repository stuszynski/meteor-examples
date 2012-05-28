Meteor.startup(function () {
  if (Formulas.find().count() === 0) {

    var data = [
      {
          category: "Concrete Mathematics",
          header: "Sums",
          description: "$$\\sum_{0\\leq k\\leq n} k^2 = \\frac{n(n+1)(2n+1)}6$$"
      },
      {
          category: "Concrete Mathematics",
          header: "Binomial coefficients",
          description: "$${r\\choose k} = {r-1\\choose k} + {r-1\\choose k-1}$$"
      },
      {
          category: "Geometry",
          header: "Volume of a sphere",
          description: "Volume is given by the formula: $$V = \\frac43\\pi r^3$$"
      },
      {
          category: "Geometry",
          header: "Surface area of a sphere",
          description: "Surface area of a sphere is given by the formula: $$A = 4\\pi r^2$$"
      }
    ];

    data.forEach(function(d) {
      Formulas.insert({ category: d.category, header: d.header, description: d.description });
    });

  }
});
