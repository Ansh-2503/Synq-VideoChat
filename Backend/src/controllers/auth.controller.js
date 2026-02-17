export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
};

export const login = async (req, res) => {
  res.send("Login Route");
};

export const logout = (req, res) => {
  res.send("Logout Route");
};
