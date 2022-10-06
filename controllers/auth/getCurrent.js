const getCurrent = async (req, res) => {
  const { email } = req.user;

  res.json({
    status: "success",
    code: 200,
    ResponseBody: {
      email: `${email}`,
      subscription: "starter",
    },
  });
};

module.exports = getCurrent;
