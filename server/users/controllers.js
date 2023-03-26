const login = (req, res) => {
  const { email, passwords } = req.body;

  const userLogin = {
    email: "email",
    password: "passwords",
  };
  res.json(userLogin);
};

const register = (req, res) => {
  const { name, email, password } = req.body;

  const userRegister = {
    name: "arslan",
    email: "arslanyounas@gmail.com",
    password: "data",
  };
  res.json(userRegister);
};

module.exports = {
  login,
  register,
};
